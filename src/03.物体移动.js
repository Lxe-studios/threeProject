import * as THREE from 'three'

// 目标：使用控制器查看3d物体

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { AxesHelper } from 'three/examples/jsm/controls/AxesHelper'

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

// 修改物体的位置
//cube.position.set(5,0,0)
cube.position.x = 3

//将几何体添加到场景当中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight)

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 使用渲染器通过相机将场景渲染进来
// renderer.render(scene,camera)

// 创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

function render() {
    cube.position.x += 0.01
    if(cube.position.x > 5) {
        cube.position.x = 0
    }
    renderer.render(scene,camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()