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
var randomNumbers = [];
var randomNum = 0;
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
  console.log(images);
  currentcards = [];
  randomNumbers = [];
  //fill current cards array using for loop
  for (var i = 0; i < 3; i++) {
    //generate a random number between 0 and images.length -1 the random number will be used to choose a product at random
    randomNum = Math.round(Math.random() * (images.length - 1));
    while (randomNum === randomNumbers[0] || randomNum === randomNumbers[1] || randomNum === previouscards[0] || randomNum === previouscards[1] || randomNum === previouscards[2]) {
      randomNum = Math.round(Math.random() * (images.length - 1));
    }

    console.log(randomNum);
    randomNumbers.push(randomNum);
      //Create an array of image objects using randomNumbers
    currentcards[i] = images[randomNumbers[i]];
  };
  console.log(currentcards);
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
  clicks++;
  //store the target of the click event in a variable and use it to record times shown and times clicked
  var target = event.target.id;
  currentcards[target].timesClicked += 1;
  for (var j = 0; j < currentcards.length; j++) {
    currentcards[j].timesShown += 1;
  }
  console.log(clicks + ' clicks');
//make sure previous cards is empty and store current cards in previouscards
  previouscards = [];
  previouscards = randomNumbers;
  //at 25 clicks, create table
  if (clicks % 25 === 0) {
    if (clicks === 25) {
      createTableHeader(tableHeader);
    } else {
      for (var i = 0; i < images.length; i++) {
        positionTable.deleteRow(1);
      }
    }
    createTableBody(images);
    createTableTbRow(images);
    generateLabels(images);
    generateDataSet(images);
    generateChart();
    saveObjectsToLocalStorage(images);
  } else {
    generateNewImageSet(images);
    displayCurrentCards(currentcards);
  }
}

//create table header function
function createTableHeader(array) {
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

//prototype for each Image object to create it's own table row

function createTableTbRow(array) {
  for (var i = 0; i < images.length; i++) {
    var newTbRow = document.createElement('tr');
    newTBody.appendChild(newTbRow);
    //write table data to page
    for (var j = 0; j < tableHeader.length; j++) {
      var newTbTd = document.createElement('td');
      if (j === 0){
        newTbTd.id = 'firstItem';
        newTbRow.appendChild(newTbTd);
        newTbTd.textContent = array[i].imageName;
      }
      else if (j === 1){
        newTbRow.appendChild(newTbTd);
        newTbTd.textContent = array[i].timesClicked;
      }
      else if (j === 2){
        newTbRow.appendChild(newTbTd);
        newTbTd.textContent = array[i].timesShown;
      }
      else {
        newTbRow.appendChild(newTbTd);
        var percentage = (array[i].timesClicked / array[i].timesShown * 100).toFixed(2);
        if (array[i].timesShown === 0){
          newTbTd.textContent = 0;
        }
        else {
          newTbTd.textContent = percentage + '%';
        }
      }
    };
  }
};

//createTableBody functi0n
function createTableBody(array) {
  console.log(array);
  positionTable.appendChild(newTBody);
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
  var context = document.getElementById('chart').getContext('2d');

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
            max: 20,
            min: 0,
            stepSize: 1
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false,
            fontFamily: 'Questrial',
            fontColor: 'black'
          }
        }]
      },
      legend: {
        labels: {
          fontFamily: 'Questrial',
          fontColor: 'black'
        },
      },
    }
  });

}

function saveObjectsToLocalStorage(objectarray){
  var imagesString = JSON.stringify(images);
  localStorage.images = imagesString;
};

//call the functions to get things started
if (localStorage.images) {
  document.getElementById('reset').style.display = 'initial';
  images = JSON.parse(localStorage.images);
  createTableHeader(tableHeader);
  createTableBody(images);
  console.log('images', images);
  createTableTbRow(images);
  generateLabels(images);
  generateDataSet(images);
  generateChart();

} else {
  generateNewImageSet(images);
  displayCurrentCards(currentcards);
};

function clear(event){
  event.preventDefault();
  localStorage.clear();
  window.location.reload(true);
}
document.getElementById('resetButton').onclick = clear;
// generateNewImageSet(images);
// displayCurrentCards(images);
