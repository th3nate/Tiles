import ctrl from './controller';
let Directive = () => {
    return {
        restrict: 'E',
        template: require('./view.html'),
        scope: true,
        link: (scope, element) => {
        
        },
        controller: ['', ctrl]
    };
};

export default Directive;

