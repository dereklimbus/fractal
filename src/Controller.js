import Canvas from './Canvas'

class Controller {
  canvas = new Canvas()
  zoomFactor = 2

  zoomIn(target = {
    x: (this.canvas.range.x.min + this.canvas.range.x.max) / 2,
    y: (this.canvas.range.y.min + this.canvas.range.y.max) / 2
  }) {
    const len = {
      x: (this.canvas.range.x.max - this.canvas.range.x.min) / zoomFactor,
      y: (this.canvas.range.y.max - this.canvas.range.y.min) / zoomFactor
    }

    const boundedRange = (bounded, bounding) => {
      const range = {...bounded}
      if (range.min < bounding.min) {
        const diff = bounding.min - range.min
        range.min += diff
        range.max += diff
      } else if (range.max > bounding.max) {
        const diff = range.max - bounding.max
        range.max -= diff
        range.min -= diff
      }
      return range
    }

    this.canvas.range = {
      x: boundedRange({
        min: target.x - len.x / 2,
        max: target.x + len.x / 2
      }, this.canvas.range.x),
      y: boundedRange({
        min: target.y - len.y / 2,
        max: target.y + len.y / 2
      }, this.canvas.range.y)
    }
  }

  zoomOut() {
    const diff = {
      x: (this.canvas.range.x.max - this.canvas.range.x.min) * (zoomFactor - 1),
      y: (this.canvas.range.y.max - this.canvas.range.y.min) * (zoomFactor - 1)
    }

    this.canvas.range = {
      x: {
        min: this.canvas.range.x.min - diff.x / 2,
        max: this.canvas.range.x.max + diff.x / 2
      },
      y: {
        min: this.canvas.range.y.min - diff.y / 2,
        max: this.canvas.range.y.max + diff.y / 2
      }
    }
  }

  move(delta = {x: 0, y: 0}) {
    this.canvas.range = {
      x: {
        min: this.canvas.range.x.min + x,
        max: this.canvas.range.x.max + x
      },
      y: {
        min: this.canvas.range.y.min + y,
        max: this.canvas.range.y.max + y
      }
    }
  }
}

export default Controller
