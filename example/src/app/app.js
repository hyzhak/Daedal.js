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
            var grid = daedal.buildMaze(20).getGrid();

            var ycenter = grid.length;
            for(var y = 0, maxy = grid.length; y < maxy; y++){
                var line = grid[y];
                var xcenter = line.length;
                for(var x = 0, maxx = line.length; x < maxx; x++){
                    direction = line[x];
                    if(!(direction & daedal.util.N)){
                        mazeBuilder.buildWall( 2*x - xcenter,  2*y - ycenter,  0,  -1);
                    }
                    if(!(direction & daedal.util.S)){
                        mazeBuilder.buildWall( 2*x - xcenter,  2*y - ycenter,  0,  1);
                    }
                    if(!(direction & daedal.util.E)){
                        mazeBuilder.buildWall( 2*x - xcenter,  2*y - ycenter,  1,  0);
                    }
                    if(!(direction & daedal.util.W)){
                        mazeBuilder.buildWall( 2*x - xcenter,  2*y - ycenter, -1,  0);
                    }
                }
            }

            /*
            for(var y = -10, maxy = 10; y < maxy; y++){
                for(var x = -10, maxx = 10; x < maxx; x++){
                    if(Math.random() > .5){
                        mazeBuilder.buildWall( 2*x,  2*y,  0,  1);
                    }else{
                        mazeBuilder.buildWall( 2*x,  2*y,  1,  0);
                    }
                }
            }
            */
        }
    };
});