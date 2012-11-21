/**
 * Project: .
 * Copyright (c) 2012, Eugene-Krevenets
 */
define([
    'libs/three',
    'libs/TrackballControls'
],
function (THREE, TrackballControls) {

    var wallSize = 50;
    var wallWidth = 50;
    var wallHeight = 100;

    var mazeBuilder = {};

    var camera, scene, renderer;
    var geometry, wallMaterial, mesh;
    var placeholder;

    var controls;

    init();
    animate();

    function init() {
        scene = new THREE.Scene();

        //geometry = new THREE.CubeGeometry( 20, 200, 200 );
        //geometry = new THREE.PlaneGeometry(200, 200);
        wallMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } );
        //mesh = new THREE.Mesh( geometry, wallMaterial );
        //scene.add( mesh );

        // create the sphere's material
        wallMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0xFFFFFF
                });

        // create a point light
        var pointLight =
            new THREE.PointLight(0xFFFFFF);

// set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

// add to the scene
        scene.add(pointLight);

        //renderer = new THREE.CanvasRenderer();
        renderer = new THREE.WebGLRenderer();

        placeholder = document.getElementById('maze1');

        camera = new THREE.PerspectiveCamera( 75, getAspect(), 1, 10000 );
        camera.position.z = 1000;

        controls = new THREE.TrackballControls( camera, placeholder );
        controls.rotateSpeed = 0.2;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = false;
        controls.dynamicDampingFactor = 0.05;
        controls.keys = [ 65, 83, 68 ];

        window.addEventListener('resize', resize);
        resize();
    }

    function getAspect(){
        return placeholder.offsetWidth / placeholder.offsetHeight;
    }

    function resize(){
        renderer.setSize( placeholder.offsetWidth, placeholder.offsetHeight );
        placeholder.appendChild( renderer.domElement );
        camera.aspect = getAspect();
        camera.updateProjectionMatrix();
        renderer.setSize( placeholder.offsetWidth, placeholder.offsetHeight );
    }

    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        render();
    }

    function render() {
        renderer.autoClear = false;
        renderer.clear();
        renderer.render( scene, camera );
    }

    //@public
    mazeBuilder.buildWall = function(x, y, dx, dy){
        var length = Math.sqrt(dx * dx + dy * dy) + .5;
        var angle = Math.atan2(dy, dx);
        var geometry = new THREE.CubeGeometry( wallWidth * length, wallSize, wallHeight );
        //geometry = new THREE.PlaneGeometry(200, 200);
        var mesh = new THREE.Mesh( geometry, wallMaterial );
        mesh.position.x = (x + .5 * length * Math.cos(angle)) * wallSize;
        mesh.position.y = (y + .5 * length * Math.sin(angle)) * wallSize;
        mesh.rotation.z = angle;
        scene.add( mesh );
    }

    return mazeBuilder;
});