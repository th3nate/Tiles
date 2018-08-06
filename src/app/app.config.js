let config = {
  url         : "/",
  template    : require('./app.view.html'),
  controller  : 'appController',
  controllerAs: 'vm'
};

export default function route($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");
  $locationProvider
    .html5Mode(true);
  
  $stateProvider
    .state('home', config);
  
}
route.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
