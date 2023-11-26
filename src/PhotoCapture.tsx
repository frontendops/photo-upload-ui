import { ImageList, ImageListItem } from "@mui/material";
import "./App.css";
import { useState } from "react";



function PhotoCapture() {
  const [images, setImages] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null && e.target.files) {
        const fileList: FileList = e.target.files
        setImages(prevList => ([...prevList, URL.createObjectURL(fileList[0])]))
    }
  }

  return (
      <section id="main-content-container">
        <div className="main-content-photo-header">
          <label htmlFor="photo-capture" className="photo-capture-label">
            Capture image
          </label>
          <input
            type="file"
            name="photo-capture"
            id="photo-capture"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
          />
        </div>
        <div>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {images.map((image, idx) => (
            <ImageListItem key={image}>
              <img
                srcSet={`${image}`}
                src={`${image}`}
                alt={`Image of wedding - ${idx}`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        </div>
      </section>
  );
}

export default PhotoCapture;
