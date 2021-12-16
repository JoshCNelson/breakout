import { Actor, Color, CollisionType } from "excalibur";

export default class Ball extends Actor {
  constructor({ x, y, radius, color }) {
    super({
      x,
      y,
      radius,
      color, 
    })

    // Set the collision Type to passive
    // This means "tell me when I collide with an emitted event, but don't let excalibur do anything automatically"
    this.body.collisionType = CollisionType.Passive

    // Other possible collision types:
    // "ex.CollisionType.PreventCollision - this means do not participate in any collision notification at all"
    // "ex.CollisionType.Active - this means participate and let excalibur resolve the positions/velocities of actors after collision"
    // "ex.CollisionType.Fixed - this means participate, but this object is unmovable"
  }
}
