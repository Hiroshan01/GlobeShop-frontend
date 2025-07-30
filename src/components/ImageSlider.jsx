import { useState } from "react"

export default function ImageSlider(props) {
    const images = props.images || []
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 md:px-0">
            {/* Main Image Display */}
            <div className="w-full aspect-square md:aspect-[4/5] mb-4 relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg">
                {images.length > 0 ? (
                    <>
                        <img
                            className="w-full h-full object-cover transition-opacity duration-300"
                            src={images[selectedImage]}
                            alt={`Product image ${selectedImage + 1}`}
                        />
                        
                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-xs font-medium">
                                {selectedImage + 1} / {images.length}
                            </div>
                        )}
                        
                        {/* Navigation Arrows for Mobile */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 md:opacity-0 md:hover:opacity-100"
                                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                                >
                                    <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                
                                <button
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 md:opacity-0 md:hover:opacity-100"
                                    onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                                >
                                    <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                        <div className="text-center">
                            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">No images available</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
                <div className="w-full">
                    {/* Desktop Thumbnails */}
                    <div className="hidden md:flex justify-center items-center space-x-2 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg cursor-pointer object-cover flex-shrink-0 transition-all duration-200 hover:scale-105 ${
                                    selectedImage === index 
                                        ? 'ring-2 ring-blue-500 ring-offset-2 opacity-100' 
                                        : 'opacity-70 hover:opacity-100'
                                }`}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>

                    {/* Mobile Dots Indicator */}
                    <div className="flex md:hidden justify-center items-center space-x-2 mt-3">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    selectedImage === index 
                                        ? 'bg-blue-500 w-6' 
                                        : 'bg-gray-300'
                                }`}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>

                    {/* Mobile Thumbnail Strip (Alternative) */}
                    <div className="md:hidden mt-4 overflow-x-auto">
                        <div className="flex space-x-2 px-4" style={{ width: 'max-content' }}>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg cursor-pointer object-cover flex-shrink-0 transition-all duration-200 ${
                                        selectedImage === index 
                                            ? 'ring-2 ring-blue-500 opacity-100' 
                                            : 'opacity-60'
                                    }`}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Swipe Hint for Mobile */}
            {images.length > 1 && (
                <div className="md:hidden text-center mt-2">
                    <p className="text-xs text-gray-500">Swipe or tap arrows to navigate</p>
                </div>
            )}
        </div>
    )
}