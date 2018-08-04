import State from './state.service';

State.$inject = [];

export default angular.module('state', [])
                      .service('state', State).name;
