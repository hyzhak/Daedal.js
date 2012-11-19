define([
    'src/daedal'
],
function (daedal) {
    describe('hello Maze!', function(){
        it('Hello on greet', function(){
            expect(daedal.buildMaze()).toBe("hello maze!");
        });
    });
});