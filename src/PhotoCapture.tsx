import { ImageList, ImageListItem } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { photoUpload } from "./web-apis";
import ImageModal from "./ImageModal";

const maxPhotos: number = 12;

function PhotoCapture() {
  const [images, setImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null && e.target.files) {
      const fileList: FileList = e.target.files;
      if (fileList.length) {
        setImages((prevList) => [
          ...prevList,
          URL.createObjectURL(fileList[0]),
        ]);
      }
    }
  };

  const handleSubmit = () => {
    photoUpload();
  };

  const handleImageClick = (image: string) => {
    setShowModal(true);
    setModalImage(image);
  };

  return (
    <section id="main-content-container">
      <div className="main-content-photo-header">
        <div>
          <label
            htmlFor="photo-capture"
            className={`photo-capture-label ${
              images.length >= maxPhotos ? "disabled" : ""
            }`}
          >
            Capture image
          </label>
          <input
            type="file"
            name="photo-capture"
            id="photo-capture"
            accept="image/*"
            capture="environment"
            disabled={images.length >= maxPhotos}
            onChange={handleFileUpload}
          />
        </div>
        {images.length >= 1 ? (
          <div className="photo-capture-label submit" onClick={handleSubmit}>
            Submit images
          </div>
        ) : null}
      </div>
      <div className="image-list-container">
        <ImageList sx={{ width: 500, height: 400 }} cols={3} rowHeight={164}>
          {images.map((image, idx) => (
            <ImageListItem key={image}>
              <img
                onClick={() => handleImageClick(image)}
                srcSet={`${image}`}
                src={`${image}`}
                alt={`Image of wedding - ${idx}`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      {showModal ? (
        <ImageModal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <img
            srcSet={`${modalImage}`}
            src={`${modalImage}`}
            alt={`Modal with image`}
            loading="lazy"
            height={500}
            width={330}
          />
        </ImageModal>
      ) : null}
    </section>
  );
}

export default PhotoCapture;
