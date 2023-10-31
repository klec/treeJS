var camera, scene, renderer, geometry, material, mesh;

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.x = 0;
    camera.position.y = 150;
    camera.position.z = 600;

    // scene

var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;

    var ambient = new THREE.AmbientLight( 0x101030 );
//    scene.add( ambient );

    var light  = new THREE.SpotLight( 0xffeedd, 1 );
    light.position.set( -300, 300, 210 );
    light.target.position.set( 10, 40, 20 );
    light.castShadow = true;

    light.shadowCameraNear = 1200;
    light.shadowCameraFar = 2500;
    light.shadowCameraFov = 50;

    //light.shadowCameraVisible = true;

    light.shadowBias = 0.000001;
    light.shadowDarkness = 0.5;

    light.shadowMapWidth = SHADOW_MAP_WIDTH;
    light.shadowMapHeight = SHADOW_MAP_HEIGHT;
    scene.add( light );

//areaLight1 = new THREE.AreaLight( 0xffffff, 1 ); 
//areaLight1.position.set( 100.0001, 200.0001, 318.5001 ); 
//areaLight1.rotation.set( -0.74719, 0.0001, 0.0001 ); 
//areaLight1.width = 100; 
//areaLight1.height = 1; 
//scene.add( areaLight1 );
//var meshEmitter = createAreaEmitter( areaLight1 );

//scene.add( meshEmitter );
//createHUD();
//createScene();
    // texture


//    var tree = new Brunch (50,0,0, 0,0, 0);
//    tree.grove();
    var tera_geometry = new THREE.PlaneGeometry(300, 300);
    var tera_material =  new THREE.MeshLambertMaterial({color:0xaaaaaa});//{map: tera_texture});
    var tera = new THREE.Mesh(tera_geometry, tera_material);
    tera.rotation.x = -Math.PI/2;
    tera.position.y = -80;
    tera.receiveShadow = true;
    tera.castShadow = false;
    scene.add(tera);
    
    var cube_geom = new THREE.CubeGeometry(100,100,100);
    var cube = new THREE.Mesh(cube_geom, new THREE.MeshLambertMaterial({color:0xaabbcc}));
    cube.receiveShadow = true;
    cube.castShadow = true;
    scene.add(cube);


    // renderer

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnable = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.render( scene, camera );

    //

    window.addEventListener( 'resize', onWindowResize, false );


}

function animate() {

    // Include examples/js/RequestAnimationFrame.js for cross-browser compatibility.
    requestAnimationFrame( animate );
    camera.position.x += ( mouseX - camera.position.x ) * .1;
    //camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

        mouseX = ( event.clientX - windowHalfX ) / 2;
        mouseY = ( event.clientY - windowHalfY ) / 2;

}

function Brunch(x,y,z,a,b, deep) {
    this.brunch1 = 0;
    this.brunch2 = 0;
    this.weight = 1;
    this.lenght = Math.random()*30+10-deep*1.5;
    this.a = a/1.5+(Math.random()*0.5-0);
    this.b = b+(Math.random()*4-2);
    this.deep = ++deep;



    this.dx = function(){
        return Math.sin(this.a)*Math.cos(this.b)*this.lenght;
    }
    this.dy = function(){
        return Math.cos(this.a)*this.lenght;
    }

    this.dz = function(){
        return Math.sin(this.a)*Math.sin(this.b)*this.lenght;
    }

    this.grove = function (x,y,z) {

        if (this.brunch1)
            this.brunch1.grove();
        else
            this.brunch1 = new Brunch(x,y,z, this.a, this.b, this.deep);

        if (this.brunch2)
            this.brunch2.grove();
        else
        if (Math.random()>0.5)
            this.brunch2 = false;
        else
            this.brunch2 = new Brunch(x,y,z, this.a,this.b,this.deep);
    }

    this.display = function() {
        var br_geometry = new THREE.Geometry();
        br_geometry.vertices.push(new THREE.Vector3(x, y, z));
        br_geometry.vertices.push(new THREE.Vector3(x + this.dx(), y + this.dy(), z + this.dz()));
        var line_material = new THREE.LineBasicMaterial({color: 0x774400, linewidth: 12 - this.deep, opacity: 1});
        var branch = new THREE.Line(br_geometry, line_material, THREE.LinePieces);
        scene.add(branch);
    }

    this.display();

    if(deep<11)
        this.grove(x+this.dx(), y+this.dy(), z+this.dz());
}
