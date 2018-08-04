// framework imports
import angular from 'angular';
import ngRoute from 'angular-route';

// main app imports
import AppController from './app.controller';
import Config from './app.config';

// styles imports

//import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/app.scss';

// componenets imports
import Result from './result';
import State from './core/state';

// add components
let components = [];
components.push(ngRoute, Result, State);
AppController.$inject = ['$scope', 'StateService'];

export default angular
  .module('app', components)
  .config(Config)
  .controller('appController', AppController).name;
