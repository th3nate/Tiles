let data = {
  tiles               : [
    '0, 0', '1, 0', '2, 0', '3, 0', '4, 0', '5, 0', '6, 0', '7, 0', '8, 0', '9, 0', '10, 0', '11, 0',
    
    '0, 1', '1, 1', '2, 1', '3, 1', '4, 1', '5, 1', '6, 1', '7, 1', '8, 1', '9, 1', '10, 1', '11, 1',
    
    '0, 2', '1, 2', '2, 2', '3, 2', '4, 2', '5, 2', '6, 2', '7, 2', '8, 2', '9, 2', '10, 2', '11, 2',
    
    '0, 3', '1, 3', '2, 3', '3, 3', '4, 3', '5, 3', '6, 3', '7, 3', '8, 3', '9, 3', '10, 3', '11, 3',
    
    '0, 4', '1, 4', '2, 4', '3, 4', '4, 4', '5, 4', '6, 4', '7, 4', '8, 4', '9, 4', '10, 4', '11, 4',
    
    '0, 5', '1, 5', '2, 5', '3, 5', '4, 5', '5, 5', '6, 5', '7, 5', '8, 5', '9, 5', '10, 5', '11, 5',
    
    '0, 6', '1, 6', '2, 6', '3, 6', '4, 6', '5, 6', '6, 6', '7, 6', '8, 6', '9, 6', '10, 6', '11, 6',
    
    '0, 7', '1, 7', '2, 7', '3, 7', '4, 7', '5, 7', '6, 7', '7, 7', '8, 7', '9, 7', '10, 7', '11, 7',
    
    '0, 8', '1, 8', '2, 8', '3, 8', '4, 8', '5, 8', '6, 8', '7, 8', '8, 8', '9, 8', '10, 8', '11, 8',
    
    '0, 9', '1, 9', '2, 9', '3, 9', '4, 9', '5, 9', '6, 9', '7, 9', '8, 9', '9, 9', '10, 9', '11, 9',
    
    '0, 10', '1, 10', '2, 10', '3, 10', '4, 10', '5, 10', '6, 10', '7, 10', '8, 10', '9, 10', '10, 10', '11, 10',
    
    '0, 11', '1, 11', '2, 11', '3, 11', '4, 11', '5, 11', '6, 11', '7, 11', '8, 11', '9, 11', '10, 11', '11, 11'
  ],
  directions          : ['up', 'right', 'down', 'left'],
  status              : {
    path     : [],
    start    : null,
    end      : null,
    running  : null,
    startTime: null,
    endTime  : null,
    totalTime: null
  },
  blockedList         : [],
  startButtonFlag     : false,
  endButtonFlag       : false,
  currentSelectedTile : null,
  previousSelectedTile: null
};
export default class State {
  
  constructor() {
  }
  
  get data() {
    return JSON.parse(JSON.stringify(data));
  }
  
  get tiles() {
    return data.tiles;
  }
  
  get directions() {
    return data.directions;
  }
  
  get status() {
    return data.status;
  }
  
  get statusStart() {
    return data.status.start;
  }
  
  set statusStart(val) {
    data.status.start = val;
  }
  
  get statusEnd() {
    return data.status.end;
  }
  
  set statusEnd(val) {
    data.status.end = val;
  }
  
  get statusPath() {
    return data.status.path;
  }
  
  set statusPath(val) {
    data.status.path = val;
  }
  
  get startTime() {
    return data.status.startTime;
  }
  
  set startTime(val) {
    data.status.startTime = val;
  }
  
  get endTime() {
    return data.status.endTime;
  }
  
  set endTime(val) {
    data.status.endTime = val;
  }
  
  get totalTime() {
    return data.status.totalTime;
  }
  
  set totalTime(val) {
    data.status.totalTime = val;
  }
  
  get startButtonFlag() {
    return data.status.startButtonFlag;
  }
  
  set startButtonFlag(val) {
    data.status.startButtonFlag = val;
  }
  
  get endButtonFlag() {
    return data.status.endButtonFlag;
  }
  
  set endButtonFlag(val) {
    data.status.endButtonFlag = val;
  }
  
  get currentSelectedTile() {
    return data.status.currentSelectedTile;
  }
  
  set currentSelectedTile(val) {
    data.status.currentSelectedTile = val;
  }
  
  get previousSelectedTile() {
    return data.status.previousSelectedTile;
  }
  
  set previousSelectedTile(val) {
    data.status.previousSelectedTile = val;
  }
  
  get statusRunning() {
    return data.status.running;
  }
  
  set statusRunning(val) {
    data.status.running = val;
  }
  
  get blockedList() {
    return data.blockedList;
  }
  
  set blockedList(val) {
    data.blockedList = val;
  }
  
  defaults() {
    data = {
      tiles               : [
        '0, 0', '1, 0', '2, 0', '3, 0', '4, 0', '5, 0', '6, 0', '7, 0', '8, 0', '9, 0', '10, 0', '11, 0',
    
        '0, 1', '1, 1', '2, 1', '3, 1', '4, 1', '5, 1', '6, 1', '7, 1', '8, 1', '9, 1', '10, 1', '11, 1',
    
        '0, 2', '1, 2', '2, 2', '3, 2', '4, 2', '5, 2', '6, 2', '7, 2', '8, 2', '9, 2', '10, 2', '11, 2',
    
        '0, 3', '1, 3', '2, 3', '3, 3', '4, 3', '5, 3', '6, 3', '7, 3', '8, 3', '9, 3', '10, 3', '11, 3',
    
        '0, 4', '1, 4', '2, 4', '3, 4', '4, 4', '5, 4', '6, 4', '7, 4', '8, 4', '9, 4', '10, 4', '11, 4',
    
        '0, 5', '1, 5', '2, 5', '3, 5', '4, 5', '5, 5', '6, 5', '7, 5', '8, 5', '9, 5', '10, 5', '11, 5',
    
        '0, 6', '1, 6', '2, 6', '3, 6', '4, 6', '5, 6', '6, 6', '7, 6', '8, 6', '9, 6', '10, 6', '11, 6',
    
        '0, 7', '1, 7', '2, 7', '3, 7', '4, 7', '5, 7', '6, 7', '7, 7', '8, 7', '9, 7', '10, 7', '11, 7',
    
        '0, 8', '1, 8', '2, 8', '3, 8', '4, 8', '5, 8', '6, 8', '7, 8', '8, 8', '9, 8', '10, 8', '11, 8',
    
        '0, 9', '1, 9', '2, 9', '3, 9', '4, 9', '5, 9', '6, 9', '7, 9', '8, 9', '9, 9', '10, 9', '11, 9',
    
        '0, 10', '1, 10', '2, 10', '3, 10', '4, 10', '5, 10', '6, 10', '7, 10', '8, 10', '9, 10', '10, 10', '11, 10',
    
        '0, 11', '1, 11', '2, 11', '3, 11', '4, 11', '5, 11', '6, 11', '7, 11', '8, 11', '9, 11', '10, 11', '11, 11'
      ],
      directions          : ['up', 'right', 'down', 'left'],
      status              : {
        path     : [],
        start    : null,
        end      : null,
        running  : null,
        startTime: null,
        endTime  : null,
        totalTime: null
      },
      blockedList         : [],
      startButtonFlag     : false,
      endButtonFlag       : false,
      currentSelectedTile : null,
      previousSelectedTile: null
    };
  }
  
}
