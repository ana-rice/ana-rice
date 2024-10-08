import React, { useState } from 'react';

const ImageUpload: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setImageSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null); // Clear image preview if invalid file
    }
  };

  const handleImageUpload = () => {
    if (imageSrc) {
      setLoading(true); // Set loading state
      fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc }), // Sending image as base64 string
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Server response:', data);
          setLoading(false); // Reset loading state
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setLoading(false); // Reset loading state on error
        });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500  text-white p-4">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h1 className="text-4xl font-bold">Ana-Rice</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="#about" className="hover:underline">About Us</a>
          </li>
          <li>
            <a href="#register" className="hover:underline">Register</a>
          </li>
          <li>
            <a href="#login" className="hover:underline">Log In</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4">Upload Image</h2>

        {/* Custom File Input */}
        <label className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="inline-block px-6 py-3 text-center text-blue-500 bg-white border border-blue-500 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition duration-200">
            Choose File
          </span>
        </label>

        {imageSrc && (
          <>
            <img
              src={imageSrc}
              alt="Preview"
              className="block max-w-lg max-h-80 mb-4 border border-gray-300 rounded-lg shadow-2xl"
            />
            <button
              onClick={handleImageUpload}
              className={`px-4 py-2 mt-2 bg-blue-500 text-white border border-blue-500 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
