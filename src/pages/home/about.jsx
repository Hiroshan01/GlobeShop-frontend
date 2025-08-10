import { useState, useEffect } from 'react';

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex flex-col overflow-hidden">
            {/* Hero Section */}
            <div className="w-full h-[50vh] flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400/10 rounded-full blur-lg animate-ping"></div>
                    <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-pulse"></div>
                </div>

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-transparent to-purple-600/30 animate-pulse"></div>

                {/* Hero Content */}
                <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-6 leading-tight">
                        About
                        <br />
                        <span className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                            Our Story
                        </span>
                    </h1>
                    <p className="text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Discover the passion and vision behind our commitment to excellence
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full flex-1 bg-gradient-to-br from-slate-50 to-blue-50 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Mission Section */}
                    <div className={`mb-16 transform transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-800 mb-6">
                                    Our Mission
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    We believe that exceptional products should be accessible to everyone. Our mission is to curate the finest selection of premium goods, ensuring quality, innovation, and style in every piece we offer.
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Founded on the principles of excellence and customer satisfaction, we strive to create meaningful connections between our customers and the products they love.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="w-full h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"></div>
                                <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"></div>
                            </div>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className={`mb-16 transform transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-purple-800 mb-12 text-center">
                            Our Values
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: "🎯", title: "Quality First", desc: "We never compromise on quality, ensuring every product meets our rigorous standards." },
                                { icon: "💡", title: "Innovation", desc: "We constantly seek innovative products and solutions to enhance your lifestyle." },
                                { icon: "🤝", title: "Customer Focus", desc: "Your satisfaction is our priority. We listen, adapt, and deliver exceptional service." }
                            ].map((value, index) => (
                                <div
                                    key={index}
                                    className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 text-center"
                                >
                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{value.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-800 mb-12 text-center">
                            Meet Our Team
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: "Sarah Johnson", role: "Founder & CEO", desc: "Visionary leader with 15+ years in retail" },
                                { name: "Michael Chen", role: "Head of Curation", desc: "Expert in product selection and quality" },
                                { name: "Emma Rodriguez", role: "Customer Experience", desc: "Dedicated to exceptional service" }
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 text-center"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"></div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-1">{member.name}</h3>
                                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                    <p className="text-slate-600 text-sm">{member.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Company Stats */}
                    <div className={`mt-16 transform transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { number: "10K+", label: "Happy Customers" },
                                { number: "500+", label: "Premium Products" },
                                { number: "5★", label: "Average Rating" },
                                { number: "24/7", label: "Customer Support" }
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="group text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
                                >
                                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {stat.number}
                                    </div>
                                    <p className="text-slate-600 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}