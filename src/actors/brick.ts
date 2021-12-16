import { Actor, Color, CollisionType } from "excalibur";

export default class Brick extends Actor {
  constructor({ x, y, width, height, color }) {
    super({
      x,
      y,
      width,
      height,
      color, 
    })

    this.body.collisionType = CollisionType.Active
  }
}
