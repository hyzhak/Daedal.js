//describe tools
requirejs.config({
    baseUrl: '../src',
    paths: {
        libs : '../test/libs',
        spec : '../test/spec',
        src : '../src'
    }
});

// Start tests
requirejs([
    //tools
    'libs/jasmine-standalone-1.2.0/jasmine-html',
    'libs/phantomjs/jasmine.console_reporter',

    //specs
    'spec/build2DMazeSpec'
],function(){
    var jasmineEnv = jasmine.getEnv();
    jasmine.VERBOSE = true;
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(new jasmine.ConsoleReporter());
    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();
});
