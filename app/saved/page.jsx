'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import ItineraryCard from "@/components/ItineraryCard"

export default function SavedPage() {
    const [itinerary, setItinerary] = useState([])
    const [selected, setSelected] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async() => {
            const {data: {user}} = await supabase.auth.getUser()
            if (!user) {
                window.location.href='/login'
                return 
            }
            setUser(user)
            const { data, error } = await supabase 
                .from ('itineraries')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', {ascending: false})
            if (error) console.log(error.message)
            else setItinerary(data)
        }
        getUser()
    },[])

    const handleDelete = async(id) => {
        const {error} = await supabase
        .from('itineraries')
        .delete()
        .eq('id', id)
    if (error) console.log(error.message)
        else setItinerary(itinerary.filter((item) => item.id !== id))
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-xl mb-8">
            {itinerary.length === 0 && (
                <div className="bg-gray-800 border border-gray-500 rounded-xl p-8 flex flex-col items-center gap-4 text-center text-white">
                    No saved itineraries yet. Go plan a trip!
                    <button 
                        className="p-2 border rounded-md bg-green-600 border-green-500 cursor-pointer font-bold hover:bg-green-800 hover:border-green-700"
                        onClick = {() => window.location.href = '/'}
                    >
                        Make a Plan
                    </button>
                </div>
            )}
            {itinerary.map((item) => (
                <div key={item.id} onClick={() => setSelected(item)} className="bg-gray-800 border border-gray-500 rounded-xl p-4 flex flex-col gap-4 hover:bg-gray-900 cursor-pointer">
                    <h2 className="text-lg font-bold">Trip title: {item.title}</h2>
                    <span className="text-sm text-gray-400">Destination: {item.destination}</span>
                    <span className="text-sm text-gray-400">No. of Days: {item.days}</span>
                    <span className="text-sm text-gray-400">No. of Travelers: {item.travelers}</span>
                    <span className="text-sm text-gray-400">Date saved: {new Date(item.created_at).toLocaleDateString()}</span>
                    <button 
                        className="p-2 border rounded-md bg-red-600 border-red-500 cursor-pointer font-bold hover:bg-red-800 hover:border-red-700"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(item.id)
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}

            {selected && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center overflow-y-auto p-4">
                    <div className="fixed inset-0 z-40" onClick={() => setSelected(null)}/>
                    <div className="relative z-50 flex flex-col gap-4 w-full max-w-xl my-8">
                        <button
                            onClick={() => setSelected(null)}
                            className="self-end bg-gray-800 border border-gray-500 rounded-md px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                            ✕ Close
                        </button>
                        <ItineraryCard itinerary={selected.itinerary} user={user} formData={{}} showSave={false} />
                    </div>
                </div>
            )}
        </div>
    )
}