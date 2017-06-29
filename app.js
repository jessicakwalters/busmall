'use strict';
//global variables
var images = []; //holds objects
var currentcards = [];
var previouscards = [];
var clicks = 0;
var tableHeader = ['Product Name', 'Times Clicked', 'Times Displayed', 'Percenatge Chosen'];
var labelNames = [];
var dataSetClicked = [];
var dataSetShown = [];
var positionTable = document.getElementById('table');
var newTHead = document.createElement('thead');
var newTBody = document.createElement('tbody');

//product constructor function
function Image(imageName, path) {
  this.imageName = imageName;
  this.path = path;
  this.timesShown = 0;
  this.timesClicked = 0;
  images.push(this);
}

//create products
var bag = new Image('R2D2 Suitcase', 'assets/bag.jpg');
var banana = new Image('Banana Slicer', 'assets/banana.jpg');
var bathroom = new Image('Toilet Paper & Ipad Stand', 'assets/bathroom.jpg');
var boots = new Image('Toe-Less Rainboots', 'assets/boots.jpg');
var breakfast = new Image('Breakfast Maker', 'assets/breakfast.jpg');
var bubblegum = new Image('Meatball Bubblegum', 'assets/bubblegum.jpg');
var chair = new Image('Red Chair', 'assets/chair.jpg');
var cthulhu = new Image('Cthulhu Doll', 'assets/cthulhu.jpg');
var dogDuck = new Image('Doggie Duck Mask', 'assets/dog-duck.jpg');
var dragon = new Image('Dragon Meat', 'assets/dragon.jpg');
var pen = new Image('Silverware Pen', 'assets/pen.jpg');
var petSweep = new Image('Dusting Pet Booties', 'assets/pet-sweep.jpg');
var scissors = new Image('Pizza Scissors', 'assets/scissors.jpg');
var shark = new Image('Shark Sleeping Bag', 'assets/shark.jpg');
var sweep = new Image('Dusting Baby Onesie', 'assets/sweep.jpg');
var tauntaun = new Image('Tauntaun Sleeping Bag', 'assets/tauntaun.jpg');
var unicorn = new Image('Unicorn Meat', 'assets/unicorn.jpg');
var usb = new Image('Tentacle USB Flash Drive', 'assets/usb.jpg');
var waterCan = new Image('Self Watering Can', 'assets/water-can.jpg');
var wineGlass = new Image('Undrinkable Wine Glass', 'assets/wine-glass.jpg');

console.log('Full array of images');
console.log(images);
console.log(images.length);

//randomly choose 3 images - create a for loop that runs through the images array 3 times and randomly chooses 3 ids.
function generateNewImageSet(array) {
//make sure currentcards array is empty
  currentcards = [];
  //fill current cards array using for loop
  for (var i = 0; i < 3; i++) {
    //generate a random number between 0 and images.length -1 the random number will be used to choose a product at random
    var randomNum =  Math.round(Math.random() * (images.length - 1));
    console.log('random number' + randomNum);
    console.log(images[randomNum]);
    //use the random number to find an image
    //push the image into the currentcards array
    currentcards.push(images[randomNum]);
    //remove the image from the images array
    images.splice(randomNum, 1);
  };
  console.log(currentcards);
  console.log(images.length);
  //if there is anything stored in previouscards, add it back to the images array
  for (var i = 0; i < previouscards.length; i++) {
    images.push(previouscards[i]);
  };
};

//create a function to display currentcards to user
function displayCurrentCards(array) {
  document.getElementById('image1').style.backgroundImage = 'url(' + currentcards[0].path + ')';
  document.getElementById('image2').style.backgroundImage = 'url(' + currentcards[1].path + ')';
  document.getElementById('image3').style.backgroundImage = 'url(' + currentcards[2].path + ')';
};

//onclick log the image clicked and store in an array
//store elements in variables
var formEl0 = document.getElementById(0);
var formEl1 = document.getElementById(1);
var formEl2 = document.getElementById(2);
//add event listeners
formEl0.addEventListener('submit', handleSubmit);
formEl1.addEventListener('submit', handleSubmit);
formEl2.addEventListener('submit', handleSubmit);
//on click do the following:
function handleSubmit(event){
  event.preventDefault();
//record the click
  clicks += 1;
  //store the target of the click event in a variable and use it to record times shown and times clicked
  var target = event.target.id;
  currentcards[target].timesClicked += 1;
  for (var j = 0; j < currentcards.length; j++) {
    currentcards[j].timesShown += 1;
  }
  console.log(clicks + ' clicks');
//make sure previous cards is empty and store current cards in previouscards
  previouscards = [];
  previouscards = currentcards;
  //at 25 clicks, create table
  if (clicks === 25) {
    for (var i = 0; i < previouscards.length; i++) {
      images.push(previouscards[i]);
    }
    createTableHeader(tableHeader);
    createTableBody(images);
    for (var k = 0; k < images.length; k++) {
      images[k].createTableTbRow;
    }
    //disable buttons after 25 clicks
    document.getElementById('fieldset1').disabled = true;
    document.getElementById('fieldset2').disabled = true;
    document.getElementById('fieldset3').disabled = true;

    generateLabels(images);
    generateDataSet(images);
    generateChart();
  }

  //otherwise, display another set of images
  else {
    generateNewImageSet(images);
    displayCurrentCards(currentcards);
  }
}
//call the functions to get things started
generateNewImageSet(images);
displayCurrentCards(currentcards);

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

//createTableBody functi0n
var createTableBody = function(array) {
  positionTable.appendChild(newTBody);
  for (var i = 0; i < array.length; i++) {
    array[i].createTableTbRow();
  };
};

//prototype for each Image object to create it's own table row

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
      var percentage = (this.timesClicked / this.timesShown * 100).toFixed(2);
      if (this.timesShown === 0){
        newTbTd.textContent = 0;
      }
      else {
        newTbTd.textContent = percentage + '%';
      }
    }
  };
};
//chart
//create chart data
function generateLabels (array) {
  for (var i = 0; i < images.length; i++) {
    labelNames[i] = images[i].imageName;
  }
}

function generateDataSet (array) {
  for (var i = 0; i < images.length; i++) {
    dataSetClicked[i] = images[i].timesClicked;
    dataSetShown[i] = images[i].timesShown;
  }
}

function generateChart () {
  //document.getElementById('chart').width = 50;
  var context = document.getElementById('chart').getContext('2d');

  var chartColors = ['black', 'white', 'yellow', 'green', 'blue', 'red'];

  var myChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: labelNames,
      datasets: [
        {
          label: 'Times Clicked',
          data: dataSetClicked,
          backgroundColor: '#144E45'
        },
        {
          label: 'Times Shown',
          data: dataSetShown,
          backgroundColor: '#979797'
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 10,
            min: 0,
            stepSize: 1
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    }
  });
}
