import fragmentShader from './fragment.glsl'
import * as THREE from 'three'

class Canvas {
  geometry = new THREE.Geometry()
  material = new THREE.ShaderMaterial({
    fragmentShader: fragmentShader,
    uniforms: {
      size: new THREE.Uniform(),
      range: new THREE.Uniform()
    },
  })
  mesh = new THREE.Mesh(this.geometry, this.material)
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  renderer = new THREE.WebGLRenderer()

  get size() {
    return this.renderer.getSize()
  }
  set size({width = window.innerWidth, height = window.innerHeight}) {
    this.material.uniforms.size.value = {width: width, height: height}
    this.renderer.setSize(width, height)
  }

  get range() {
    return this.material.uniforms.range.value
  }
  set range({x = {min: -2.5, max: 1}, y = {min: -1, max: 1}}) {
    const fittedRange = (range, size) => {
      range = JSON.parse(JSON.stringify(range))
      const sizeAspectRatio = size.width / size.height
      const rangeAspectRatio =
        (range.x.max - range.x.min) /
        (range.y.max - range.y.min)
      if (sizeAspectRatio < rangeAspectRatio) {
        const lenY = (range.x.max - range.x.min) / sizeAspectRatio
        range.y.min = -(lenY / 2)
        range.y.max = lenY / 2
      } else {
        const newLenX = (range.y.max - range.y.min) * sizeAspectRatio
        const oldLenX = range.x.max - range.x.min
        range.x.min -= (newLenX - oldLenX) / 2
        range.x.max += (newLenX - oldLenX) / 2
      }
      return range
    }

    this.material.uniforms.range.value = fittedRange({x: x, y: y}, this.size)
  }

  constructor() {
    this.geometry.vertices.push(
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(-1, -1, 0),
      new THREE.Vector3(1, -1, 0),
      new THREE.Vector3(1, 1, 0)
    )
    this.geometry.faces.push(new THREE.Face3(0, 1, 2))
    this.geometry.faces.push(new THREE.Face3(2, 3, 0))
    this.scene.add(this.mesh)
    this.camera.position.set(0, 0, 0)

    this.size = {}
    this.range = {}

    document.body.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera)
  }
}

export default Canvas
