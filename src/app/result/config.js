let config = {
  url         : "/result",
  template    : require('./view.html'),
  controller  : 'resultController',
  controllerAs: 'vm'
};


export default function route($stateProvider) {
  $stateProvider
    .state('result', config);
  
}

route.$inject = ['$stateProvider'];
