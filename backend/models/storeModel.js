import mongoose from 'mongoose';
const storeSchema = new mongoose.Schema({
    storeName : {type : String, required: true, unique: true}
},{
    timestamps : true
})

export const Store = mongoose.model('Store', storeSchema);