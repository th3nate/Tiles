let data = {};
export default class State {
  
  constructor() {
  }
  
  get data() {
    return JSON.parse(JSON.stringify(data));
  }
  
  get prop() {
    return data['prop'];
  }
  
  set prop(val) {
    data['prop'] = val;
  }
  
}
