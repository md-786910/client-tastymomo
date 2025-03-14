const ErrorAlert = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="fixed top-4 right-4 left-4 z-50 animate-slide-in">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white">{message}</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ErrorAlert;