import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";


const Write = () => {

  const state = useLocation().state

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title|| "");
  const [file, setFile] = useState(null);
  const [category, setCat] = useState(state?.category|| "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:8800/api/upload", formData);
        return res.data;
      } else {
        return ""; // Return an empty string if no file is provided
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload()

    try{
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData.id;
      state
      ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
          title,
          desc: value,
          category,
          img: file ? imgUrl : "",
          userId,
        }): await axios.post(`http://localhost:8800/api/posts/`, {
          title,
          desc: value,
          category,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          userId,
        });
      
        navigate("/")
    }catch(err){
      console.log(err);
    }
  };



  return (
    <div className='add'>
      <div className="content">
      <input
          type="text"
          value = {title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
          </div>
          </div>
      <div className="menu">
        <div className="item">
        <h1>Publish</h1>
          <input
          style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
        <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={category === "java"}
              name="cat"
              value="java"
              id="java"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="java">Java</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "javascript"}
              name="cat"
              value="javascript"
              id="javascript"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="javascript">Javascript</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "ccplus"}
              name="cat"
              value="ccplus"
              id="ccplus"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="ccplus">C/C++</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "csharp"}
              name="cat"
              value="csharp"
              id="csharp"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="csharp">C#</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "matlab"}
              name="cat"
              value="matlab"
              id="matlab"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="matlab">Matlab</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write