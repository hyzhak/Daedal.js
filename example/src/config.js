/**
 * Project: Deadaljs Example
 * Copyright (c) 2012, Eugene Krevenets
 */

//describe tools
requirejs.config({
    baseUrl: './src',
    paths: {
        libs : './libs',
        libs : '../../src',
        app : './app'
    }
});

// Start application
requirejs([
    //deps
    'app/app'
],function(app){
    app.build();
});
