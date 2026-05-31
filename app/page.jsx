"use client"
import { useState } from "react";
import { IconMapPin, IconUsers, IconCalendar, IconWallet, IconHeart, IconNotes, IconSparkles, IconToolsKitchen2, IconBuildingArch, IconTree, IconRun, IconMusicBolt, IconShoppingBag } from "@tabler/icons-react";

const styles = [
  {name: 'Food', icon: <IconToolsKitchen2 size={18} color="#22c55e" />}, 
  {name: 'Culture', icon: <IconBuildingArch size={18} color="#22c55e" />}, 
  {name: 'Nature', icon: <IconTree size={18} color="#22c55e" />}, 
  {name: 'Adventure', icon: <IconRun size={18} color="#22c55e" />}, 
  {name: 'Nightlife', icon: <IconMusicBolt size={18} color="#22c55e" />}, 
  {name: 'Shopping', icon: <IconShoppingBag size={18} color="#22c55e" />}, 
]

export default function Home() {

  const [formData, setFormData] = useState({
    destination: '',
    days: 1,
    travelers: 1,
    budgetMin: 0,
    budgetMax: 0,
    styles: [],
    notes: '',
  })

  const handleAddTraveler = () => {setFormData({...formData, travelers: formData.travelers + 1})}
  const handleReduceTraveler = () => {
    if (formData.travelers > 1) setFormData({...formData, travelers: formData.travelers - 1})
  }

  const handleStyleToggle = (style) => {
    if (formData.styles.includes(style)) {
      // already selected → remove it
      setFormData({...formData, styles: formData.styles.filter(s => s!==style)})
    } else {
      // not selected → add it
      setFormData({...formData, styles: [...formData.styles, style]})
    }
  }

  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateButton = async() => {
    try {
      setLoading(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      const parsed = JSON.parse(data.itinerary)
      setItinerary(parsed)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full max-w-xl gap-6 mb-8 ">
      {/* form card */}
      <div className="w-full bg-gray-800 border border-gray-500 rounded-xl flex flex-col items-center justify-between gap-4 p-4 ">
        <h1 className="text-lg font-bold">Plan your trip</h1>
        <span>Fill in your details and we will build your perfect itinerary</span>
        <div className="w-full flex flex-col items-center justify-between gap-4">

          <div className="grid grid-cols-1 w-full gap-4 lg:grid-cols-2">
            {/*card-destination*/}
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-2">
                <IconMapPin size={20} color="#22c55e" />
                <h2 className="text-sm font-bold">Destination</h2>
              </div>
              <input 
                type="text" 
                placeholder="e.g. Tokyo, Japan"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                className="bg-gray-700 rounded-md py-1 px-2 border border-gray-500" 
              />
            </div>

            {/*card-duration*/}
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-2">
                <IconCalendar size={20} color="#22c55e" />
                <h2 className="text-sm font-bold">Duration (Days)</h2>
              </div>
              <input 
                type="number" 
                placeholder="Days"
                value={formData.days}
                onChange={(e) => setFormData({...formData, days: e.target.value})}
                className="bg-gray-700 rounded-md py-1 px-2 border border-gray-500" 
              />
            </div>

            {/*card-travelers*/}
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-2">
                <IconUsers size={20} color="#22c55e" />
                <h2 className="text-sm font-bold">Travelers</h2>
              </div>
              <div className="flex items-center">
                <button onClick={handleReduceTraveler} className="bg-gray-700 w-10 p-2 border border-gray-500 rounded-md cursor-pointer">-</button>
                <div className="w-10 p-2">{formData.travelers}</div>
                <button onClick={handleAddTraveler} className="bg-gray-700 w-10 p-2 border border-gray-500 rounded-md cursor-pointer">+</button>
              </div>
            </div>

            {/*card-budget*/}
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-2">
                <IconWallet size={20} color="#22c55e" />
                <h2 className="text-sm font-bold">Budget (USD)</h2>
              </div>
              <div className="flex gap-2 justify-start items-center">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={formData.budgetMin}
                  onChange={(e) => setFormData({...formData, budgetMin: e.target.value})}
                  className="w-full bg-gray-700 rounded-md py-1 px-2 border border-gray-500" 
                />
                <span>to</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={formData.budgetMax}
                  onChange={(e) => setFormData({...formData, budgetMax: e.target.value})}
                  className="w-full bg-gray-700 rounded-md py-1 px-2 border border-gray-500" 
                />
              </div>
            </div>
          </div>

          {/*card-travel style*/}
          <div className="w-full flex flex-col gap-1">
            <div className="flex gap-2">
              <IconHeart size={20} color="#22c55e" />
              <h2 className="text-sm font-bold">Travel style</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => handleStyleToggle(style.name)}
                  className={`flex justify-center items-center gap-2 p-2 border rounded-md cursor-pointer ${
                    formData.styles.includes(style.name)
                    ? 'bg-green-600 border-green-500'
                    : 'bg-gray-700 border-gray-500'
                  }`}
                >
                  {style.icon}
                  {style.name}
                </button>
              ))}
            </div>
          </div>
          
          {/*card-special notes*/}
          <div className="w-full flex flex-col gap-1">
            <div className="flex gap-2">
              <IconNotes size={20} color="#22c55e" />
              <h2 className="text-sm font-bold">Special notes (optional)</h2>
            </div>
            <textarea 
              placeholder="e.g. Vegetarian, avoiding crowded tourist traps"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="bg-gray-700 rounded-md py-1 px-2 border border-gray-500 resize-none h-20" 
            />
          </div>

          {/*generate button*/}
          <button 
            className="group flex gap-2 justify-center items-center bg-gray-700 w-full p-2 border border-gray-500 rounded-md cursor-pointer hover:bg-green-700 transition font-bold"
            onClick={handleGenerateButton}
          >
            <IconSparkles size={20} className="text-green-500 group-hover:text-white transition" />
            <span>Generate my itinerary</span>
          </button>

        </div>
      </div>

      {/* loading */}
      {loading && (
        <div className="flex gap-2 justify-center items-center">
          <IconSparkles size={32} className="text-green-500 animate-pulse" />
          <span className="text-gray-400">Generating your itinerary...</span>
        </div>
      )}

      {/* itinerary card */}
      {itinerary && (
        <div className="bg-gray-800 border border-gray-500 rounded-xl p-4 flex flex-col gap-4">
          <h2 className="text-lg font-bold">{itinerary.title}</h2>
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
                  <div className="grid grid-cols-[80px_11fr] gap-3 items-start border-l-2 border-green-600 pl-3">
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
      )}
    </div>
  );
}
