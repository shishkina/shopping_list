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


  function getItems(){
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
}
