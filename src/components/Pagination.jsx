import React from "react";

import previous from "../assets/images/less-than-symbol.png";
import next from "../assets/images/greater-than-symbol.png";

export default function Pagination(props) {
  return (
    <div className="pagination-wrapper">
      <div className="pagination-block">
        {props.page > 1 ? (
          <div className="pagination__single-block" onClick={props.prevPageClickHandler}>
            <img src={previous} alt="Less than Icon" />
          </div>
        ) : null}
        <div className="pagination__single-block">{props.page}</div>
        {props.page != props.totalNumOfPages ? (
          <div
            className="pagination__single-block"
            onClick={props.nextPageClickHandler}
          >
            <img src={next} alt="Greater than Icon" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
