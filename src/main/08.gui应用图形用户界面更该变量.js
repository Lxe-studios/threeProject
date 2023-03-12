import * as THREE from 'three'
// 导入动画库
import  gsap  from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'

// 目标：全屏和退出全屏

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
cube.position.x = 0

// 缩放
// cube.scale.set(3,2,1)
// cube.scale.x = 5

// 旋转,旋转x轴
cube.rotation.set(Math.PI / 4,0,0)

//将几何体添加到场景当中
scene.add(cube)

const gui = new dat.GUI
// 设置位置
gui.add(cube.position, "x").min(0).max(5).step(0.1).name('移动x轴').onChange((value) => {
    console.log(value)
}).onFinishChange(() => {
    console.log('完全停下来')
})
const param = {
    color: '#ffff00',
    fn: () => {
        // 让立方体运动起来
        gsap.to(cube.position, {x: 5, duration: 2, yoyo: true})
    }
}

// 设置颜色
gui.addColor(param, 'color').onChange((value) => {
    // 修改cube颜色
    cube.material.color.set(value)
})
// 设置选项狂
gui.add(cube,'visible').name('是否显示')
// 设置按钮点击触发某个事件
gui.add(param, 'fn').name('立方体运动')
let folder = gui.addFolder('设置立方体')
folder.add(cube.material,'wireframe')

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
// 设置动画
// let animate1 = gsap.to(cube.position,{
//     x: 5,
//     duration: 5, 
//     ease: 'power1.inOut', 
//     repeat: -1,
//     // 延迟2s执行
//     delay: 2,
//     // 往返运动
//     yoyo: true,
//     onComplete: () => {
//         console.log('====================================');
//         console.log('动画完成');
//         console.log('====================================');
//     },
//     onStart: () => {
//         console.log('动画开始')
//     }
// })
// repeat 设置重复次数， -1无限制重复
// gsap.to(cube.rotation, {
//     x: 2 * Math.PI,
//     duration: 5, 
//     ease: 'power1.inOut',
//     repeat: 2,

// })

// 监听双击事件
window.addEventListener('dblclick', () => {
    // if(animate1.isActive()) {
    //     // 暂停
    //     animate1.pause()
    // } else {
    //     // 恢复
    //     animate1.resume()
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
