export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const res = await fetch(
    `https://5d2c3ubn6bx3ybg3cnijzim7zm0ivfjk.lambda-url.us-east-1.on.aws/list-tasks/${params.slug}`
  );
  const data = await res.json();

  return Response.json({ data });
}
