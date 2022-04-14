import Header from "../layouts/header/Header";
import Loader from "./Loader";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Card() {
  const [data, setData] = useState([]);
  const [img, setImg] = useState("");
  let loading;

  async function fetchData() {
    loading = true;
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_ACCESS_KEY}&per_page=40`
      )
      .then((response) => {
        const mainData = response.data.results;
        setData(mainData);
        loading = false;
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const Submit = () => {
    fetchData();
    setImg("");
  };

  return (
    <>
      <Header
        searchValue={img}
        onChangeValue={(e) => setImg(e.target.value)}
        submit={Submit}
      ></Header>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-wrapper">
          {data.map((val) => {
            return (
              <figure key={val.id} className="image-wrapper">
                <img
                  src={val.urls.small}
                  alt={val.alt_description}
                  className="image"
                />
                <h3 className="image-description">{val.alt_description}</h3>
              </figure>
            );
          })}
        </div>
      )}
    </>
  );
}
