import React, { useState } from 'react';

const ImageUpload: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Preview"
          style={{ display: 'block', maxWidth: '300px', maxHeight: '300px', marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
