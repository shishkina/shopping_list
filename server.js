var express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    Item = require('./models/item.js'),
    bodyParser = require('body-parser'),
    app = express();


app.use(express.static('public'));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/shoppingApp', function(err){
  if(err){
    console.log(err);
  } else {
    console.log("connection successful");
  }
});
app.listen(3000, function(){
  console.log("Listening on port 3000..");
});

app.get('/items', function(req, res){
  Item.find().exec(function(err, item){
    res.send(item);
  })
});
app.post('/items', function(req, res){
  var item = new Item(req.body);
  item.save(function(err){
    if(err) {
    console.log(err);
  } else {
    console.log("Item saved");
    res.send(item);
  }
  })
});
app.delete('/items/:id', function(req, res){
  Item.remove({_id:req.params.id}).exec(function(err, item){
    res.send(item);
  })
})
