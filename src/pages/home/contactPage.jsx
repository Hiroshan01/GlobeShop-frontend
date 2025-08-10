import { useState, useEffect } from 'react';

export default function ContactPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex flex-col overflow-hidden">
            {/* Hero Section */}
            <div className="w-full h-[50vh] flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-purple-400/10 rounded-full blur-lg animate-ping"></div>
                    <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl animate-pulse"></div>
                </div>

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-transparent to-blue-600/30 animate-pulse"></div>

                {/* Hero Content */}
                <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
                        Get In
                        <br />
                        <span className="text-5xl md:text-6xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                            Touch
                        </span>
                    </h1>
                    <p className="text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="w-full flex-1 bg-gradient-to-br from-slate-50 to-purple-50 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-purple-800 mb-8">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-700 font-semibold mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-700 font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                                >
                                    <span className="relative z-10">Send Message</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-800 mb-8">
                                Contact Information
                            </h2>

                            <div className="space-y-8 mb-12">
                                {[
                                    { icon: "📧", title: "Email", info: "hello@company.com", desc: "Send us an email anytime!" },
                                    { icon: "📞", title: "Phone", info: "+1 (555) 123-4567", desc: "Mon-Fri from 8am to 6pm" },
                                    { icon: "📍", title: "Address", info: "123 Business St, Suite 100", desc: "New York, NY 10001" }
                                ].map((contact, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
                                    >
                                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                            {contact.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800 text-lg mb-1">{contact.title}</h3>
                                            <p className="text-purple-600 font-medium mb-1">{contact.info}</p>
                                            <p className="text-slate-600 text-sm">{contact.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="relative h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🗺️</div>
                                        <p className="text-slate-700 font-medium">Interactive Map</p>
                                        <p className="text-slate-600 text-sm">Find us here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className={`mt-20 transform transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-purple-800 mb-12 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    question: "What are your business hours?",
                                    answer: "We're available Monday through Friday from 8:00 AM to 6:00 PM EST. Weekend support is available via email."
                                },
                                {
                                    question: "How quickly do you respond?",
                                    answer: "We typically respond to all inquiries within 24 hours during business days, often much sooner."
                                },
                                {
                                    question: "Do you offer phone support?",
                                    answer: "Yes! Call us at +1 (555) 123-4567 during business hours for immediate assistance."
                                },
                                {
                                    question: "Can I visit your office?",
                                    answer: "Absolutely! We're located at 123 Business St, Suite 100, New York, NY 10001. Please call ahead to schedule a visit."
                                }
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className="group p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                                >
                                    <h3 className="font-semibold text-slate-800 text-lg mb-3 group-hover:text-purple-600 transition-colors duration-300">
                                        {faq.question}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}