let config = {
  template    : require('./app.view.html'),
  controller  : 'appController',
  controllerAs: 'vm'
};

export default function route($routeProvider, $locationProvider) {
  $locationProvider
    .html5Mode(true);
  $routeProvider
    .when('/', config)
    .otherwise({
      redirectTo: '/'
    });
}
