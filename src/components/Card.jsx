import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../layouts/header/Header";
import Pagination from "./Pagination";

import downloadIcon from "../assets/images/download.png";

export default function Card() {
  const [data, setData] = useState([]);
  const [img, setImg] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pagination, setPagination] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchData(pageNum) {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${pageNum}&query=${img}&client_id=${process.env.REACT_APP_ACCESS_KEY}&per_page=30`
      );

      const mainData = response.data.results;

      setTotalPages(response.data.total_pages);
      setData(mainData);
    } catch (error) {
      console.error(error);
    }
  }

  const Submit = () => {
    fetchData(pageNum);
    setPagination(true);
  };

  const enterKeyHandler = (e) => {
    if (e.key === "Enter") {
      fetchData(pageNum);
      setPagination(true);
    }
  };

  useEffect(() => {
    fetchData(pageNum);
  }, []);

  const mainNextPageClickHandler = () => {
    setPageNum(pageNum + 1);
    fetchData(pageNum + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mainPrevPageClickHandler = () => {
    setPageNum(pageNum - 1);
    fetchData(pageNum - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    async function downloadImage(imageSrc, imageName) {
      const image = await fetch(imageSrc)
      const imageBlog = await image.blob()
      const imageURL = URL.createObjectURL(imageBlog)
    
      const link = document.createElement('a')
      link.href = imageURL
      link.download = imageName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

  return (
    <>
      <Header
        searchValue={img}
        onChangeValue={(e) => {
          setPageNum(1);
          setImg(e.target.value);
        }}
        submit={Submit}
        enterSubmit={enterKeyHandler}
      ></Header>
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
              <figure
                className="download-link"
                onClick={() => {
                  const splitImageName = val.alt_description.split(' ');
                  const joinedImageName = splitImageName.join('-');
                  downloadImage(val.urls.small, joinedImageName)
                }}
              >
                <img
                  src={downloadIcon}
                  alt="Download Icon"
                  className="download-icon"
                />
              </figure>
            </figure>
          );
        })}
      </div>
      {pagination ? (
        <Pagination
          page={pageNum}
          totalNumOfPages={totalPages}
          nextPageClickHandler={mainNextPageClickHandler}
          prevPageClickHandler={mainPrevPageClickHandler}
        />
      ) : null}
    </>
  );
}
