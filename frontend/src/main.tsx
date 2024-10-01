import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ImageUpload from './ImageUpload'; // Import the ImageUpload component
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ImageUpload /> {/* Display the ImageUpload component */}
    </StrictMode>
  );
}
