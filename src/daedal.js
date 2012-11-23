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

    daedal.buildMaze = function(size){
        return new Maze(size);
    };

    var Maze = function(size){
        this.walls = [];
        this.passages = [];

        this.grid = process(size);
    };

    Maze.prototype.getWalls = function(){
        return this.walls;
    }

    Maze.prototype.getPassages = function(){
        return this.passages;
    }

    Maze.prototype.getGrid = function(){
        return this.grid;
    }

    daedal.Maze = Maze;

    //Get from https://github.com/bwinton/mazes/blob/master/mazeutils.js
    // Aldous-Broder algorithm functions.

    var util = {};
    util.N = 1;
    util.S = 2;
    util.E = 4;
    util.W = 8;

    util.DX = {1: 0, 2: 0, 4: 1, 8: -1};
    util.DY = {1: -1, 2: 1, 4: 0, 8: 0};

    util.OPPOSITE = {1: util.S, 2: util.N, 4: util.W, 8: util.E};
    util.NAMES = ["X", "N", "S", "NS", "E", "NE", "SE", "NSE", "W",
        "NW", "SW", "NSW", "EW", "NEW", "SEW", "NSEW"];

    util.HORIZONTAL = 1;
    util.VERTICAL = 2;

    util.shuffle = function(array) {
        array.sort(function() {return 0.5 - Math.random()});
    }

    util.randint = function(startOrEnd, end) {
        var start = 0;
        if (end)
            start = startOrEnd;
        else
            end = startOrEnd;
        return Math.floor(Math.random() * end) + start;
    }

    util.newGrid = function(size, value) {
        var grid = [];
        for (var i = 0; i < size; i++) {
            grid.push(util.newArray(size, value));
        }
        return grid;
    }

    util.newArray = function(size, value) {
        var array = [];
        for (var i = 0; i < size; i++) {
            array[i] = value;
        }
        return array;
    };

    daedal.util = util;

    // https://github.com/bwinton/mazes/blob/master/growingtree.js

    var indexFunctions = {
        "newest": function(limit) { return limit - 1 },
        "oldest": function(limit) { return 0 },
        "random": function(limit) { return util.randint(limit) },
    }

    function process(size, type) {
        if (!(type in indexFunctions)) {
            type = "random";
        }
        var chooseIndex = indexFunctions[type];
        var grid = util.newGrid(size, 0);

        var x = util.randint(size);
        var y = util.randint(size);
        var cells = [];
        cells.push([x, y]);

        while (cells.length) {
            var index = chooseIndex(cells.length);
            x = cells[index][0];
            y = cells[index][1];
            var directions = [util.N, util.S, util.E, util.W];
            util.shuffle(directions);
            for (var i in directions) {
                var direction = directions[i];
                var nx = x + util.DX[direction];
                var ny = y + util.DY[direction];
                if (0 <= ny && ny <= grid.length-1 &&
                    0 <= nx && nx <= grid[ny].length-1 &&
                    grid[ny][nx] == 0) {
                    grid[y][x] |= direction;
                    grid[ny][nx] |= util.OPPOSITE[direction];
                    cells.push([nx, ny]);
                    index = null;
                    break;
                }
            }
            if (index !== null)
                cells.splice(index, 1);
        }

        return grid;
    }

    return daedal;
}));