import mongoose from "mongoose"

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
  { _id: false }
)

const SnippetSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    requird: true,
  },
  code: {
    type: String,
    required: true,
  },
  tags: {
    type: [TagSchema],
    default: [],
    required: true,
  },
  creationDate: {
    type: String,
    default: "",
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false,
    required: true
  },
  isTrash: {
    type: Boolean,
    default: false,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
})

const SingleSnippet = mongoose.models.SingleSnippet || mongoose.model("SingleSnippet", SnippetSchema)

export default SingleSnippet