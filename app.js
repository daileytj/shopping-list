'use strict'
// Create state and functions
var state = {
  items: [{
    name: "apples",
    checked: false
  }, {
    name: "oranges",
    checked: false
  }, {
    name: "milk",
    checked: true
  }, {
    name: "bread",
    checked: false
  }]
};

// add item to state
function addItem(state, itemObject) {
 // console.log(itemObject);
  state.items.push(itemObject);
 // console.log(state);
  //console.log("item added");
}

// toggle "checked" key
function toggleChecked(state, itemName) {
  //
  var itemsArray = state.items;
  for( var i = 0; i < itemsArray.length; i+=1){
    if(itemsArray[i].name === itemName){
      itemsArray[i].checked = !itemsArray[i].checked;
    };
  };
  //console.log("toggle");
}


// delete item
function removeItem(state, itemName) {
  var index;
  // create array to use locally
  var itemsArray = state.items;
  // loop through array and compare item to be removed against itemsArray
  for(var i = 0; i <itemsArray.length; i+=1){
    //console.log(i);
    
    if(itemsArray[i].name === itemName){
      //console.log("itemsArray[i].name = ", itemsArray[i].name);
      //console.log("itemName = ", itemName);
      index = i;
      //console.log(i);
    };
  }
  // remove 1 item starting at 'index'
  itemsArray.splice(index,1);
  
  console.log("item removed");
  
}

// render list
function renderList(state, JQueryElement) {
//  console.log("list rendered");
var renderedHTML = state.items.map(function(item){
  var row = "";
  row += "<li>";
  if (item.checked === false){
    row += '<span class="shopping-item">' + item.name + '</span>';
  }
  else{
    row += '<span class="shopping-item shopping-item__checked">' + item.name + '</span>';
  }
  row += '<div class="shopping-item-controls">';
  row += '<button class="shopping-item-toggle">';
  row += '<span class="button-label">check</span>';
  row += '</button>';
  row += '<button class="shopping-item-delete">';
  row += '<span class="button-label">delete</span>';
  row += '</button>';
  row += '</div>';
  row += '</li>';

  return row;
});
  JQueryElement.html(renderedHTML);
  // reset entry field
  $('#shopping-list-entry').val('');
}

// Run program
$(document).ready(function() {
  renderList(state,$(".shopping-list"));
  $("#js-shopping-list-form").on("submit", function(event) {
    event.preventDefault();
    var itemToAdd = $("#shopping-list-entry").val();
    if(itemToAdd !== ""){
      var objectToAdd = {name: itemToAdd,
      checked:false};
    addItem(state, objectToAdd);
    renderList(state, $(".shopping-list"));
  };
  });
});

 $("ul").on("click", "button.shopping-item-toggle", function(event) {
    var itemName = $(this).closest('li').find('.shopping-item').text();
    toggleChecked(state, itemName);
    renderList(state, $(".shopping-list"));
  });

  $("ul").on("click", "button.shopping-item-delete", function(event) {
    var itemName = $(this).closest('li').find('.shopping-item').text();
    removeItem(state,itemName);
    renderList(state, $(".shopping-list"));
  });