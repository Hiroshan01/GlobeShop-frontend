import { useState, useEffect } from 'react';

export default function HomePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Simulated product images for the carousel
    const featuredImages = [
        "/images/hero-1.jpg",
        "/images/hero-2.jpg",
        "/images/hero-3.jpg"
    ];

    useEffect(() => {
        setIsLoaded(true);

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % featuredImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [featuredImages.length]);

    return (
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center overflow-hidden">
            {/* Hero Section with Enhanced Animations */}
            <div className="w-full h-[70%] flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated Background Images */}
                <div className="absolute inset-0 overflow-hidden">
                    {featuredImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentImageIndex
                                    ? 'opacity-30 scale-100'
                                    : 'opacity-0 scale-110'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Featured ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}

                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-transparent to-blue-600/30 animate-pulse"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-purple-400/10 rounded-full blur-lg animate-ping"></div>
                    <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl animate-pulse"></div>
                </div>

                {/* Main Content with Staggered Animations */}
                <div className={`absolute w-full h-full flex flex-col items-center justify-center p-6 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}>
                        <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
                            Discover
                            <br />
                            <span className="text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                                Excellence
                            </span>
                        </h1>
                    </div>

                    <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}>
                        <p className="text-xl font-light text-gray-200 max-w-2xl mb-8 leading-relaxed">
                            Elevate your lifestyle with our curated collection of premium products.
                            Experience quality, innovation, and style like never before.
                        </p>
                    </div>

                    <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}>
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                            <span className="relative z-10">Shop Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </div>
                </div>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {featuredImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Enhanced Bottom Section */}
            <div className="w-full h-[30%] relative overflow-hidden bg-gradient-to-br from-slate-100 to-purple-50">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="animate-pulse absolute top-4 left-8 w-16 h-16 bg-purple-300 rounded-full blur-xl"></div>
                        <div className="animate-bounce absolute top-12 right-16 w-12 h-12 bg-blue-300 rounded-full blur-lg"></div>
                        <div className="animate-ping absolute bottom-8 left-1/3 w-20 h-20 bg-purple-200 rounded-full blur-2xl"></div>
                    </div>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
                    <div className={`transform transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-purple-800 mb-4 text-center">
                            Featured Collections
                        </h2>
                        <p className="text-lg text-slate-600 text-center max-w-2xl">
                            Explore our handpicked selection of trending products and exclusive deals
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className={`mt-8 flex  flex-wrap justify-center gap-6 transform transition-all duration-1000 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        {[
                            { icon: "🛍️", title: "Premium Quality", desc: "Curated excellence" },
                            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
                            { icon: "⭐", title: "5-Star Service", desc: "Exceptional support" }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-slate-800 mb-1">{feature.title}</h3>
                                <p className="text-sm text-slate-600 text-center">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}