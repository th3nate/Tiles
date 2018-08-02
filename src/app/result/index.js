import ResultController from './controller';
import Config from './config';

ResultController.$inject = [];

export default angular.module('result', [])
                      .config(Config)
                      .controller('resultController', ResultController).name;
