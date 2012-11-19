//AMD and CommonJS integration
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.daedal = factory();
    }
}(this, function () {

    var daedal = {};

    daedal.buildMaze = function(){
        return 'hello maze!';
    };

    return daedal;
}));