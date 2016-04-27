'use strict'

app.controller('ShoppingController', ['$http','$log', ShoppingController]);

function ShoppingController($http, $log){
  $log.info("Inside the controller");
  //declate self as this, so to have access to it inside the functions
  var self = this;
  //collections
  self.all = [];
  self.newItem = {};
  //methods
  self.addItem = addItem;
  self.getItems;
  self.deleteItem = deleteItem;
  //call getItems method to display the list
  getItems();

//send requests to the server:
  function getItems(){
    //get all items in the shopping list
               $http.get('/items')
                    .then(function(res){
                      self.all = res.data;
                      $log.log(self);
                    })
                    .catch(function(res){
                      $log.error('failure', res);
                    })
  }
  function deleteItem(item){
    $log.log(self);
    //delete an item send the id to the server and delete that item
                    $http({
                      method: 'DELETE',
                      url: '/items/' + item._id
                    })
                    .then(function(res){
                      getItems();
                      $log.log(self);
                    })
                    .catch(function(res){
                      $log.error('failure', res);
                    })
  }
  //add a new item to the list
  function addItem(){
    $log.log(self);
                    $http({
                      method: 'POST',
                      url: '/items',
                      data: self.newItem
                    })
                    .then(function(res){
                      getItems();
                      $log.log(self);
                    })
                    .catch(function(res){
                      $log.error('failure', res);
                    })
                    self.newItem = {};
  }
  //edit particular item in the list
  function editItem(item){
    console.log("hit edit");
    console.log(item.text);
                    $http({
                      method: 'PUT',
                      url: '/items/' + item._id,
                      data: item
                    })
                    .then(function(res){
                      console.log(res);
                      getItems();
                    }, function(err){
                      console.log(err);
                    });

  }
}
