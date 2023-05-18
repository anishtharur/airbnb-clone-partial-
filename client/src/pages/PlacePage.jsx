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
      .get(`/place/${id}`)
      .then((res) => {})
      .catch((err) => console.log(err));
  }, [id]);
  return <div>{id}</div>;
};

export default PlacePage;
