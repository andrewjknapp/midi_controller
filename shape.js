
    
    // An import statement allows your code to use jscad methods:
const { cube, cuboid } = require('@jscad/modeling').primitives
const { intersect, subtract, union } = require('@jscad/modeling').booleans
const { scale, rotateZ, translate } = require('@jscad/modeling').transforms

const height = 30
const width = 200
const length = 140

const edge = {
  top: length/2,
  bottom: -(length/2),
  right: width/2,
  left: -(width/2)
}

const wallThickness = 5
const topThickness = 5

const getRatio = (original, distance) => {
  return (original - distance) / original
}

const getMyShape = () => {
  let myshape = cuboid({size: [width, length, height], center: [0,0,height/2]})
  let corner = cuboid({size: [height, height, height]})
  corner = rotateZ(0.785, corner)
  corner = translate([width/2, length/2, height/2], corner)
  
  myshape = subtract(myshape, corner)
  
  return myshape
}

const slider = (x=0, y=0) => {
  return cuboid({size: [3, 70, 10], center: [x - 1.5, y - 35, height]})
}

// A function declaration that returns geometry
const main = () => {
  let box = getMyShape()
  let inside = translate([0,0,-topThickness], scale([getRatio(width, wallThickness), getRatio(length, wallThickness),1], box))
  box = subtract(box, inside)
  
  const controls = [
    slider(edge.left + 20, edge.top - 15),
    slider(edge.left + 40, edge.top - 15),
    slider(edge.left + 60, edge.top - 15),
    slider(edge.left + 80, edge.top - 15)
   ]
  
  for (const control of controls) {
    box = subtract(box, control)
  }

  return box
}

// A declaration of what elements in the module (this file) are externally available.
module.exports = { main }
