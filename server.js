const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const feature = require('./function/process_url');
const save_to_database = feature.save_to_database;
const all_data = feature.all_data;
const find_real_link = feature.find_real_link;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL,{ useNewUrlParser: true },function(err){
    if(err) throw err;
    else console.log("Successfully connected");
});

let limit_access = function(req,res,next){
    if(req.headers.host === "https://tung2389.github.io/")
    next();
    else
    res.send("You are not allowed to access");
}
//app.use(limit_access);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res) => {
    res.send("Hello. This is the back end of shorten_url_app");
});

app.get('/:id',async (req,res) => {
    let id = req.params.id;
    let result = await find_real_link(id);
    if(result !== "404 not found")
    res.redirect(result);
    else
    res.send(result);
});

app.get('/api/all',async function(req,res){
    let data = await all_data();
    res.json(data);
});

app.post('/',async (req,res) => {
    let url = req.body.url;
    console.log(url);
    let result = await save_to_database(url);
    res.send(result);
});

app.get('/api/delete',(req,res) => {
    feature.del_data();
    res.send("Deleted");
})
app.listen(process.env.PORT || 3000);
