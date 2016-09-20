var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    var serveFunction = serve.bind(this, "Happy Eating!", this.customer)
    setTimeout(function() {
      updateFunction(serveFunction())
    }, 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this);
  mix.call(cake, updateCakeStatus);
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this);
  mix.call(pie, updatePieStatus);
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText

}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  var coolFunction = cool.bind(this)
  setTimeout(function() {
    coolFunction(updateFunction);
  }, 2000)
  updateFunction(status);
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  var bakeFunction = bake.bind(this)
  setTimeout(function() {
    bakeFunction(updateFunction);
  }, 2000)
  updateFunction(status);
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  var decorate = cake.decorate.bind(this)
  setTimeout(function() {
    decorate(updateFunction)
  }, 2000)
  updateFunction(status);
}

function makeDessert() {
  if (this.innerHTML === "Make Cake") {
    var div = this.parentElement;
    makeCake.call(div);
  } else {
    var div = this.parentElement;
    makePie.call(div);
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
