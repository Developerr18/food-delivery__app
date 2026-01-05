import express from "express";
import {
  addFood,
  listFoods,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

///////////////////////////////////////
// Image storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/////////////////////////////////////////
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFoods);
foodRouter.post("/remove", removeFood);

export default foodRouter;
