import { ImageList, ImageListItem } from "@mui/material";
import "./App.css";
import "./PhotoCapture.css";
import { useState } from "react";
// @ts-ignore
import { photoUpload } from "./web-apis/index.js";
import ImageModal from "./ImageModal";

const maxPhotos: number = 12;

interface ModalImage {
  blob: string;
  index: number;
}

const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const dataUrltoB64Str = (dataUrl: string) => {
  // Extract the base64 string
  return dataUrl.split(";base64,")[1];
};

function PhotoCapture() {
  const [images, setImages] = useState<ModalImage[]>([]);
  const [rawImages, setRawImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ModalImage>({
    blob: "",
    index: 0,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null && e.target.files) {
      const fileList: FileList = e.target.files;
      if (fileList.length) {
        // Set images to list out in UI
        setImages((prevList) => [
          ...prevList,
          {
            blob: URL.createObjectURL(fileList[0]),
            index: prevList.length + 1,
          },
        ]);

        // Set images to send to API in B64
        const dataUrl = await toBase64(fileList[0]);
        // @ts-ignore
        const base64Str = dataUrltoB64Str(dataUrl);
        setRawImages((prevList) => [...prevList, base64Str]);
      }
    }
  };

  // Function signature for asyncFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AsyncFunctionType = () => Promise<any>;
  const handleSubmit = () => {
    const imageUploadCalls: AsyncFunctionType[] = [];
    rawImages.forEach((image, idx) => {
      imageUploadCalls.push(() => photoUpload(999, image, idx));
    });

    Promise.all([imageUploadCalls.map((call) => call())])
      .then((results) => {
        console.log("All promises resolved:", results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleImageClick = (image: string, index: number) => {
    setShowModal(true);
    setModalImage({ blob: image, index });
  };

  const handleImageDelete = () => {
    const deleteIndex = images.findIndex(
      (image) => image.index === modalImage.index
    );

    // Creating a new array without modifying the original one
    const removedImageArr = [
      ...images.slice(0, deleteIndex),
      ...images.slice(deleteIndex + 1),
    ];

    setImages(removedImageArr);

    // close modal
    setShowModal(false);
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
            Capture photo
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
            Submit photo
          </div>
        ) : null}
      </div>

      <div className="image-count-container">
        {images.length} of {maxPhotos} taken
      </div>
      <div className="image-list-container">
        <ImageList sx={{ width: 500, height: 400 }} cols={3} rowHeight={164}>
          {images.map((image) => (
            <ImageListItem key={image.index}>
              <img
                onClick={() => handleImageClick(image.blob, image.index)}
                srcSet={`${image.blob}`}
                src={`${image.blob}`}
                alt={`Image of wedding - ${image.index}`}
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
          <div className="image-modal-container">
            <img
              srcSet={`${modalImage.blob}`}
              src={`${modalImage.blob}`}
              alt={`Modal with image`}
              loading="lazy"
              height={500}
              width={330}
            />

            <div className="image-modal-actions-container">
              <div
                className="photo-capture-label delete"
                onClick={handleImageDelete}
              >
                Delete photo
              </div>

              <div
                className="photo-capture-label neutral"
                onClick={() => setShowModal(false)}
              >
                Close modal
              </div>
            </div>
          </div>
        </ImageModal>
      ) : null}
    </section>
  );
}

export default PhotoCapture;
