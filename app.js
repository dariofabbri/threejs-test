var container = document.createElement('div');
document.body.appendChild(container);

var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.set(0, 200, 600);

var scene = new THREE.Scene();
//scene.fog = new THREE.FogExp2(0x000000, 0.035);

var dynamicTexture  = new THREEx.DynamicTexture(512, 512);
dynamicTexture.context.font	= 'bolder 90px Verdana';
dynamicTexture.drawText('Hello', 32, 256, 'red');

var loader = new THREE.JSONLoader();
loader.load( 'smooth-cube.json', function (geometry, materials) {

  var material = materials ?
    new THREE.MeshFaceMaterial( materials ) :
    new THREE.MeshPhongMaterial({
      specular: '#a9fcff',
      color: '#00abb1',
      emissive: '#006063',
      shininess: 100,
      map: dynamicTexture.texture
    });
  var object = new THREE.Mesh(geometry, material);
  object.scale.set(100, 100, 100);
  object.position.set(0, 0, 0);
  object.name = 'smooth-cube';
  scene.add( object );
});

scene.add(
  new THREE.Mesh(
    new THREE.CubeGeometry(100, 100, 100),
    new THREE.MeshPhongMaterial({
      specular: '#a9fcff',
      color: '#00abb1',
      emissive: '#006063',
      shininess: 100,
      map: dynamicTexture.texture
    })
  )
);

// Grid
//
var gridHelper = new THREE.GridHelper(1000, 20);
gridHelper.setColors(0x0000ff, 0x0000ff);
scene.add(gridHelper);

// Lights
//
//  scene.add( new THREE.AmbientLight( 0xcccccc ) );

var pointLight = new THREE.PointLight( 0xffffff, 0.2, 0 );
pointLight.position.set( 0, 0, 500 );
scene.add( pointLight );

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
directionalLight.position.set( 500, 500, 500 );
scene.add(directionalLight);

// Renderer
//
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

function render() {
	requestAnimationFrame(render);


  var object = scene.getObjectByName('smooth-cube');
  if(object) {
    object.rotation.z += 0.01;
    camera.position.z += 1;
  }

	renderer.render(scene, camera);
}
render();
