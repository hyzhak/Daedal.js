/**
 * Project: Deadaljs Example
 * Copyright (c) 2012, Eugene Krevenets
 */
define([
    'daedal',
    'libs/three'
],function (daedal, THREE) {

    var camera, scene, renderer;
    var geometry, material, mesh;
    var placeholder;

    init();
    animate();

    function init() {
        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.CanvasRenderer();

        placeholder = document.getElementById('maze1');

        camera = new THREE.PerspectiveCamera( 75, getAspect(), 1, 10000 );
        camera.position.z = 1000;

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
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );

    }

    return {
        build : function(){
            console.log('build maze', daedal.buildMaze());
        }
    };
});