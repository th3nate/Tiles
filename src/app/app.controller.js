import {forEach} from 'lodash';

export default class AppController {
  
  constructor() {
    let self = this;
    
    self.init();
  }
  
  /**
   * Init controller
   */
  init() {
    let self = this;
    
    self.tiles = [
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0],
      
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1],
      
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2],
      
      [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
      
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],
      
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5],
      
      [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6],
      
      [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7],
      
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
      
      [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
      
      [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10],
      
      [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11], [11, 11]
    ];
    self.title = 'App Controller!';
    self.board = document.getElementById('board');
    self.setBoardSize();
    self.generateTiles();
    
    window.onresize = function (event) { // resize the board if needed
      self.setBoardSize();
    };
    
  }
  
  /**
   * Generate all the tiles in the board
   * return: void
   */
  generateTiles() {
    let self = this;
    forEach(self.tiles, (tile) => {
      self.addElement(tile);
    });
  }
  
  /**
   * Add element inside the board
   * @param tile
   */
  addElement(tile) {
    let self       = this;
    let div        = document.createElement('div');// create a new div element
    let newContent = document.createTextNode(`${tile[0]}, ${tile[1]}`);// and give it some content
    
    div.style.height = ((self.board.clientHeight - 2) / 12).toFixed().toString() + 'px'; // make the tile fit in a twelve tiles row
    div.style.width  = ((self.board.clientWidth - 2) / 12).toFixed().toString() + 'px'; // make the tile fit in a twelve tiles row
    div.className    = 'tile';
    div.setAttribute('data-location', `${tile[0]},${tile[1]}`);
    div.onclick = self.tileClick;
    div.appendChild(newContent);// add the text node to the newly created div
    self.board.appendChild(div);// add the newly created element and its content into the DOM
  }
  
  tileClick(event) {
    let self     = this;
    let location = event.srcElement.dataset.location;
  }
  
  /**
   * Set the board size according to the windows height / 3
   * return: void
   */
  setBoardSize() {
    let self                = this;
    //self.board.style.height = (window.innerHeight / 3).toString() + 'px'; // make the board a third of the window's height
    self.board.style.height = (window.innerHeight - 200).toString() + 'px'; // make the board a third of the window's height
    self.board.style.width  = self.board.style.height; // make the board a square
  }
}
