import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

// Create a type for the task object
interface Task {
  task_id?: string;
  content?: string;
  is_done?: boolean;
  user_id?: string;
  created_time?: string;
  tt1?: string;
}

const user_id: string = "cbuhlerr test";

async function getRoot() {
  const res = await fetch("http://localhost:3000/api/");
  return res.json();
}

async function getTasks(user_id: string) {
  const res = await fetch(`http://localhost:3000/api/list-tasks/${user_id}`);
  return res.json();
}

// PUT a new create task request to the API
async function createTask(task: Task) {
    const res = await fetch("http://localhost:3000/api/create-task", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
    return res.json();
    }

export default async function Home() {
  const api_url =
    "https://5d2c3ubn6bx3ybg3cnijzim7zm0ivfjk.lambda-url.us-east-1.on.aws";
  const tasks = await getRoot();
  console.log(tasks);
  const tasks2 = await getTasks(user_id);
  console.log(tasks2);
  // Create a new task object and call the createTask function
//   const task: Task = {
//     user_id: user_id,
//     content: "Test task",
//   }
//     const newTask = await createTask(task);
//     console.log(newTask);

  return (
    <MaxWidthWrapper>
      <div className='mt-20 flex flex-col gap-8 text-center h-full w-full justify-center items-center'>
        <h1 className='text-3xl font-semibold w-40'>Todo List</h1>
        <p>
          {tasks.Hello}
        </p>
          {tasks2.data.tasks.map((task: Task) => (
            <div key={task.task_id} className="w-40">
              <div>{task.content}</div>
              <div>{task.user_id}</div>
              <div>{task.created_time}</div>
              <div>{task.tt1}</div>
            </div>
  ))}

      </div>
    </MaxWidthWrapper>
  );
}
