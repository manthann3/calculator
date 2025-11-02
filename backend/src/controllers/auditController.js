import Audit from "../models/Audit.js";
import { sendSuccess, sendError } from "../utils/response.js";

export async function createAuditLog(req, res) {
  try {
    const { id, timestamp, action, value } = req.body;

    if (!id || !timestamp || !action || !value) {
      return sendError(res, "Missing required fields", 400);
    }

    const existingLog = await Audit.findOne({ id });
    if (existingLog) {
      return sendError(res, "Audit log with this ID already exists", 409);
    }

    const auditLog = new Audit({
      id,
      timestamp: new Date(timestamp),
      action,
      value,
    });

    await auditLog.save();

    return sendSuccess(res, auditLog, "Audit log created successfully", 201);
  } catch (error) {
    console.error("Error creating audit log:", error);
    return sendError(res, error.message, 500);
  }
}

export async function getAuditLogs(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const skip = parseInt(req.query.skip) || 0;

    const logs = await Audit.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Audit.countDocuments();

    return sendSuccess(
      res,
      {
        logs,
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
      "Audit logs retrieved successfully"
    );
  } catch (error) {
    console.error("Error retrieving audit logs:", error);
    return sendError(res, error.message, 500);
  }
}

export async function deleteAllAuditLogs(req, res) {
  try {
    const result = await Audit.deleteMany({});

    return sendSuccess(res, result, "All audit logs deleted successfully");
  } catch (error) {
    console.error("Error deleting audit logs:", error);
    return sendError(res, error.message, 500);
  }
}

export default {
  createAuditLog,
  getAuditLogs,
  deleteAllAuditLogs,
};
