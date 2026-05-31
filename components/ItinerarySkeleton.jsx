export default function ItinerarySkeleton() {
    return (
        <div className="bg-gray-800 border border-gray-500 rounded-xl p-4 flex flex-col gap-4">
            {/* title skeleton */}
            <div className="bg-gray-600 rounded-md animate-pulse h-4 w-3/4"></div>
            {/* day card skeletons - repeat 2-3 times */}
            {[1,2,3].map((i) => (
                <div
                key={i}
                className="flex flex-col gap-4 text-left bg-gray-700 rounded-xl p-4 animate-pulse"
                >
                <div className="bg-gray-700 rounded-md h-4 w-3/4"></div>
                {[1,2,3].map((i) => (
                    <div
                    key={i}
                    className="bg-gray-700 rounded-lg p-3 flex justify-between animate-pulse"
                    >
                    </div>
                ))}
                </div>
            ))}

            {/* budget skeleton */}
            <div className="text-left flex flex-col gap-1">
            <div className="bg-gray-600 rounded-md animate-pulse h-4 w-3/4"></div>
                <div className="grid grid-cols-2 gap-2">
                {[1,2,3,4].map((i) => (
                    <div
                    key={i}
                    className="bg-gray-700 rounded-lg p-3 flex justify-between animate-pulse"
                    >
                    </div>
                ))}
                </div>
            </div>

            {/* tips skeleton */}
            <div className="text-left flex flex-col gap-1 animate-pulse">
            <div className="bg-gray-600 rounded-md animate-pulse h-4 w-3/4"></div>
                {[1,2,3].map((i) => (
                <div
                key={i}
                className="bg-gray-700 rounded-lg p-3 flex justify-between animate-pulse"
                >
                </div>
                ))}
            </div>
        </div>
    )
}