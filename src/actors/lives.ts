import { Actor, CollisionType, Sprite, Color, Text, Font } from "excalibur";
import { Resources } from '../resources';

export default class Lives extends Actor {
  private lives: number

  constructor(lives = 3) {
    super({
      x: 700,
      y: 550,
      height: 200,
      width: 200,
      color: Color.Red,
    })

    this.lives = lives 

    this.body.collisionType = CollisionType.PreventCollision

    this.addEventHandlers()
  }

  private addEventHandlers() {
    this.graphics.onPreDraw = (ctx, delta) => {
      const font = new Font({ size: 20 })
      const text = new Text({ text: `${this.lives} lives remaining`, color: Color.White, font })

      this.graphics.use(text)
    }
  }

  public getLives() {
    return this.lives
  }

  public setLives(lives) {
    return this.lives = lives
  }

  onInitialize() {
    const font = new Font({ size: 20 })
    const text = new Text({ text: `${this.lives} lives remaining`, color: Color.White, font })

    this.graphics.use(text)
  }
}
