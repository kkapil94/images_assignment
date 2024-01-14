import Image from "../model/imagesModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/dataUri.js";

export const addImage = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400);
      return next(new Error("Please enter all the fields"));
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const result = await cloudinary.v2.uploader.upload(fileUri.content);
    const newImg = await Image.create({
      name,
      description,
      url: result.secure_url,
      owner: req.user.id,
      avatar: result.secure_url,
    });
    res.status(200).json({
      success: true,
      msg: "image added successfully",
      newImg,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

export const getAllImages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const images = await Image.find({ owner: userId });
    res.status(200).json({
      success: true,
      images,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

export const getImage = async (req, res, next) => {
  try{const { id } = req.params;
  if (!id) {
    res.status(400);
    return next(new Error("Image id is not present"));
  }
  const image = await Image.findById(id);
  res.status(200).json({success:true,image})}
  catch(err){
    return next(new Error(err));
  }
};

export const incView = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      return next(new Error("Image id is not present"));
    }
    const data = await Image.findById(id);
    data.views += 1;
    await data.save();
    res.status(200).json({success:true,data})
  } catch (err) {
    return next(new Error(err));
  }
};
