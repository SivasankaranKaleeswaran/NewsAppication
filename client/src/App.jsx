import React, { useState } from "react";
import Navbar from "./components/Navbar";
import NewsBoard from "./components/NewsBoard";
import Login from "./components/login";

export default function App() {
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("us");
  const [userid, setUserid] = useState("");
  const [isFavEnabled, setIsFavEnabled] = useState(false);
  return (
    <div>
      <Navbar setCategory={setCategory} setCountry={setCountry} setUserid={setUserid} setIsFavEnabled={setIsFavEnabled} isFavEnabled={isFavEnabled}/>
      <NewsBoard category={category} country={country} userid={userid} isFavEnabled={isFavEnabled} />
    </div>
  );
}