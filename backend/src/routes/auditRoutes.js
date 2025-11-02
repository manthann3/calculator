import express from "express";
import {
  createAuditLog,
  getAuditLogs,
  deleteAllAuditLogs,
} from "../controllers/auditController.js";

const router = express.Router();

router.post("/audit", createAuditLog);
router.get("/audit", getAuditLogs);
router.delete("/audit", deleteAllAuditLogs);

export default router;
