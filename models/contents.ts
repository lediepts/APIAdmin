import mongoose from "mongoose";

const ContentsSchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      default: "root",
    },
    title: {
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
      },
    },
    description: {
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
      },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.models.Contents ||
  mongoose.model("Contents", ContentsSchema);
