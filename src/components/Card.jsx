import Header from "../layouts/header/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Card() {
  const [data, setData] = useState([]);
  const [img, setImg] = useState("");

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_ACCESS_KEY}&per_page=40`
      );
      const mainData = response.data.results;
      setData(mainData);
    } catch (error) {
      console.error(error);
    }
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
      <div className="main-wrapper">
        {data.map((val) => {
          return (
            <figure key={val.id} className='image-wrapper'>
              <img src={val.urls.small} alt={val.alt_description} className='image'/>
              <h3 className="image-description">{val.alt_description}</h3>
            </figure>
          );
        })}
      </div>
    </>
  );
}
