/**
 * Project: Deadaljs Example
 * Copyright (c) 2012, Eugene Krevenets
 */
define([
    'daedal',
    'app/mazeBuilder'
],function (daedal, mazeBuilder) {
    return {
        build : function(){
            for(var y = -10, maxy = 10; y < maxy; y++){
                for(var x = -10, maxx = 10; x < maxx; x++){
                    if(Math.random() > .5){
                        mazeBuilder.buildWall( 2*x,  2*y,  0,  1);
                    }else{
                        mazeBuilder.buildWall( 2*x,  2*y,  1,  0);
                    }
                }
            }
        }
    };
});