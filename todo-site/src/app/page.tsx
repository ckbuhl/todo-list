import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const apiUrl = "https://5d2c3ubn6bx3ybg3cnijzim7zm0ivfjk.lambda-url.us-east-1.on.aws/";
const userId = "cbuhlerr test";

interface RootMessage {
    Hello: string;
}

interface Task {
    task_id?: string;
    content?: string;
    is_done?: boolean;
    user_id?: string;
    created_time?: string;
    tt1?: string;
}

interface TaskList {
    tasks: Array<Task>;
}

async function getRoot() : Promise<RootMessage> {
    const res = await fetch(apiUrl);
    return res.json();
}

async function getTasks(userId: string) : Promise<TaskList> {
    const res = await fetch(`${apiUrl}list-tasks/${userId}`);
    return res.json();
}

export default async function Home() {
    const res = await fetch(apiUrl)
    const data = await res.json()
    console.log(data)

    const tasks = await getTasks(userId);
    console.log(tasks)


  return (
    <MaxWidthWrapper>
      <div className='mt-20 flex flex-col gap-8 text-center h-full w-full justify-center items-center'>
        <h1 className='text-3xl font-semibold w-40'>Todo List</h1>
        <p>
          Hello
        </p>
        <p>
            {data.Hello}
        </p>
        <div className="flex flex-col gap-4 items-center justify-center w-full">
            {tasks.map((task: Task) => (
                <div key={task.task_id} className="w-40">
                    <div>{task.content}</div>
                    <div>{task.user_id}</div>
                    <div>{task.created_time}</div>
                </div>
            ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}