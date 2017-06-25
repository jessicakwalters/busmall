'use strict';
//Create an array of all the images - done
var images = []; //holds objects
var currentcards = [];
var previouscards = [];
var clicks = 0;
var tableHeader = ['Product Name', 'Times Clicked', 'Times Displayed', 'Percenatge Chosen'];

function Image(imageName, path, elId) {
  this.imageName = imageName;
  this.path = path;
  this.elId = elId;
  this.timesShown = 0;
  this.timesClicked = 0;
  images.push(this);
}

var bag = new Image('bag', 'assets/bag.jpg', 1);
var banana = new Image('banana', 'assets/banana.jpg', 2);
var bathroom = new Image('bathroom', 'assets/bathroom.jpg', 3);
var boots = new Image('boots', 'assets/boots.jpg', 4);
var breakfast = new Image('breakfast', 'assets/breakfast.jpg', 5);
var bubblegum = new Image('bubblegum', 'assets/bubblegum.jpg', 6);
var chair = new Image('chair', 'assets/chair.jpg', 7);
var cthulhu = new Image('cthulhu', 'assets/cthulhu.jpg', 8);
var dogDuck = new Image('dog-duck', 'assets/dog-duck.jpg', 9);
var dragon = new Image('dragon', 'assets/dragon.jpg', 10);
var pen = new Image('pen', 'assets/pen.jpg', 11);
var petSweep = new Image('pet-sweep', 'assets/pet-sweep.jpg', 12);
var scissors = new Image('scissors', 'assets/scissors.jpg', 13);
var shark = new Image('shark', 'assets/shark.jpg', 14);
var sweep = new Image('sweep', 'assets/sweep.jpg', 15);
var tauntaun = new Image('tauntaun', 'assets/tauntaun.jpg', 16);
var unicorn = new Image('unicorn', 'assets/unicorn.jpg', 17);
var usb = new Image('usb', 'assets/usb.jpg', 18);
var waterCan = new Image('water-can', 'assets/water-can.jpg', 19);
var wineGlass = new Image('wine-glass', 'assets/wine-glass.jpg', 20);

//randomly choose 3 images - create a for loop that runs through the images array 3 times and randomly chooses 3 ids.

console.log('Full array of images');
console.log(images);
console.log(images.length);

function generateNewImageSet(array) {
  currentcards = [];
  for (var i = 0; i < 3; i++) {
    //generate a random number between 0 and images.length -1
    var randomNum =  Math.round(Math.random() * (images.length - 1));
    console.log('random number' + randomNum);
    console.log(images);
    console.log(images[randomNum]);
    //use the random number to find an image
    //push the image into the currentcards array
    currentcards.push(images[randomNum]);
    console.log(currentcards);
    //remove the image from the images array
    images.splice(randomNum, 1);
    console.log(images);
  };
  for (var i = 0; i < previouscards.length; i++) {
    images.push(previouscards[i]);
  };
};

//display currentcards to user
function displayCurrentCards(array) {
  console.log(currentcards[0].path);
  document.getElementById('image1').style.backgroundImage = 'url(' + currentcards[0].path + ')';
  document.getElementById('image2').style.backgroundImage = 'url(' + currentcards[1].path + ')';
  document.getElementById('image3').style.backgroundImage = 'url(' + currentcards[2].path + ')';
};

//onclick log the image clicked and store in an array
var formEl0 = document.getElementById(0);
var formEl1 = document.getElementById(1);
var formEl2 = document.getElementById(2);

formEl0.addEventListener('submit', handleSubmit);
formEl1.addEventListener('submit', handleSubmit);
formEl2.addEventListener('submit', handleSubmit);

function handleSubmit(event){
  event.preventDefault();
  clicks += 1;
  var target = event.target.id;
  console.log(target);
  currentcards[target].timesClicked += 1;
  for (var j = 0; j < currentcards.length; j++) {
    currentcards[j].timesShown += 1;
  }
  console.log(clicks + ' clicks');
  previouscards = [];
  previouscards = currentcards;
  if (clicks === 25) {
    createTableHeader(tableHeader);
    createTableBody(images);
    for (var k = 0; k < images.length; k++) {
      images[k].createTableTbRow;
    }
  }
  else {
    generateNewImageSet(images);
    displayCurrentCards(currentcards);
  }
}
generateNewImageSet(images);
displayCurrentCards(currentcards);

//restart loop

var positionTable = document.getElementById('table');
var newTHead = document.createElement('thead');
var newTBody = document.createElement('tbody');

//create table header function
var createTableHeader = function(array) {
  var newThRow = document.createElement('tr');
  positionTable.appendChild(newTHead);
  newTHead.appendChild(newThRow);
  for (var j = 0; j < array.length; j++) {
    var newTh = document.createElement('th');
    newThRow.appendChild(newTh);
    newTh.textContent = array[j];
    if (j === 0){
      newTh.id = 'firstItem';
    };
  };
};

//createTableBody functin
var createTableBody = function(array) {
  positionTable.appendChild(newTBody);
  for (var i = 0; i < array.length; i++) {
    array[i].createTableTbRow();
  };
};

Image.prototype.createTableTbRow = function() {
  var newTbRow = document.createElement('tr');
  newTBody.appendChild(newTbRow);
  //write table data to page
  for (var j = 0; j < tableHeader.length; j++) {
    var newTbTd = document.createElement('td');
    if (j === 0){
      newTbTd.id = 'firstItem';
      newTbRow.appendChild(newTbTd);
      newTbTd.textContent = this.imageName;
    }
    else if (j === 1){
      newTbRow.appendChild(newTbTd);
      newTbTd.textContent = this.timesClicked;
    }
    else if (j === 2){
      newTbRow.appendChild(newTbTd);
      newTbTd.textContent = this.timesShown;
    }
    else {
      newTbRow.appendChild(newTbTd);
      var percentage = this.timesClicked / this.timesShown * 100;
      if (percentage == NaN){
        newTbTd.textContent = 0;
      }
      else {
        newTbTd.textContent = percentage + '%';
      }
    }
  };
};
