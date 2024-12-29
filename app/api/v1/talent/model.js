const { model, Schema } = require("mongoose");

const talentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", talentSchema);
