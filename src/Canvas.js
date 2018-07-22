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
    return {
      x: this.material.uniforms.size.value.x,
      y: this.material.uniforms.size.value.y
    }
  }
  set size(size) {
    this.material.uniforms.size.value.x = size.x
    this.material.uniforms.size.value.y = size.y
    this.renderer.setSize(size.x, size.y)
  }

  get unit() {
    return this.material.uniforms.unit.value
  }
  set unit(unit) {
    this.material.uniforms.unit.value = unit
  }

  get center() {
    return {
      x: this.material.uniforms.center.value.x,
      y: this.material.uniforms.center.value.y
    }
  }
  set center(center) {
    this.material.uniforms.center.value.x = center.x
    this.material.uniforms.center.value.y = center.y
  }

  get origin() {
    return {
      x: this.center.x - this.size.x / 2 * this.unit,
      y: this.center.y + this.size.y / 2 * this.unit
    }
  }
  set origin(origin) {
    this.center = {
      x: origin.x + this.size.x / 2 * this.unit,
      y: origin.y + this.size.y / 2 * this.unit
    }
  }

  get domElement() {
    return this.renderer.domElement
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}

export default Canvas
