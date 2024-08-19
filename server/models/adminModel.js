const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true,}
});

adminSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

adminSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("Admin", adminSchema);
