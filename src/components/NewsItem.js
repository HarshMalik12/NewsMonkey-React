import React from "react";

const NewsItem = (props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date } =
      props;
    return (
      <div className="card my-3">
        {/* <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div> */}
        <img
          src={
            !imageUrl
              ? "https://www.the-sun.com/wp-content/uploads/sites/6/2020/07/NINTCHDBPICT000595383181-2.jpg?strip=all&quality=100&w=1920&h=1080&crop=1"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            Read More...
          </a>
        </div>
      </div>
    );
 
}

export default NewsItem;
