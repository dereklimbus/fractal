import fragmentShader from './fragment.glsl'
import * as THREE from 'three'

class Canvas {
  geometry = new THREE.Geometry()
  material = new THREE.ShaderMaterial({
    fragmentShader: fragmentShader,
    uniforms: {
      size: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
      center: new THREE.Uniform(
        new THREE.Vector2((-2.5 + 1) / 2, (1 + -1) / 2)
      ),
      unit: new THREE.Uniform(
        window.innerWidth / window.innerHeight > (1 - -2.5) / (1 - -1) ?
        (1 - -1) / window.innerHeight :
        (1 - -2.5) / window.innerWidth
      )
    },
  })
  mesh = new THREE.Mesh(this.geometry, this.material)
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementsByTagName('canvas')[0]
  })

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
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.render()
  }

  get size() {
    return this.material.uniforms.size.value
  }
  set size(size) {
    this.material.uniforms.size.value = size
    this.renderer.setSize(size.x, size.y)
  }

  get unit() {
    return this.materials.uniforms.unit.value
  }
  set unit(unit) {
    this.materials.uniforms.unit.value = unit
  }

  get center() {
    return this.materials.uniforms.center.value
  }
  set center(center) {
    this.materials.uniforms.center.value = center
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}

export default Canvas
