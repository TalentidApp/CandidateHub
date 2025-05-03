import { useState, useEffect } from 'react';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
    const [countdown, setCountdown] = useState(8);
    
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            window.location.href = '/';
        }
    }, [countdown]);

    const goHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-purple-600">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-6 py-12">
                <h1 className="text-9xl font-extrabold text-white text-opacity-10 mb-0">404</h1>
                
                <div className="mt-[-3rem] text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Page Not Found</h2>
                    <p className="text-purple-200 text-lg mb-8 max-w-md">
                        The page youre looking for doesnt exist or has been moved.
                    </p>
                    
                    <div className="mb-8">
                        <div className="inline-block px-4 py-2 rounded-full bg-white bg-opacity-10 backdrop-blur-sm">
                            <p className="text-white">
                                Redirecting to home in <span className="font-bold text-purple-200">{countdown}</span> seconds
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                        <button 
                            onClick={() => window.history.back()}
                            className="group flex items-center justify-center gap-2 py-3 px-6 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm text-white rounded-full transition-all duration-300"
                        >
                            <ArrowLeft size={18} className="group-hover:translate-x-[-4px] transition-transform" />
                            <span>Go Back</span>
                        </button>
                        
                        <button 
                            onClick={goHome}
                            className="group flex items-center justify-center gap-2 py-3 px-6 bg-white text-purple-900 hover:bg-purple-50 rounded-full transition-all duration-300"
                        >
                            <Home size={18} />
                            <span>Go Home</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;