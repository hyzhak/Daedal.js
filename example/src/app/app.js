/**
 * Project: Deadaljs Example
 * Copyright (c) 2012, Eugene Krevenets
 */
define([
    'libs/daedal'
],function (daedal) {
    return {
        build : function(){
            console.log('build maze', daedal.buildMaze());
        }
    };
});