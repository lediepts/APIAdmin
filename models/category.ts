import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    parentId: {
      type: String,
      required: true,
      default: "root",
    },
    en: {
      type: String,
      required: true,
    },
    vi: {
      type: String,
      required: false,
    },
    ja: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
