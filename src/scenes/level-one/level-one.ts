import { Engine, Scene, Color, vec } from 'excalibur';

import Ball from "../../actors/ball"
import Wall from "../../actors/wall"
import Brick from "../../actors/brick"
import Paddle from "../../actors/paddle"

export default class LevelOne extends Scene {
  private ball: Ball
  private paddle: Paddle
  private bricks: Brick[]
  private walls: Wall[]

  public onInitialize(engine: Engine) {
    this.initializeActors(engine)

    // Add a mouse move listener
    engine.input.pointers.primary.on("move", (evt) => {
      this.paddle.pos.x = evt.worldPos.x;
    });

    // Start the serve after a second
    setTimeout(() => {
      // Set the velocity in pixels per second
      this.ball.vel = vec(0, 0);
    }, 1000);

    // On collision remove the brick, bounce the ball
    this.ball.on("precollision", (ev) => {
      if (this.bricks.indexOf(ev.other) > -1) {
        // kill removes an actor from the current scene
        // therefore it will no longer be drawn or updated
        ev.other.kill();
      }

      // reverse course after any collision
      // intersections are the direction body A has to move to not be clipping body B
      // `ev.intersection` is a vector `normalize()` will make the length of it 1
      // `negate()` flips the direction of the vector
      var intersection = ev.intersection.normalize();

      // The largest component of intersection is our axis to flip
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.ball.vel.x *= -1;
      } else {
        this.ball.vel.y *= -1;
      }
    });

    this.ball.on("exitviewport", () => {
      engine.goToScene('levelTwo')
    });

    this.addActorsToScene()
  }

  private addActorsToScene() {
    this.add(this.ball)
    this.add(this.paddle)
    this.bricks.forEach((brick) => this.add(brick))
    this.walls.forEach((wall) => this.add(wall))
  }

  private initializeActors(engine: Engine) {
    this.paddle = new Paddle({
      x: 150,
      y: engine.drawHeight - 40,
      width: 200,
      height: 20,
    });

    this.ball = new Ball({
      x: 100,
      y: 200,
      radius: 10,
      color: Color.Red,
    });

    const padding = 20; // px
    const xoffset = 90; // x-offset
    const yoffset = 10; // y-offset
    const columns = 4;
    const rows = 3;
    const brickColor = [Color.Violet, Color.Orange, Color.Yellow];
    const brickWidth = engine.drawWidth / columns - padding - padding / columns; // px
    const brickHeight = 30; // px

    this.bricks = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < columns; i++) {
        this.bricks.push(
          new Brick({
            x: xoffset + i * (brickWidth + padding) + padding,
            y: yoffset + j * (brickHeight + padding) + padding,
            width: brickWidth,
            height: brickHeight,
            color: brickColor[j % brickColor.length],
          })
        );
      }
    }

    const GAME_SCREEN_HEIGHT = 600
    const GAME_SCREEN_WIDTH = 800

    const leftWall = new Wall({
      x: 0,
      y: GAME_SCREEN_HEIGHT / 2,
      width: 20,
      height: GAME_SCREEN_HEIGHT,
    })

    const rightWall = new Wall({
      x: GAME_SCREEN_WIDTH,
      y: GAME_SCREEN_HEIGHT / 2,
      width: 20,
      height: GAME_SCREEN_HEIGHT,
    })

    const ceiling = new Wall({
      x: GAME_SCREEN_WIDTH / 2,
      y: 0,
      width: GAME_SCREEN_WIDTH - 20,
      height: 20,
    })

    this.walls = [leftWall, rightWall, ceiling]
    
  }

  //public onActivate() {}
  //public onDeactivate() {}
}
