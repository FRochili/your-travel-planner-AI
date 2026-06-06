import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" })

export async function POST(request) {
    try {
        // get form data
        const body = await request.json()
        const {destination, days, travelers, budgetMin, budgetMax, styles, notes} = body
        
        // build prompt
        const prompt = `
            You are a travel planner. Create a detailed ${days}-day itinerary for ${travelers} traveler(s) going to ${destination}.
            Budget: $${budgetMin} to $${budgetMax} USD total.
            Travel styles: ${styles.join(', ')}.
            Special notes: ${notes || 'none'}.
    
            Return ONLY a JSON object with this exact structure, no extra text:
            {
                "title": "trip title",
                "destination": "city, country",
                "days": [
                    {
                        "day": 1,
                        "title": "day title",
                        "activities": [
                            {
                                "time": "Morning",
                                "activity": "activity name",
                                "description": "short description",
                                "location": "place name",
                                "lat": 35.6762,
                                "lng": 139.6503
                            }
                        ]
                    }
                ],
                "budgetBreakdown": {
                    "accommodation": 000,
                    "food": 000,
                    "transport": 000,
                    "activities": 000,
                    "total": 000
                },
                "tips": ["tip1", "tip2", "tip3"]
            }
        `
    
        // send to gemini
        const result = await model.generateContent(prompt)
        const text = result.response.text()
        const cleanText = text.replace(/```json|```/g, '').trim()
    
        // return text
        return Response.json({itinerary: cleanText})
    } catch (error) {
        console.log(error.message)
        return Response.json({error: 'Failed to generate itinerary'}, {status: 500})
    }
}