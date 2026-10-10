import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  IoCameraOutline,
  IoClose,
  IoCloudUploadOutline,
  IoImageOutline,
  IoRestaurantOutline,
  IoFastFoodOutline,
  IoCafeOutline,
} from "react-icons/io5";

const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DropZone = styled.div`
  border: 2px dashed
    ${({ $isDragOver }) => ($isDragOver ? "#2E7D5B" : "rgba(23, 74, 58, 0.2)")};
  background: ${({ $isDragOver }) =>
    $isDragOver ? "rgba(46, 125, 91, 0.05)" : "#F8F5ED"};
  border-radius: 14px;
  padding: 20px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 14px 10px;
    border-radius: 12px;
    gap: 6px;
  }

  &:hover {
    border-color: #2E7D5B;
    background: rgba(46, 125, 91, 0.03);
  }

  .upload-icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #FFFFFF;
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 2px 8px rgba(23, 74, 58, 0.08);

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
      font-size: 1.05rem;
    }
  }

  h4 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.88rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  p {
    font-size: 0.76rem;
    color: #66756F;
    max-width: 340px;
    margin: 0;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }

  .file-specs {
    font-size: 0.68rem;
    color: #8C9E98;
    background: rgba(23, 74, 58, 0.06);
    padding: 2px 8px;
    border-radius: 999px;

    @media (max-width: 768px) {
      font-size: 0.62rem;
      padding: 2px 6px;
    }
  }
`;

const ThumbnailGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .thumb-item {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn-remove {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(23, 74, 58, 0.85);
      color: #FFFFFF;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.85rem;
      transition: background 0.2s ease;

      &:hover {
        background: #E11D48;
      }
    }
  }
`;

const SamplePresetsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-top: 6px;

  .preset-label {
    font-size: 0.8rem;
    color: #66756F;
    font-weight: 500;
  }

  .preset-btn {
    background: #FFFFFF;
    border: 1px solid rgba(23, 74, 58, 0.12);
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 0.78rem;
    color: #174A3A;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      border-color: #2E7D5B;
      color: #2E7D5B;
    }
  }
`;

const compressImage = (file) => {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith("image/")) {
      resolve("/food/food1.jpg");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 720;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve("/food/food1.jpg");
    reader.readAsDataURL(file);
  });
};

export default function ImageUploader({ images, onImagesChange }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const compressed = await Promise.all(files.map(compressImage));
    onImagesChange([...images, ...compressed]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;
    const compressed = await Promise.all(files.map(compressImage));
    onImagesChange([...images, ...compressed]);
  };

  const handleRemove = (index) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const addPresetImage = (url) => {
    if (!images.includes(url)) {
      onImagesChange([...images, url]);
    }
  };

  return (
    <UploaderWrapper>
      <DropZone
        $isDragOver={isDragOver}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="upload-icon-circle">
          <IoCloudUploadOutline />
        </div>
        <h4>Add food photos</h4>
        <p>
          Help organizations understand what they're receiving with clear photos of your packaged surplus.
        </p>
        <span className="file-specs">Drag & drop or click to upload • PNG, JPG up to 5MB</span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </DropZone>

      {/* Thumbnails */}
      {images.length > 0 && (
        <ThumbnailGrid>
          {images.map((img, idx) => (
            <div key={idx} className="thumb-item">
              <img src={img} alt={`Upload ${idx + 1}`} />
              <button
                type="button"
                className="btn-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
              >
                <IoClose />
              </button>
            </div>
          ))}
        </ThumbnailGrid>
      )}

      {/* Quick sample image picker for convenience */}
      <SamplePresetsRow>
        <span className="preset-label">Or choose demo photo:</span>
        <button
          type="button"
          className="preset-btn"
          onClick={() => addPresetImage("/food/food1.jpg")}
        >
          <IoRestaurantOutline style={{ marginRight: 4, verticalAlign: "middle" }} />
          Cooked Meals
        </button>
        <button
          type="button"
          className="preset-btn"
          onClick={() => addPresetImage("/food/food2.jpg")}
        >
          <IoFastFoodOutline style={{ marginRight: 4, verticalAlign: "middle" }} />
          Buffet Dishes
        </button>
        <button
          type="button"
          className="preset-btn"
          onClick={() => addPresetImage("/food/food4.jpg")}
        >
          <IoCafeOutline style={{ marginRight: 4, verticalAlign: "middle" }} />
          Bakery & Breads
        </button>
      </SamplePresetsRow>
    </UploaderWrapper>
  );
}
