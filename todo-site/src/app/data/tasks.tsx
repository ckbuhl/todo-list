
export async function getTasks(userId: string) {
    const res = await fetch(`${process.env.API_URL}list-tasks/${userId}`);
    return res.json();
  }
