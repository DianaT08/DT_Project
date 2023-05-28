import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
const Home = () => {
  const [posts,setPosts] = useState([])
  
  const category = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
        {
          posts.map((post)=>(
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`../upload/${post.img}`}></img>
              </div>
              <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link className="link" to={`/post/${post.id}`}>
              <button>Read More</button>
              </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home