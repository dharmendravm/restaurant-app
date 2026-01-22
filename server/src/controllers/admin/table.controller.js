import crypto from "crypto";
import QRCode from "qrcode";
import Table from "../../models/table.js";
import AppError from '../../utils/appError.js'

//  REGISTER TABLE
export const registerTable = async (req, res, next) => {
  try {
    const { tableNumber, capacity } = req.body;

    if (!tableNumber || !capacity) {
      return next(new AppError("Table number and capacity are required", 400));
    }

    // Generate unique QR slug
    const qrSlug = crypto.randomBytes(6).toString("hex");
    // Generate QR scan URL based on local network IP if available

    
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const qrCodeURL = `${FRONTEND_URL}/welcome?qr=${qrSlug}`;
    const qrImage = await QRCode.toDataURL(qrCodeURL);

    // Save in DB
    const table = await Table.create({
      tableNumber,
      capacity,
      qrImage,
      qrCodeURL,
      qrSlug,
    });

    res.status(201).json({
      success: true,
      message: "Table registered successfully",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTables = async (_req, res, next) => {
  try {
    const tables = await Table.find();

    if (!tables.length) {
      return next(new AppError("No tables found", 404));
    }

    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTableStatus = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);

    table.isActive = !table.isActive;
    await table.save();

    res.json({ success: true, id: table._id, isActive: table.isActive });
  } catch (error) {
    next(error);
  }
};
