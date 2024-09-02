import connect from "@/lib/connect"
import SingleSnippet from "@/models/SnippetSchema"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  try {
    const countByLanguage = req.nextUrl.searchParams.get("countByLanguage")

    await connect()

    if (countByLanguage) {
      const LanguageCount = await SingleSnippet.aggregate([
        {
          $match: { isPublic: true },
        },
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
      const snippets = await SingleSnippet.find({ isPublic: true }).lean()

      const filterdSnippets = snippets.map((snippet) => {
        const { clerkUserId, _id, __v, tags, ...filterdSnippets } = snippet

        const filteredTags = tags.map((tag: { [x: string]: any; clerkUserId: any }) => {
          const { clerkUserId, ...filteredTags } = tag
          return filteredTags
        })

        return {...filterdSnippets, tags: filteredTags}
      })

      return NextResponse.json({ snippets: filterdSnippets })
    }
  } catch (error) {
    console.error("Database query error: ", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
