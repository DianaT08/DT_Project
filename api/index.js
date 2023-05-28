import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus:200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  const upload = multer({ storage });

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.listen(8800,()=>{
    console.log("Connected!")
}
)