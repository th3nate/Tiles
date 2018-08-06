import {forEach} from 'lodash';
import moment from 'moment';

export default class AppController {
  
  constructor($scope, $state, StateService) {
    let self          = this;
    self.$scope       = $scope;
    self.$state       = $state;
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
    self.debugging = false;
    
    self.generateBoard();
    self.setBoardSize();
    self.generateTiles();
    
    self.stateService.defaults();
    
    window.onresize = function (event) { // resize the board if needed
      self.setBoardSize();
    };
    self.$scope.$on('$destroy', function () {
      self.cleanup();
    });
    
  }
  
  generateBoard() {
    let self = this;
    let div  = document.createElement('div');// create a new div element
    div.setAttribute('id', 'board');
    div.className = 'float-left tiles clearfix';
    self.wrapper  = document.getElementById('board-wrapper');
    self.board    = div;
    self.wrapper.appendChild(self.board);
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
   * Set the board size according to the windows height / 3
   * return: void
   */
  setBoardSize() {
    let self                = this;
    //self.board.style.height = (window.innerHeight / 3).toString() + 'px'; // make the board a third of the window's height
    self.board.style.height = (window.innerHeight - 200).toString() + 'px'; // make the board a third of the window's height
    self.board.style.width  = self.board.style.height; // make the board a square
  }
  
  /**
   * Tile onclick event
   * @param event
   * return: void
   */
  tileClick(event) {
    let self        = this;
    let tile        = event.srcElement;
    let location    = tile.dataset.location;
    let tileIndex   = self.stateService.blockedList.indexOf(location);
    let flag        = null;
    let statusLabel = null;
    
    if (self.stateService.statusRunning || (self.stateService.statusStart === location || self.stateService.statusEnd === location)) { // if running disallow interaction with the board or if the tile already marked as start or end
      return false;
    }
    
    if (self.stateService.startButtonFlag) {
      flag = 'Start';
    } else if (self.stateService.endButtonFlag) {
      flag = 'End';
    }
    if (self.stateService.statusStart) {
      statusLabel = 'statusStart';
    } else if (self.stateService.statusEnd) {
      statusLabel = 'statusEnd';
    }
    
    if (flag) { // if button flag is true then we need to mark the tile as start or end
      let buttonFlag = `${flag.toLowerCase()}ButtonFlag`;
      let status     = `status${flag}`;
      let button     = document.getElementById(flag.toLowerCase() + '-button');
      let label      = document.createElement('label');
      
      if (statusLabel) { // if label exists elsewhere we remove it first
        let previousLabel = `div[data-location="${self.stateService[status]}"] label`;
        try { // safe remove element
          document.querySelector(previousLabel).remove();
        } catch (e) {
        }
      }
      
      label.innerHTML = flag; // text inside the label
      tile.appendChild(label); // add the label node to the tile
      
      self.stateService[status]             = location; // set the currently selected tile
      self.stateService.currentSelectedTile = null; // set the currently selected tile
      self.stateService[buttonFlag]         = !self.stateService[buttonFlag]; // update true or false
      self.unsetClass(button, 'active'); // remove the active class from the button
      
      if (tileIndex !== -1) { // if the tile is in the blocked array we remove it from there
        self.stateService.blockedList.splice(tileIndex, 1);
      }
      if (tile.className.indexOf(' selected') !== -1) { // if the tile has a selected class we remove it from there
        self.unsetClass(tile, 'selected'); // remove selected class
      }
      
    } else { // if button flag is false then it's a normal block unblock interaction
      
      if (tileIndex !== -1) { // if tile is already selected and buttons flags are false
        self.unsetClass(tile, 'selected'); // remove selected class
        self.stateService.currentSelectedTile = null; // set the currently selected tile
        self.stateService.blockedList.splice(tileIndex, 1); // remove the tile from the blocked array
      } else { // if tile is not selected
        self.setClass(tile, 'selected'); // add selected class
        self.stateService.currentSelectedTile = location; // set the currently selected tile
        self.stateService.blockedList.push(location); // add the currently selected tile to the block list
      }
    }
    
    self.$scope.$apply(); // trigger digest cycle
  }
  
  /**
   * Side bar buttons interaction
   * @param event
   * @param type
   * return: void
   */
  buttonClick(event, type) {
    let self = this;
    if (self.stateService.statusRunning) { // if running disallow interaction with the board
      return false;
    } else if (type === 'go' && self.stateService.statusStart && self.stateService.statusEnd) { // if it's the go button and there are start and end tiles on the board
      self.stateService.statusRunning       = true;
      self.stateService.currentSelectedTile = self.stateService.statusStart; // set the currently selected tile to the start tile
      self.stateService.statusPath.push(self.stateService.currentSelectedTile); // mark x,y as part of solution path
      self.setPathClass(self.stateService.currentSelectedTile);
      self.setClass(document.getElementById('go-button'), 'active');
      self.stateService.startTime = moment().format('HH:mm:ss.SSS');
      self.loopDir();// run calculation
    } else { // if start or end buttons
      let otherType       = type === 'start' ? 'end' : 'start';
      let buttonFlag      = `${type}ButtonFlag`;
      let otherButtonFlag = `${otherType}ButtonFlag`;
      let otherButton     = document.getElementById(otherType + '-button');
      let button          = event.srcElement;
      
      if (self.stateService[buttonFlag] === true) { // if already clicked
        self.unsetClass(button, 'active');
      } else { // if not clicked
        self.setClass(button, 'active');
        self.unsetClass(otherButton, 'active');
        self.stateService[otherButtonFlag] = false; // reset the other button
      }
      
      self.stateService.currentSelectedTile = null; // set the currently selected tile
      self.stateService[buttonFlag]         = !self.stateService[buttonFlag];
    }
    
  }
  
  timediff(start, end) {
    return moment.utc(moment(end, 'HH:mm:ss.SSS').diff(moment(start, 'HH:mm:ss.SSS'))).format('HH:mm:ss.SSS');
    
  }
  
  /**
   * Set class to element
   * @param el
   * @param classname
   */
  setClass(el, classname) {
    el.className += ' ' + classname;
  }
  
  /**
   * Unset class from element
   * @param el
   * @param classname
   */
  unsetClass(el, classname) {
    el.className = el.className.replace(' ' + classname, '');
  }
  
  /* jshint ignore:start */
  async calculatePath() {
    let self       = this;
    self.done      = false;
    self.resetloop = false;
    if (self.transformLocation(self.stateService.currentSelectedTile) < 0) { // if (x,y outside maze) return false
      self.stateService.currentSelectedTile = self.stateService.previousSelectedTile;
      return false;
    }
    if (self.stateService.currentSelectedTile === self.stateService.statusEnd) { // if (x,y is goal) return true
      self.markSuccess();
      return true;
    }
    if (
      (self.stateService.blockedList.indexOf(self.stateService.currentSelectedTile) !== -1 ||
       self.stateService.statusPath.indexOf(self.stateService.currentSelectedTile) !== -1)) { // if (x,y not open) return false
      self.stateService.currentSelectedTile = self.stateService.previousSelectedTile;
      return false;
    }
    self.stateService.statusPath.push(self.stateService.currentSelectedTile); // mark x,y as part of solution path
    self.setPathClass(self.stateService.currentSelectedTile);
    self.resetloop = true;
    
    return false;
  }
  
  async loopDir() {
    let self = this;
    if (self.stateService.statusRunning) { // break loop if reached the end
      for (let i = 0; i < self.stateService.directions.length; i++) {
        if (self.resetloop) {
          self.resetloop = false;
          self.loopDir();
          return false;
        }
        await self.checkPath(i);
        console.log(i);
      }
      self.loopDir();
    }
  }
  
  async checkPath(idx) {
    let self = this;
    //for (let i = 0; i < self.stateService.directions.length; i++) {
    //  (async function loop(idx) {
    await new Promise(function (resolve, reject) {
      setTimeout(() => {
        if (self.stateService.statusRunning === false || self.reset === true) { // break loop if reached the end
          return false;
        }
        self.stateService.previousSelectedTile = self.stateService.currentSelectedTile;
        self.stateService.currentSelectedTile  = self.navigate(self.stateService.currentSelectedTile, self.stateService.directions[idx]);
        //setTimeout(async () => {
        self.$scope.$apply(); // trigger digest cycle
        
        self.calculatePath();
        
        if (idx === self.stateService.directions.length &&
            self.stateService.statusRunning &&
            self.stateService.directions[idx] === 'left'
            && self.resetloop === false) {
          self.done = true;
        }
        
        if (self.done) { // run this part after all directions were done
          let tileIndex = self.stateService.statusPath.indexOf(self.stateService.currentSelectedTile);
          self.stateService.statusPath.splice(tileIndex, 1); // remove the tile from the path array
          self.stateService.blockedList.push(self.stateService.currentSelectedTile); // add the tile to the blocked array
          self.stateService.currentSelectedTile = self.stateService.previousSelectedTile;
        }
        
        //}, i * 1000);
        resolve();
      }, idx * .100);
    });
    
    //})(i);
    //}
    
  }
  
  /* jshint ignore:end */
  
  markSuccess() {
    let self = this;
    self.stateService.statusPath.push(self.stateService.currentSelectedTile); // mark x,y as part of solution path
    self.setPathClass(self.stateService.currentSelectedTile);
    self.stateService.statusRunning = false;
    self.stateService.endTime       = moment().format('HH:mm:ss.SSS');
    self.stateService.totalTime     = self.timediff(self.stateService.startTime, self.stateService.endTime);
    setTimeout(() => {
      self.$scope.$apply(); // trigger digest cycle
      self.goToResults();
    }, 0);
  }
  
  setPathClass(el) {
    document.querySelector(`div[data-location="${el}"]`).className += ' path';
  }
  
  transformLocation(location) {
    let loc = location.split(', ');
    if ((loc[0] < 0 || loc[1] < 0) || (loc[0] > 11 || loc[1] > 11)) {
      return -1;
    } else {
      return parseInt(location.replace(', ', ''));
    }
  }
  
  navigate(location, to) {
    let loc = location.split(', ');
    switch (to) {
      case 'up':
        loc[1] = parseInt(loc[1]) - 1; // y - 1
        return `${loc[0]}, ${loc[1]}`;
      case 'right':
        loc[0] = parseInt(loc[0]) + 1; // x + 1
        return `${loc[0]}, ${loc[1]}`;
      case 'down':
        loc[1] = parseInt(loc[1]) + 1; // y + 1
        return `${loc[0]}, ${loc[1]}`;
      case 'left':
        loc[0] = parseInt(loc[0]) - 1; // x - 1
        return `${loc[0]}, ${loc[1]}`;
    }
  }
  
  goToResults() {
    let self = this;
    setTimeout(() => {
      self.$state.go('result');
    }, 1000);
  }
  
  cleanup() {
    let self = this;
    try {
      self.board.remove('board');
    } catch (e) {
    }
    
  }
}
