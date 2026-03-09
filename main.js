import * as THREE from "https://unpkg.com/three@0.155.0/build/three.module.js";
import { FontLoader } from "https://unpkg.com/three@0.155.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://unpkg.com/three@0.155.0/examples/jsm/geometries/TextGeometry.js";

const container = document.getElementById("canvas-container");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);

container.appendChild(renderer.domElement);



/* LIGHTS */

const light1 = new THREE.PointLight(0x00f5ff,2);
light1.position.set(5,5,5);

const light2 = new THREE.PointLight(0x7b61ff,2);
light2.position.set(-5,-5,5);

scene.add(light1,light2);



/* LIQUID BACKGROUND */

const planeGeo = new THREE.PlaneGeometry(60,60,100,100);
const planeMat = new THREE.MeshBasicMaterial({
wireframe:true,
color:0x111111
});

const plane = new THREE.Mesh(planeGeo,planeMat);
plane.position.z = -20;

scene.add(plane);



/* PARTICLE TEXT */

let textParticles;

const loader = new FontLoader();

loader.load(
"https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
(font)=>{

const textGeo = new TextGeometry("KtotheK",{
font:font,
size:2,
height:0
});

textGeo.center();

const vertices = textGeo.attributes.position.array;

const particlesGeo = new THREE.BufferGeometry();

particlesGeo.setAttribute(
"position",
new THREE.Float32BufferAttribute(vertices,3)
);

const mat = new THREE.PointsMaterial({
size:0.05,
color:0xffffff
});

textParticles = new THREE.Points(particlesGeo,mat);

scene.add(textParticles);

}
);



/* AMBIENT PARTICLES */

const count = 6000;

const particleGeo = new THREE.BufferGeometry();

const pos = [];

for(let i=0;i<count;i++){

pos.push(
(Math.random()-0.5)*80,
(Math.random()-0.5)*80,
(Math.random()-0.5)*80
);

}

particleGeo.setAttribute(
"position",
new THREE.Float32BufferAttribute(pos,3)
);

const particleMat = new THREE.PointsMaterial({
size:0.03
});

const particles = new THREE.Points(particleGeo,particleMat);

scene.add(particles);



/* MOUSE */

let mouseX=0;
let mouseY=0;

document.addEventListener("mousemove",(e)=>{

mouseX=(e.clientX/window.innerWidth)*2-1;
mouseY=-(e.clientY/window.innerHeight)*2+1;

});



/* SCROLL CAMERA */

window.addEventListener("scroll",()=>{

camera.position.z = 12 + window.scrollY * 0.01;

});



/* RESIZE */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});



/* ANIMATION */

function animate(){

requestAnimationFrame(animate);



/* liquid wave */

const verts = plane.geometry.attributes.position;

for(let i=0;i<verts.count;i++){

const x = verts.getX(i);
const y = verts.getY(i);

verts.setZ(
i,
Math.sin(Date.now()*0.001 + x*0.5 + y*0.5)*0.4
);

}

verts.needsUpdate = true;



particles.rotation.y += 0.0006;



camera.position.x += (mouseX*2 - camera.position.x)*0.03;
camera.position.y += (mouseY*2 - camera.position.y)*0.03;

camera.lookAt(scene.position);



renderer.render(scene,camera);

}

animate();