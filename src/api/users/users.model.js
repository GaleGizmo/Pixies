const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema( 
    {
        email: {type: String, unique: true, trim: true, required: true},
        password: {type: String, trim: true, required: true},
        cancionesFavoritas: [{type: mongoose.Types.ObjectId, ref: "canciones"}],
        discosFavoritas: [{type: mongoose.Types.ObjectId, ref: "discos"}],
        rol: {type: String, default: "user", enum: ["admin", "user"], required: true},
        
    }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
