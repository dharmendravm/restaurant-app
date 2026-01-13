import cloudinary from "../../config/cloudinary.js";
import Menu from "../../models/menu.js";
import AppError from "../../utils/appError.js";

export const createMenu = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
      return next(new AppError("Name, price and category are required", 400));
    }

    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    const exists = await Menu.findOne({ name });
    if (exists) {
      return next(new AppError("Menu item already exists", 409));
    }

    const filePath = req.file.path;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "menu",
    });

    if (!uploadResult?.secure_url) {
      return next(new AppError("Image upload failed", 500));
    }

    const menuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "New menu item added successfully",
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};
