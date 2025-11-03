function Services() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-100">
      <div className="text-center p-10 bg-white shadow-xl rounded-lg max-w-lg mx-auto">
        
        {/* Optional Icon: You can use an emoji or an icon from a library */}
        <div className="text-6xl text-orange-500 mb-6">
          🚧
          {/* Or <FiTool /> if you install react-icons */}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Coming Soon!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          We are working hard to build our new <strong>Online Temple Tour Services</strong>.
          Get ready to explore India's sacred heritage like never before.
        </p>
        
        <p className="text-md text-gray-500 font-medium">
          Please check back shortly!
        </p>
        
      </div>
    </div>
  );
}

export default Services;