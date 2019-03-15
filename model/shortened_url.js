const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url_schema = new Schema({
    short_id: {
        type: String,
        required: true,
        unique: true
    },
    real_url:{
        type: String,
        required: true
    }
},{timestamps : true});

const shortened_url = mongoose.model('shortened_url',url_schema);
module.exports = shortened_url;