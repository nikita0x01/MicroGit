const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    content: [
      {
        type: String,
      },
    ],

    visibility: {
      type: Boolean, // true = public, false = private (if that's your design)
      default: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
  },

  // ✅ timestamps MUST be placed here
  {
    timestamps: true,
  }
);

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;
