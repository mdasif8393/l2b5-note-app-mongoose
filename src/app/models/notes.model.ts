import { model, Schema } from "mongoose";

// create mongoose schema
export const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["personal", "work", "study", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: "gray",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// create mongoose model
export const Note = model("Note", noteSchema); // "Note" is model name
