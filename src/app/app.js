// framework imports
import angular from 'angular';
import uiRouter from 'angular-ui-router';

// main app imports
import AppController from './app.controller';
import Config from './app.config';

// styles imports

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/app.css';

// componenets imports
import State from './core/state';
//import Board from './components/board';
import Result from './result';

// add components
let components = [];
components.push(uiRouter, State, Result);
AppController.$inject = ['$scope', '$state','StateService'];

export default angular
  .module('app', components)
  .config(Config)
  .controller('appController', AppController).name;
