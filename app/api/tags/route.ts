import connect from "@/lib/connect"
import SingleTag from "@/models/TagsSchema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { clerkUserId, name } = await req.json()

    await connect()

    const tag = new SingleTag({
      name,
      clerkUserId,
    })

    const savedTag = await tag.save()

    return NextResponse.json({ tags: savedTag })
  } catch (error) {
    console.log(error)

    return NextResponse.json({ error: error }, { status: 400 })
  }
}

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId")

    if (!clerkId) {
      return NextResponse.json(
        { error: "ClerkId is required" },
        { status: 400 }
      )
    }

    await connect()

    const tags = await SingleTag.find({ clerkUserId: clerkId })

    return NextResponse.json({ tags: tags })
  } catch (error) {
    console.error("Database query error:", (error as Error).message)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function DELETE(req: any) {
  try {
    await connect()

    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const result = await SingleTag.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Tag deleted successfully" })
  } catch (error) {
    console.log("Deletion error: ", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
