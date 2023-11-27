import React, { useEffect } from 'react';

const ViewImages: React.FC<{ selectedDocs: { url: string }[] }> = ({ selectedDocs }) => {
  useEffect(() => {
    const openImageGallery = () => {
      const galleryWindow = window.open('', '_blank');

      if (galleryWindow) {
        galleryWindow.document.write('<html><head><title>Image Gallery</title></head><body>');

        selectedDocs.forEach((doc, index) => {
          galleryWindow.document.write(`<img src="${doc.url}" alt="Image ${index + 1}" />`);
        });

        galleryWindow.document.write('</body></html>');
        galleryWindow.document.close();
      }
    };

    openImageGallery();
  }, [selectedDocs]);

  return <div>Opening Image Gallery...</div>;
};

export default ViewImages;
