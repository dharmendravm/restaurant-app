import Session from "../models/session.js";
import Table from "../models/table.js";
import crypto from "crypto";


export const session = async (req, res, next) => {
  try {
    const { deviceId, qrSlug } = req.body;

    const table = await Table.findOne({ qrSlug });
    console.log(table);

    const tableNumber = table.tableNumber;
    const sessionToken = crypto.randomBytes(32).toString("hex");
    console.log(sessionToken);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    console.log(expiresAt.toLocaleString());

    const session = new Session({
      deviceId,
      tableNumber,
      sessionToken,
      expiresAt,
    });
    await session.save();

    res.status(201).json({
        success: true
    })
  } catch (error) {
    next(error);
  }
};
