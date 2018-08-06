import ResultController from './controller';
import Config from './config';

ResultController.$inject = ['$scope', '$state', 'StateService'];

export default angular.module('result', [])
                      .config(Config)
                      .controller('resultController', ResultController).name;
