import {forEach} from 'lodash';

export default class AppController {
  
  constructor($scope, StateService) {
    let self          = this;
    self.$scope       = $scope;
    self.stateService = StateService;
    self.init();
  }
  
  /**
   * Init controller
   */
  init() {
    let self       = this;
    self.title     = 'App Controller!';
    self.tiles     = self.stateService.tiles;
    self.board     = document.getElementById('board');
    self.debugging = true;
    
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
    let newContent = document.createTextNode(tile);// and give it some content
    
    div.style.height = ((self.board.clientHeight - 2) / 12).toFixed().toString() + 'px'; // make the tile fit in a twelve tiles row
    div.style.width  = ((self.board.clientWidth - 2) / 12).toFixed().toString() + 'px'; // make the tile fit in a twelve tiles row
    div.className    = 'tile'; // add .tile class for further css styling
    div.onclick      = self.tileClick.bind(self); // add callback function to the click event and bind the current 'this' to it. otherwise the 'this' will be the event.
    
    div.setAttribute('data-location', tile);
    div.appendChild(newContent);// add the text node to the newly created div
    self.board.appendChild(div);// add the newly created element and its content into the DOM
  }
  
  /**
   * Tile onclick event
   * @param event
   */
  tileClick(event) {
    let self = this;
    
    self.tile      = event.srcElement;
    self.location  = self.tile.dataset.location;
    self.tileIndex = self.stateService.blockedList.indexOf(self.location);
    
    if (self.tileIndex !== -1) { // if tile is already selected
      self.tile.className                   = self.tile.className.replace(' selected', '');
      self.stateService.currentSelectedTile = null; // set the currently selected tile
      self.stateService.blockedList.splice(self.tileIndex, 1);
    } else { // if tile is not selected
      self.tile.className += ' selected';
      self.stateService.currentSelectedTile = self.location; // set the currently selected tile
      self.stateService.blockedList.push(self.location); // add the currently selected tile to the block list
    }
    
    self.$scope.$apply(); // trigger digest cycle
  }
  
  buttonClick(event, type) {
    let self            = this;
    let otherType       = type === 'start' ? 'end' : 'start';
    let buttonFlag      = `${type}ButtonFlag`;
    let otherButtonFlag = `${otherType}ButtonFlag`;
    let otherButton     = document.getElementById(otherType + '-button');
    let button          = event.srcElement;
    
    if (self.stateService[buttonFlag] === true) { // if already clicked
      button.className = button.className.replace(' active', '');
    } else { // if not clicked
      button.className += ' active';
      self.stateService[otherButtonFlag] = false; // reset the other button
      otherButton.className              = otherButton.className.replace(' active', '');
    }
    
    self.stateService.currentSelectedTile = null; // set the currently selected tile
    self.stateService[buttonFlag]         = !self.stateService[buttonFlag];
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
