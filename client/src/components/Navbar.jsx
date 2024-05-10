import React, { useState, useEffect } from "react";
import Login from "./login";
import "./navbar.css";
function Navbar({
  setCategory,
  setCountry,
  setUserid,
  setIsFavEnabled,
  isFavEnabled,
}) {
  const [weatherData, setWeatherData] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [cat, setCat] = useState("Category");
  const [cou, setCou] = useState("Country");
  const [loginuser, setLoginUser] = useState("");
  const [temp, setTemp] = useState("");
  const [shortForecast, setShortForecast] = useState("");
  const [detailedForecast, setDetailedForecast] = useState("");
  const [icon, setIcon] = useState("");
  const weatherIcons = {
    sunny: "☀️",
    cloudy: "☁️",
    windy: "🌬️",
    partlyCloudy: "⛅",
    rainy: "🌧️",
    thunderstorm: "⛈️",
  };

  // Function to toggle the display of the login modal
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };
  const handleFav = () => {
    setIsFavEnabled(!isFavEnabled);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          const currentDate = new Date().toISOString().split("T")[0];
          const response = await fetch(
            `https://api.weather.gov/points/${location}`
          );
          const data = await response.json();
          const response1 = await fetch(data.properties.forecast);
          const data1 = await response1.json();
          const firstPeriod = data1.properties.periods[0];
          const shortForecast = firstPeriod.shortForecast;
          const detailedForecast = firstPeriod.detailedForecast;
          setTemp(data1.properties.periods[0].temperature);
          setShortForecast(shortForecast);
          setDetailedForecast(detailedForecast);
          console.log(detailedForecast);
          const iconKey =  'sunny';//shortForecast.toLowerCase();
          const key = Object.keys(weatherIcons).find((k) =>
            k.includes(iconKey)
          );
          console.log("key "+key)
          if (key) {
            setIcon[weatherIcons[key]];
          }
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [loginuser]);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div
        className="container-fluid"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <a
          className="navbar-brand"
          onClick={() => {
            setCategory("general");
            setCat("Category");
            setCountry("us");
            setCou("Country");
            setIsFavEnabled(false);
          }}
        >
          <span className="badge bg-light text-dark fs-4" role="button">
            News Plus
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ display: "flex" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "20px",
                }}
              >
                {cat}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCategory("entertainment");
                      setCat("Entertainment");
                      setIsFavEnabled(false);
                    }}
                  >
                    Entertainment
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCategory("health");
                      setCat("Health");
                      setIsFavEnabled(false);
                    }}
                  >
                    Health
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCategory("science");
                      setCat("Science");
                      setIsFavEnabled(false);
                    }}
                  >
                    Science
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCategory("sports");
                      setCat("Sports");
                      setIsFavEnabled(false);
                    }}
                  >
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCategory("technology");
                      setCat("Technology");
                      setIsFavEnabled(false);
                    }}
                  >
                    Technology
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "20px",
                }}
              >
                {cou}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCountry("in");
                      setCou("India");
                      setIsFavEnabled(false);
                    }}
                  >
                    India
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCountry("ua");
                      setCou("Saudi");
                      setIsFavEnabled(false);
                    }}
                  >
                    Saudi Arabia
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setCountry("jp");
                      setCou("Japan");
                      setIsFavEnabled(false);
                    }}
                  >
                    Japan
                  </a>
                </li>
              </ul>
            </li>
            {loginuser && (
              <a
                className="nav-link"
                role="button"
                data-bs-toggle=""
                aria-expanded="false"
                onClick={handleFav}
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "20px",
                }}
              >
                Fav News
              </a>
            )}
            {loginuser && (
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
              >
                {/* Weather data display in the navbar */}
                <li className="nav-item">
                  <span className="nav-link" style={{ position: "relative" }}>
                    {/* Display temperature */}
                    {icon} {shortForecast}
                    {" " + temp}°F{" "}
                    {/* Display weather icon based on current condition */}
                    <span
                      className="weather-icon-hover"
                      aria-label="Today's Weather"
                      style={{ position: "relative", cursor: "default" }}
                    >
                      {icon} {/* Display the emoji based on currentCondition */}
                      <span
                        style={{
                          visibility: "hidden",
                          position: "absolute",
                          left: "100%",
                          marginLeft: "10px",
                          backgroundColor: "white",
                          padding: "5px 10px",
                          border: "1px solid #ccc",
                          whiteSpace: "nowrap",
                          zIndex: 1000,
                        }}
                        className="tooltip-text"
                      >
                        {detailedForecast}
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
            )}
          </ul>

          <style jsx>{`
            .weather-icon-hover:hover .tooltip-text {
              visibility: visible;
            }
          `}</style>

          <button
            className="btn btn-outline-success"
            onClick={toggleLogin}
            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            id="loginButton"
          >
            {loginuser === "" ? "Login" : loginuser}
          </button>
        </div>
      </div>
      {/* Modal for login */}

      {showLogin && (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleLogin}
                ></button>
              </div>
              <div className="modal-body">
                <Login
                  setShowLogin={setShowLogin}
                  setLoginUser={setLoginUser}
                  setUserid={setUserid}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          #loginButton {
            border-color: white !important; /* Override Bootstrap color */
          }
          #loginButton:hover {
            border-color: white !important; /* Ensure hover state also has white border */
            background-color: rgba(255, 255, 255, 0.1) !important; /* Optional: subtle hover effect */
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
