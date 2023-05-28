import {db} from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = req.query.category
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });  
}

export const getPost = (req, res) => {
    const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
}

export const addPost = (req, res) => {
  const q =
  "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`,`uid`) VALUES (?)";

const values = [
  req.body.title,
  req.body.desc,
  req.body.img,
  req.body.category,
  req.body.date,
  req.body.userId,
];

db.query(q, [values], (err, data) => {
  if (err) return res.status(500).json(err);
  return res.json("Post has been created.");
});
};

export const deletePost = (req, res) => {

  const { id: userId } = req.body;

  const postId = req.params.id;
  
  const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

  db.query(q, [postId, userId], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
}

export const updatePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.category];

    db.query(q, [...values, postId, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
};