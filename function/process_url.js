const shortened_url = require('../model/shortened_url');
const shortid = require('shortid');

function save_to_database(url){
    const id = shortid.generate();
    return shortened_url
            .create({
                short_id: id,
                real_url: url
            })
            .then(data => {
                return data.short_id
            })
};

function all_data(){
    return shortened_url
        .find({})
        .then(data => {
            return data;
        })
};

function del_data(){
    shortened_url
        .deleteMany({})
        .then(console.log("ok"));
};

function find_real_link(id){
    return shortened_url
            .findOne({short_id:id})
            .then(data => {
                return data.real_url;
            })
            .catch(err => {
                return "404 not found";
            })
}
module.exports = {save_to_database,all_data,del_data,find_real_link};