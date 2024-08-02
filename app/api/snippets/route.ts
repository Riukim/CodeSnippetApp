import connect from "@/lib/connect"
import SingleSnippet from "@/models/SnippetSchema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const {
      title,
      isFavorite,
      isPublic,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    } = await req.json()

    await connect()

    const snippet = new SingleSnippet({
      title,
      creationDate,
      tags,
      clerkUserId,
      description,
      code,
      language,
      isFavorite,
      isPublic,
      isTrash,
    })

    const savedSnippet = await snippet.save()

    return NextResponse.json({ snippets: savedSnippet })
  } catch (error) {
    console.log(error)

    return NextResponse.json({ error: error }, { status: 400 })
  }
}

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId")
    const countByLanguage = req.nextUrl.searchParams.get("countByLanguage")

    if (!clerkId) {
      return NextResponse.json(
        { error: "ClerkId is required" },
        { status: 400 }
      )
    }

    await connect()

    if (countByLanguage) {
      const LanguageCount = await SingleSnippet.aggregate([
        { $match: { clerkUserId: clerkId } },
        {
          $group: {
            _id: "$language",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1, _id: 1 } },
      ])

      return NextResponse.json({ LanguageCount })
    } else {
      const snippets = await SingleSnippet.find({ clerkUserId: clerkId })

      return NextResponse.json({ snippets: snippets })
    }
  } catch (error) {
    console.error("Database query error:", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function PATCH(req: any) {
  try {
    await connect()

    const url = new URL(req.url)
    const id = url.searchParams.get("id")
    const {
      title,
      description,
      code,
      language,
      tags,
      isFavorite,
      isPublic,
      isTrash,
    } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const updateData = {
      ...(title && { title }),
      ...(isFavorite !== undefined && { isFavorite }),
      ...(isPublic !== undefined && { isPublic }),
      ...(tags && { tags }),
      ...(description && { description }),
      ...(code && { code }),
      ...(language && { language }),
      ...(isTrash !== undefined && { isTrash }),
    }

    const result = await SingleSnippet.updateOne(
      { _id: id },
      { $set: updateData }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Snippet not found or title not modified" },
        { status: 404 }
      )
    }
    return NextResponse.json({ message: "Snippet updated successfully" })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: error }, { status: 500 })
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

    const result = await SingleSnippet.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Snippet deleted successfully" })
  } catch (error) {
    console.log("Deletion error: ", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
