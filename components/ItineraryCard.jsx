'use client'
import { IconMapPin } from "@tabler/icons-react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('@/components/Map'), {ssr:false})

export default function ItineraryCard({itinerary}) {
    const locations = itinerary.days.flatMap(day => day.activities)
    return (
        <div className="bg-gray-800 border border-gray-500 rounded-xl p-4 flex flex-col gap-4">
            <h2 className="text-lg font-bold">{itinerary.title}</h2>
            <Map locations={locations} />
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