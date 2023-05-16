import React from "react";
import { Link } from "react-router-dom";

const MyPlaces = ({ places }) => {
  return (
    <div>
      {places.map((place) => (
        <Link
          to={"/account/places/" + place._id}
          className="border bg-gray-200 rounded-2xl my-2 p-4 flex gap-1 cursor-pointer"
        >
          <div className="flex w-32 h-32 grow shrink-0 bg-gray-300">
            {place.photos.length > 0 && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt=""
                className="object-cover"
              />
            )}
          </div>
          <div className="grow-0 shrink">
            <h2>{place.title}</h2>
            <p className="text-sm">{place.address}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MyPlaces;
