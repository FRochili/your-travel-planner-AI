export async function GET() {
    return Response.json({
        hasKey: !!process.env.GEMINI_API_KEY,
        keyLength: process.env.GEMINI_API_KEY?.length,
        keyStart: process.env.GEMINI_API_KEY?.substring(0, 8)
    })
}