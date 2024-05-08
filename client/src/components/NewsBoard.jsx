import { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import axios from 'axios'; 
export default function NewsBoard({ category,country,userid,isFavEnabled}) {
  const [articles, setArticles] = useState([]);
  const [articlesDb, setArticlesDb] = useState([]);

// Ensure axios is imported

  useEffect(() => {
    async function fetchData() {
      if (!isFavEnabled) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          setArticles(data.articles);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      } else {
        try {
          const response = await axios.get(`http://localhost:3001/like/${userid}`);
          const data = response.data;
          console.log(data);
          setArticlesDb(data);
          if (response.status === 200) {
            console.log("Added successfully", data);
          } else {
            console.log("Some issue occurred");
          }
        } catch (error) {
          console.error("Error with liking the article:", error);
        }
      }
    }
  
    fetchData();
  }, [category, country, isFavEnabled]); 
  

  return (
    <div style={{backgroundColor:"#01070B"}}>
      <h2 className="text-center mb-4" style={{color:"white"}}>
        Latest <span className="badge bg-danger" style={{marginTop:"15px", marginBottom: "15px"}}>News</span>
      </h2>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {isFavEnabled ? articlesDb.map((news, index) => (
          <NewsItems
            key={index}
            title={news.title}
            description={news.description}
            src={news.src}
            url={news.url}
            userid={news.id}
          />
        )):articles.map((news, index) => (
          <NewsItems
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
            userid={userid}
          />
        ))}
      </div>
    </div>
  );
}
