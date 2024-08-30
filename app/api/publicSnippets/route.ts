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
    const snippets = await SingleSnippet.find({ isPublic: true })

    return NextResponse.json({ snippets: snippets })
    }
  } catch (error) {
    console.error("Database query error: ", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
