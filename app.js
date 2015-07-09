var container = document.createElement('div');
document.body.appendChild(container);

var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.set(200, 200, 600);

var scene = new THREE.Scene();
//scene.fog = new THREE.FogExp2(0x000000, 0.035);

var loader = new THREE.JSONLoader();
loader.load( 'smooth-cube.json', function (geometry, materials) {

  var material = materials ?
    new THREE.MeshFaceMaterial( materials ) :
    new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var object = new THREE.Mesh( geometry, material );
  object.scale.set(100, 100, 100);
  scene.add( object );
});

// Lights
//
scene.add( new THREE.AmbientLight( 0xcccccc ) );
pointLight = new THREE.PointLight( 0xff4400, 5, 30 );
pointLight.position.set( 5, 0, 0 );
scene.add( pointLight );

// Renderer
//
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
render();
