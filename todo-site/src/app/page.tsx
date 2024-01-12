import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getRoot } from "@/app/data/main";
import { getTasks } from "@/app/data/tasks";

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

const userId = process.env.USER_ID;

export default async function Home() {
  if (typeof userId === "undefined") {
    throw new Error("Env var `userId` is not defined");
  }
  console.log(userId);

  const data = await getRoot();
  console.log(data);

  const { tasks }: TaskList = await getTasks(userId);
  console.log(tasks);

  return (
    <MaxWidthWrapper>
      <div className='mt-20 flex flex-col gap-8 text-center h-full w-full justify-center items-center'>
        <h1 className='text-3xl font-semibold w-40'>Todo List</h1>
        <p>Hello</p>
        <p>{data.Hello}</p>
        <div className='div flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col justify-center w-full'>
            {tasks.map((task) => {
              return (
                <div key={task.task_id} className='h-20 text-center'>
                  <p>{task.content}</p>
                  <p>{task.created_time}</p>
                  <p>{task.tt1}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
