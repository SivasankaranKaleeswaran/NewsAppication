import axios from "axios";
import React from "react";

function NewsItems({ title, description, src, url, userid }) {
  const handleLike = async () => {
    try {
      const data1 = { userid, title, description, src, url };
      const response = await axios.post("http://localhost:3001/like", data1);
      console.log("Data sent:", data1);
      if (response.status === 200) {
        console.log("Added successfully", data1);
      } else {
        console.log("Some issue occurred");
      }
    } catch (error) {
      console.error("Error in posting data:", error);
    }
  };

  return (
    title &&
    description &&
    src &&
    url && (
      <div
        className="card bg-light mb-3"
        style={{
          backgroundColor: "#B49734",
          maxWidth: "345px",
          margin: "20px",
          boxShadow: "0px 0px 15px rgba(255,255,255,0.9)",
        }}
      >
        <img
          src={src}
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </h5>
          <p className="card-text">
            {description.length > 90
              ? `${description.slice(0, 90)}...`
              : description}
          </p>
          <div className="d-flex justify-content-between align-items-center" style={{color:"black"}}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
              style={{color:"black"}}
            >
              Read More
            </a>
            <button onClick={handleLike} className="btn btn-outline-secondary" style={{color:"black"}}> 
              Save for Later
            </button>{" "}
          </div>
        </div>
      </div>
    )
  );
}

export default NewsItems;
