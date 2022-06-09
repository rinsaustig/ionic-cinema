const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Ingrese un nombre de estudiante"],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese una contraseña"],
  },
});

module.exports = mongoose.model("User", UserSchema);
