import * as THREE from 'three'

// 1.创建场景
const scene = new THREE.Scene()

// 2.创建相机 透视相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

// 3.S设置相机位置
// x,y,z轴坐标
camera.position.set(0,0,10)

//相机添加到场景
scene.add(camera)

// 添加物体
// 创建集合体对象
const cubeGepmetry = new THREE.BoxBufferGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00})

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGepmetry, cubeMaterial)
//将几何体添加到场景当中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight)

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 使用渲染器通过相机将场景渲染进来
renderer.render(scene,camera)