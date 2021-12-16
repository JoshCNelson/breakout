import { Actor, Color, CollisionType } from "excalibur";

export default class Wall extends Actor {
  constructor({ x, y, width, height }) {
    super({
      x,
      y,
      width,
      height,
      color: Color.Black, 
    })

    this.body.collisionType = CollisionType.Fixed
  }
}
