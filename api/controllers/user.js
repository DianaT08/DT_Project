import {db} from "../db.js";

export const updateUser = (req, res) => {
    const userId = req.body.userId;
      const q =
        "UPDATE users SET `username`=?,`email`=? WHERE `id` = ?";
  
      const values = [req.body.username, req.body.email];
  
      db.query(q, [...values, userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      });
}

export const deleteUser = (req, res) => {
    const userId = req.params.id;
  
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(403).json("The user doesn't exist!");

    return res.json("User has been deleted!");
  });
}