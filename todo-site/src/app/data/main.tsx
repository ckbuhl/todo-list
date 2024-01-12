


interface RootMessage {
    Hello: string;
  }


export async function getRoot() {
    const res = await fetch(`${process.env.API_URL}`);
    return res.json();
  }
