define([
    'src/daedal'
],
function (daedal) {
    describe('build daedal.Maze', function(){
        it('should build daedal.Maze instance', function(){
            var maze = daedal.buildMaze();
            expect(maze instanceof daedal.Maze).toBe(true);
        });

        it('should build daedal.Maze with passages', function(){
            var maze = daedal.buildMaze();
            expect(maze.getPassages()).toBeDefined();
        });

        it('should build daedal.Maze with walls', function(){
            var maze = daedal.buildMaze();
            expect(maze.getWalls()).toBeDefined();
        });
    })
});