import React from 'react'
function BackHeader({
    title = "Order Details",
}) {
    return (
        <div className="sticky top-0 z-10 bg-black shadow-md">
            <div className="flex justify-between items-center p-4">
                <button
                    onClick={() => window.history.back()}
                    className="w-10 h-10 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <div className="w-10"></div> {/* Empty div for spacing */}
            </div>
        </div>
    )
}

export default BackHeader
