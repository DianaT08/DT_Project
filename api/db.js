import mysql2 from "mysql2"

export const db = mysql2.createConnection({
  host:"127.0.0.1",
  user:"root",
  password: "diana12345678",
  database:"blog"
})