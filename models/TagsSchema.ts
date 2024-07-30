import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
)

const SingleTag = mongoose.models.Tag || mongoose.model("Tag", TagSchema)

export default SingleTag