let config = {
  template    : require('./view.html'),
  controller  : 'resultController',
  controllerAs: 'vm'
};

export default function route($routeProvider) {
  $routeProvider
    .when('/result', config);
}
