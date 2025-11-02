import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "DIGIT_PRESSED",
        "DECIMAL_PRESSED",
        "OPERATION_SELECTED",
        "EQUALS_PRESSED",
        "CLEAR_PRESSED",
      ],
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "audit_logs",
  }
);

auditSchema.index({ timestamp: -1, createdAt: -1 });

const Audit = mongoose.model("Audit", auditSchema);

export default Audit;
