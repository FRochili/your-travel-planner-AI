export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const destination = searchParams.get('destination')

        if (!destination) {
            return Response.json(
                { error: 'Destination is required' },
                { status: 400 }
            )
        }

        const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`,
            {
                headers: {
                    'User-Agent': 'wanderai-app'
                }
            }
        )

        const geoData = await geoRes.json()

        if (!geoData.length) {
            return Response.json(
                { error: 'Location not found' },
                { status: 404 }
            )
        }

        const { lat, lon } = geoData[0]

        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto&forecast_days=7`
        )

        const weatherData = await weatherRes.json()

        return Response.json({
            weather: weatherData.daily
        })
    } catch (error) {
        console.error(error)
        return Response.json(
            { error: 'Failed to fetch weather' },
            { status: 500 }
        )
    }
}