import React from "react";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
const PlacesPage = () => {
  const [addPlace, setAddPlace] = useState(true);
  const [title, setTitle] = useState("");
  const [address, setaddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(4);
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
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      let { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
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
  const preInput = (header, description) => {
    return (
      <>
        <h2 className="text-xl mt-4">{header}</h2>
        <p className="px-1 italic text-xs text-gray-500">{description}</p>
      </>
    );
  };

  return (
    <div>
      {addPlace && (
        <div className="text-center">
          <Link
            onClick={() => setAddPlace(false)}
            className="inline-flex gap-2 bg-primary text-white rounded-full px-5 py-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
          <div>my places</div>
        </div>
      )}
      {!addPlace && (
        <div className="ml-auto mr-auto max-w-xl pl-4 pr-4">
          <form>
            {preInput(
              "Title",
              "title should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              placeholder="Title, Eg. My beautiful apartment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {preInput("Address", "address to your place")}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
            {preInput("Photos", "more=better")}
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
            {preInput("Description", "Description of the place")}
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {preInput("Perks", "Perks available at the place")}
            <div className="grid grid-cols-2 md:grid-col-2 lg:grid-col-4 gap-1">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <div className="grid grid-cols-3">
              <div>
                <h2 className="text-md mt-4">Check-in time:</h2>
                <input
                  type="text"
                  placeholder="10:00"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>
              <div>
                <h2 className="text-md mt-4">Check-out time:</h2>
                <input
                  type="text"
                  placeholder="12:00"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
              <div>
                <h2 className="text-md mt-4">Max Guests:</h2>
                <input
                  type="number"
                  placeholder="0"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            {preInput("Extra Info", "house rules etc.")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <button className="primary mt-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
