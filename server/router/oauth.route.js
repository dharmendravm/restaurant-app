import express from "express";
import { githubLogin, googleLogin } from "../controllers/oauth.controller.js";

const router = express.Router();

router.post("/google/verify", googleLogin);
router.post("/github/verify", githubLogin);

export default router;
