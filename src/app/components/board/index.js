import Directive from './directive';

Directive.$inject = [];

export default angular.module('board', [])
    .directive('board', Directive).name;
