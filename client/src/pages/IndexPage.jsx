import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/places")
      .then((res) =>
        setPlaces([
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
          ...res.data,
        ])
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
      {places.map((place) => (
        <div>
          <div className="bg-gray-500 rounded-2xl">
            {place.photos?.[0] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                alt=""
                className="rounded-2xl object-cover aspect-square"
              />
            )}
          </div>
          <div className="px-2">
            <h3 className="font-bold text-base">{place.address}</h3>
            <h2 className="text-sm truncate">{place.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
