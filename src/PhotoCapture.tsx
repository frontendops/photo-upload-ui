import { ImageList } from "@mui/material";
import "./App.css";

function PhotoCapture() {
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
          />
        </div>
        <div>
            <ImageList>
                
            </ImageList>
        </div>
      </section>
  );
}

export default PhotoCapture;
