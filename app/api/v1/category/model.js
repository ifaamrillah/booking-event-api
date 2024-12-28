const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name must be at most 100 characters"],
      required: [true, "Name is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
