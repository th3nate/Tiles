// framework imports
import angular from 'angular';
import ngRoute from 'angular-route';

// main app imports
import AppController from './app.controller';
import Config from './app.config';
// main app styles imports
import '../style/app.css';

// componenets imports
import Result from './result';

// add components
let components = [];
components.push(ngRoute, Result);

export default angular
  .module('app', components)
  .config(Config)
  .controller('appController', AppController).name;
