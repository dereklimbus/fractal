import Canvas from './Canvas'
import Hammer from 'hammerjs'

class Controller {
  canvas = new Canvas()

  constructor() {
    const hammer = new Hammer(this.canvas.domElement)

    window.addEventListener('resize', this.handleResize.bind(this))

    this.canvas.domElement.addEventListener(
      'wheel',
      this.handleWheel.bind(this)
    )
    hammer.on('doubletap', this.handleDoubleTap.bind(this))
    hammer.get('pinch').set({enable: true})
    hammer.on('pinch', this.handlePinch.bind(this))

    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    hammer.get('pan').set({direction: Hammer.DIRECTION_ALL})
    hammer.on('panmove', this.handlePanMove.bind(this))
  }

  handleResize() {
    this.canvas.size = {x: window.innerWidth, y: window.innerHeight}
  }

  handleWheel(e) {
    const target = {
      x: this.canvas.origin.x + e.x * this.canvas.unit,
      y: this.canvas.origin.y - e.y * this.canvas.unit
    }
    let scale = 1 + Math.abs(e.deltaY) / this.canvas.size.y
    if (e.deltaY < 0) {
      scale = 1 / scale
    }
    this.zoom(target, scale)
  }

  handleDoubleTap(e) {
    const target = {
      x: this.canvas.origin.x + e.center.x * this.canvas.unit,
      y: this.canvas.origin.y - e.center.y * this.canvas.unit
    }
    const scale = 0.5
    this.zoom(target, scale)
  }

  handlePinch(e) {
    const target = {
      x: this.canvas.origin.x + e.center.x * this.canvas.unit,
      y: this.canvas.origin.y - e.center.y * this.canvas.unit
    }
    let scale =
      1 +
      Math.sqrt(e.deltaX * e.deltaX + e.deltaY * e.deltaY) /
      Math.sqrt(
        Math.pow(this.canvas.size.x, 2) + Math.pow(this.canvas.size.y, 2)
      )
    if (e.scale > 1) {
      scale = 1 / scale
    }
    this.zoom(target, scale)
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.move({x: 0, y: this.canvas.size.y / 8})
        break
      case 'ArrowRight':
        this.move({x: -(this.canvas.size.x / 8), y: 0})
        break
      case 'ArrowDown':
        this.move({x: 0, y: -(this.canvas.size.y / 8)})
        break
      case 'ArrowLeft':
        this.move({x: this.canvas.size.x / 8, y: 0})
        break
      default:
        break
    }
  }

  handlePanMove(e) {
    this.move({x: e.deltaX / 8, y: e.deltaY / 8})
  }

  zoom(target, scale) {
    this.canvas.center = {
      x: target.x - (target.x - this.canvas.center.x) * scale,
      y: target.y - (target.y - this.canvas.center.y) * scale
    }
    this.canvas.unit *= scale
  }

  move(delta) {
    this.canvas.center = {
      x: this.canvas.center.x - delta.x * this.canvas.unit,
      y: this.canvas.center.y + delta.y * this.canvas.unit
    }
  }
}

export default Controller
