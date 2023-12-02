import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    account : {type : String, required: true, unique: true},
    password : {type : String, required: true},
    name: {type : String, required: true},
    role: {type : String, default: "user"}
})

export const User = mongoose.model('User', userSchema);