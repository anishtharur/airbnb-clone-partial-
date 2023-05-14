import React, { useState } from "react";
import axios from "axios";
const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axios.post("/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onChange((prev) => {
      return [...prev, ...filenames];
    });
  };
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      let { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      onChange((prev) => {
        return [
          ...prev,
          filename.split("/")[filename.split("/").length - 1].trim(),
        ];
      });
      setPhotoLink("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add photo using a link..."
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-300 px-4 rounded-2xl text-xs font-bold"
          onClick={addPhotoByLink}
        >
          Add&nbsp;Photo
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={`${link}`} className="h-32 flex">
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:4000/uploads/" + link}
                alt={`${link}`}
              />
            </div>
          ))}
        <label
          for="upload"
          className="cursor-pointer border bg-transparent flex rounded-2xl text-gray-600 items-center p-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm text-center p-2">Upload from device</p>
        </label>
        <input
          type="file"
          className="hidden"
          id="upload"
          onChange={uploadPhoto}
          multiple
        />
      </div>
    </div>
  );
};

export default PhotosUploader;
