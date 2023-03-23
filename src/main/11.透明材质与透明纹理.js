import * as THREE from 'three'
// 导入动画库
import  gsap  from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'

// 目标：打造酷炫的三角形

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

// 导入纹理
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./texture/11d7e63e_E735249_37b7eda8.jpg')

const doorAplhsTexture = textureLoader.load('./texture/10036648_162938775000_2.jpg')

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1,1,1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: '#ffff00',
    map: doorColorTexture,
    alphaMap: doorAplhsTexture,
    transparent: true
})
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)

scene.add(cube)

// 添加平面
const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1),
    basicMaterial
)
plane.position.set(3,0,0)
scene.add(plane)


// 创建集合体对象




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
// 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里调用.update（）
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()


// 监听双击事件
window.addEventListener('dblclick', () => {
        const fullScreenElement = document.fullscreenElement
        if(fullScreenElement) {
            // 双击控制屏幕进入全屏，退出全屏
            document.exitFullscreen()
        } else {
            renderer.domElement.requestFullscreen()
        }
    
})

function render() {
    
    // let t = time / 1000
    // cube.position.x = t * 1
    // if(cube.position.x > 5) {
    //     cube.position.x = 0
    // }
    
    // let deltaTime = clock.getDelta()
    
    // 获取时钟运行的总时长
    // let time = clock.getElapsedTime()

    controls.update()
    renderer.render(scene,camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()

// 监听画面变化，更新渲染画面
window.addEventListener('resize',() => {
    console.log('画面变化了')
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})