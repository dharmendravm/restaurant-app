import Session from "../models/session.js";
import Table from "../models/table.js";
import crypto from "crypto";

export const session = async (req, res, next) => {
  try {
    const { deviceId, qrSlug } = req.body;

    const table = await Table.findOne({ qrSlug });

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "No active table found for this QR slug",
      });
    }

    const tableNumber = table.tableNumber;
    const sessionToken = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const newSession = new Session({
      deviceId,
      tableNumber,
      sessionToken,
      expiresAt,
      lastActivity: new Date(),
    });
    await newSession.save();

    res.status(201).json({
      success: true,
      data: {
        sessionToken,
        expiresAt,
        tableNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};
