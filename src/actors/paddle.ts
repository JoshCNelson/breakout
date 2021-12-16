import { Actor, CollisionType } from "excalibur";
import { Resources } from '../resources';

export default class Paddle extends Actor {
  constructor({ x, y, width, height }) {
    super({
      x,
      y,
      height,
      width,
    })

    this.body.collisionType = CollisionType.Fixed
  }

  onInitialize() {
    this.graphics.use(Resources.Paddle.toSprite())
  }
}
