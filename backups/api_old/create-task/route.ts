import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
    const body = await request.json()
    const res = await fetch("https://5d2c3ubn6bx3ybg3cnijzim7zm0ivfjk.lambda-url.us-east-1.on.aws/create-task", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)})

    const data = await res.json()

    return Response.json(data)
}