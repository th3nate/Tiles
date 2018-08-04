import StateService from './state.service';

StateService.$inject = [];

export default angular.module('state', [])
                      .service('StateService', StateService).name;
