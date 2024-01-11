import os
import time

from uuid import uuid4

import boto3

from boto3.dynamodb.conditions import Key
from fastapi import FastAPI
from fastapi import HTTPException
from mangum import Mangum
from pydantic import BaseModel


app = FastAPI()


class PutTaskRequest(BaseModel):
    content: str | None = None
    user_id: str | None = None
    task_id: str | None = None
    is_done: bool = False


@app.get("/")
async def read_root() -> dict:
    return {"Hello": "Hello World from Todo API!"}


@app.put("/create-task")
async def create_task(put_task_request: PutTaskRequest) -> dict:
    created_time: int = int(time.time())
    item = {
        "user_id": put_task_request.user_id,
        "content": put_task_request.content,
        "is_done": False,
        "created_time": created_time,
        "task_id": f"task_{uuid4().hex!s}",
        "tt1": int(created_time + 86400),  # Expire after 24 hours.
    }

    # Put the item in the table.
    table = _get_table()
    table.put_item(Item=item)

    return {"task": item}


@app.get("/list-tasks/{user_id}")
async def list_tasks(user_id: str) -> dict:
    # List the top N tasks from the table, using the user index.
    table = _get_table()
    response = table.query(
        IndexName="statusIndex",
        KeyConditionExpression=Key("user_id").eq(user_id),
        ScanIndexForward=False,
        Limit=10,
    )
    tasks = response.get("Items")

    return {"tasks": tasks}



@app.get("/get-task{task_id}")
async def get_task(task_id: str) -> dict:
    table = _get_table()
    response = table.get_item(Key={"task_id": task_id})
    item = {"task": response.get("Item")}

    if not item:
        raise HTTPException(status_code=404, detail="Task not found")
    return item


@app.put("/update-task")
async def update_task(put_task_request: PutTaskRequest) -> dict:
    table = _get_table()
    table.update_item(
        Key={"task_id": put_task_request.task_id},
        UpdateExpression="SET content = :content, is_done = :is_done",
        ExpressionAttributeValues={
            ":content": put_task_request.content,
            ":is_done": put_task_request.is_done,
        },
        ReturnValues="ALL_NEW",
    )
    return {"updated_task_id": put_task_request.task_id}

@app.put("/delete-task/{task_id}")
async def delete_task(task_id: str) -> dict:
    table = _get_table()
    table.delete_item(Key={"task_id": task_id})
    return {"deleted_task_id": task_id}

def _get_table():
    table_name = os.environ.get("TABLE_NAME")
    return boto3.resource("dynamodb").Table(table_name)


handler = Mangum(app, lifespan="off")
