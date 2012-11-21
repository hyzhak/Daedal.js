/**
 * Project: Deadaljs Example
 * Copyright (c) 2012, Eugene Krevenets
 */

//describe tools
requirejs.config({
    baseUrl: './src',
    paths: {
        libs : './libs',
        daedal : '../../src/daedal',
        app : './app'
    },
    shim: {
        'libs/three' : {
            exports: 'THREE'
        },
        'libs/TrackballControls' : {
            deps : ['libs/three'],
            exports : 'TrackballControls'
        }
    }
});

// Start application
requirejs([
    //deps
    'app/app'
],function(app){
    app.build();
});
