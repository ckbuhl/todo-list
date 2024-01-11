from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "Hello World from Todo API!"}

handler = Mangum(app, lifespan="off")