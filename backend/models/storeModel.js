import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    store : {type : String, required: true, unique: true}
},{
    timestamps : true
})

export const Store = mongoose.model('Store', storeSchema);