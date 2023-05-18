import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/places/${id}`)
      .then((res) => {
        console.log(res.data);
        setPlace(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="font-semibold">{place.title}</h1>
      <a
        target="_blank"
        className="font-semibold underline block text-sm my-2"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          {place.photos?.[0] && (
            <img
              className="aspect-square object-cover"
              src={"http://localhost:4000/uploads/" + place.photos[0]}
              alt=""
            />
          )}
          <div className="grid object-cover">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
          show all photos
        </button>
      </div>
    </div>
  );
};

export default PlacePage;
