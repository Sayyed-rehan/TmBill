import { Schema, model } from "mongoose";
import npm_validator from "validator";


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [1, "Name field cannot be Empty"],
    validate: {
      validator: function (val) {
        return npm_validator.isAlpha(val, "en-IN", { ignore: "s" });
      },
      message: "Please provide a valid name",
    },
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This Email Addres is Already Exits"],
    validate: {
        validator: function (val) {
          return npm_validator.isEmail(val);
        },
        message: 'Please provide a valid email address',
      },
  },
  contact: {
    type: Number,
    required: true,
    unique: [true, "This Contact Number is Already Exits"],
    min: [10, "Contact number must be exactly 10 digits"],
    validate: {
      validator: function (val) {
        return val.toString().length === 10;
      },
      message: "Contact number must be exactly 10 digits",
    },
  },
  password: { type: String, required: true},
});

const User = model("User", userSchema);

export default User;
