const container = document.getElementById("canvas-container")

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

camera.position.z = 10

const renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(window.innerWidth,window.innerHeight)

container.appendChild(renderer.domElement)



/* LIGHTS */

const light1 = new THREE.PointLight(0x00f5ff,2)
light1.position.set(5,5,5)

const light2 = new THREE.PointLight(0x7b61ff,2)
light2.position.set(-5,-5,5)

scene.add(light1)
scene.add(light2)



/* LIQUID DISTORTION BACKGROUND */

const planeGeo = new THREE.PlaneGeometry(50,50,128,128)

const planeMat = new THREE.MeshBasicMaterial({
color:0x090909,
wireframe:true
})

const liquidPlane = new THREE.Mesh(planeGeo,planeMat)

liquidPlane.position.z = -20

scene.add(liquidPlane)



/* PARTICLE WORD */

let wordParticles

const fontLoader = new THREE.FontLoader()

fontLoader.load(
"https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",

(font)=>{

const textGeo = new THREE.TextGeometry(
"KtotheK",
{
font:font,
size:2,
height:0,
curveSegments:10
})

textGeo.center()

const points = new THREE.BufferGeometry().setFromPoints(
textGeo.attributes.position.array
)

const particleMat = new THREE.PointsMaterial({
size:0.05,
color:0xffffff
})

wordParticles = new THREE.Points(points,particleMat)

scene.add(wordParticles)

}

)



/* AMBIENT PARTICLES */

const particleCount = 8000

const particleGeo = new THREE.BufferGeometry()

const positions=[]

for(let i=0;i<particleCount;i++){

positions.push(
(Math.random()-0.5)*80,
(Math.random()-0.5)*80,
(Math.random()-0.5)*80
)

}

particleGeo.setAttribute(
"position",
new THREE.Float32BufferAttribute(positions,3)
)

const particleMat = new THREE.PointsMaterial({
size:0.03,
color:0xffffff
})

const particles = new THREE.Points(particleGeo,particleMat)

scene.add(particles)



/* FLOATING GLASS SHAPES */

const shapes=[]

for(let i=0;i<15;i++){

const geo=new THREE.IcosahedronGeometry(Math.random()*0.6)

const mat=new THREE.MeshPhysicalMaterial({
color:0xffffff,
transparent:true,
opacity:.2
})

const mesh=new THREE.Mesh(geo,mat)

mesh.position.set(
(Math.random()-0.5)*20,
(Math.random()-0.5)*20,
(Math.random()-0.5)*20
)

scene.add(mesh)

shapes.push(mesh)

}



/* MOUSE */

let mouseX=0
let mouseY=0

document.addEventListener("mousemove",(e)=>{

mouseX=(e.clientX/window.innerWidth)*2-1
mouseY=-(e.clientY/window.innerHeight)*2+1

})



/* SCROLL CAMERA */

window.addEventListener("scroll",()=>{

const scrollY = window.scrollY

camera.position.z = 10 + scrollY * 0.01

})



/* RESIZE */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight

camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})



/* ANIMATION */

function animate(){

requestAnimationFrame(animate)



/* liquid distortion */

const pos = liquidPlane.geometry.attributes.position

for(let i=0;i<pos.count;i++){

let y = pos.getY(i)

let x = pos.getX(i)

pos.setZ(
i,
Math.sin(Date.now()*0.001 + x*0.5 + y*0.5)*0.3
)

}

pos.needsUpdate = true



/* rotate shapes */

shapes.forEach(s=>{

s.rotation.x+=0.002
s.rotation.y+=0.002

})



/* particle field */

particles.rotation.y += 0.0005



/* camera parallax */

camera.position.x += (mouseX*2 - camera.position.x)*0.02

camera.position.y += (mouseY*2 - camera.position.y)*0.02



camera.lookAt(scene.position)



renderer.render(scene,camera)

}

animate()