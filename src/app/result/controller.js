export default class ResultController {
  
  constructor($scope, $state, StateService) {
    let self          = this;
    self.$scope       = $scope;
    self.$state       = $state;
    self.stateService = StateService;
    //self.init();
  }
  
  goBack() {
    let self = this;
    self.$state.go('home');
  }
  
}
