'use client'
import { IconMapPin } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Map = dynamic(() => import('@/components/Map'), {ssr:false})

const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 55) return '🌧️'
    if (code <= 77) return '❄️'
    return '⛈️'
}

export default function ItineraryCard({itinerary, user, formData, showSave}) {
    const locations = itinerary.days.flatMap(day => day.activities)
    const [weather, setWeather] = useState(null)

    const handleSave = async () => {
        if (!user) {
            window.location.href = '/login'
            return
        } 

        const {error} = await supabase.from('itineraries').insert({
            user_id: user.id,
            title: itinerary.title,
            destination: itinerary.destination,
            days: itinerary.days.length,
            travelers: formData.travelers,
            budget_min: formData.budgetMin,
            budget_max: formData.budgetMax,
            styles: formData.styles,
            notes: formData.notes,
            itinerary: itinerary
        })

        if (error) console.log(error.message)
        else alert ('Itinerary saved!')
    }

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`/api/weather?destination=${encodeURIComponent(itinerary.destination)}`)
            const data = await response.json()
            setWeather(data.weather)
        }
        fetchWeather()
    }, [])

    return (
        <div className="bg-gray-800 border border-gray-500 rounded-xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
                <h2 className="text-lg font-bold">{itinerary.title}</h2>
                {showSave && 
                    <button 
                        onClick={handleSave}
                        className="p-2 border rounded-md bg-green-600 border-green-500 cursor-pointer font-bold"
                    >
                            Save Itinerary
                    </button>
                }
            </div>
            <Map locations={locations} />
            {/* weather section */}
            <div className="flex flex-col gap-2">
                <h2 className="font-bold">Weather Forecast:</h2>
                {weather ? (
                    <div className="grid grid-cols-7 gap-1">
                        {weather.time.map((date, index) => (
                            <div key={date} className="bg-gray-700 rounded-lg p-2 flex flex-col items-center gap-1 text-center">
                                <span className="text-xs text-gray-400">{date.slice(5)}</span>
                                <span className="text-lg">{getWeatherEmoji(weather.weathercode[index])}</span>
                                <span className="text-xs font-bold">{weather.temperature_2m_max[index]}°</span>
                                <span className="text-xs text-gray-400">{weather.temperature_2m_min[index]}°</span>
                                <span className="text-xs text-blue-400">{weather.precipitation_probability_max[index]}%</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-7 gap-1">
                        {[1,2,3,4,5,6,7].map((i) => (
                            <div key={i} className="bg-gray-700 rounded-lg p-2 flex flex-col items-center gap-2">
                                <div className="bg-gray-600 rounded animate-pulse h-3 w-full"></div>
                                <div className="bg-gray-600 rounded animate-pulse h-4 w-4"></div>
                                <div className="bg-gray-600 rounded animate-pulse h-3 w-full"></div>
                                <div className="bg-gray-600 rounded animate-pulse h-3 w-full"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {itinerary.days.map((day) => (
                <div
                key={day.day}
                className="flex flex-col gap-4 text-left bg-gray-700 rounded-xl p-4"
                >
                <h2 className="font-bold text-green-500 border-b border-gray-600 pb-2">Day {day.day}: {day.title}</h2>
                {day.activities.map((activity) => (
                    <div
                    key={activity.activity}
                    className="flex flex-col gap-4 text-left"
                    >
                    <div className="grid grid-cols-[80px_1fr] gap-3 items-start border-l-2 border-green-600 pl-3">
                        <span className="text-xs bg-green-900 text-green-400 px-2 py-1 rounded-full whitespace-nowrap w-20 text-center">{activity.time}</span>
                        <div className="flex flex-col gap-1">
                        <span className="font-semibold">{activity.activity}</span>
                        <span className="text-sm text-gray-400">Description: {activity.description}</span>
                        <span className="flex gap-2 items-center text-xs text-gray-500"><IconMapPin size={14} color="#22c55e" />Location: {activity.location}</span>
                        </div>
                    </div>

                    </div>
                ))}
                </div>
            ))}

            <div className="text-left flex flex-col gap-1">
                <h2 className="font-bold">Budget Details:</h2>
                <div className="grid grid-cols-2 gap-2">
                {Object.entries(itinerary.budgetBreakdown).map(([budgetName, budgetValue]) => (
                    <div
                    key={budgetName}
                    className="bg-gray-700 rounded-lg p-3 flex justify-between"
                    >
                    <span className="text-gray-400 capitalize">{budgetName}</span>
                    <span className="font-bold text-green-400">${budgetValue}</span>
                    </div>
                ))}
                </div>
            </div>

            <div className="text-left flex flex-col gap-1">
                <h2 className="font-bold">Extra tips:</h2>
                {itinerary.tips.map((tip, index) => (
                <div
                key={tip}
                className="flex gap-3"
                >
                <span className="bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">{index+1}</span>
                <span className="text-sm text-gray-300">{tip}</span>
                </div>
                ))}
            </div>
        </div>
    )
}