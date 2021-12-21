import { Scene, Color, vec, GameEvent} from 'excalibur';
import { ManagedGame } from "../../index"

import Ball from "../../actors/ball"
import Wall from "../../actors/wall"
import Brick from "../../actors/brick"
import Paddle from "../../actors/paddle"

import Lives from "../../actors/lives"
export default class LevelOne extends Scene {
  private ball: Ball
  private paddle: Paddle
  private bricks: Brick[]
  private walls: Wall[]
  private lives: Lives 
  public engine: ManagedGame

  public onInitialize(engine: ManagedGame) {
    this.engine = engine
    this.initializeActors()

    this.addActorsToScene()
  }

  private addActorsToScene() {
    this.add(this.ball)
    this.add(this.paddle)
    this.bricks.forEach((brick) => this.add(brick))
    this.walls.forEach((wall) => this.add(wall))
    this.add(this.lives)
  }

  private initializeActors() {
    this.lives = new Lives(this.engine.getLives())
    this.paddle = new Paddle({
      x: 150,
      y: this.engine.drawHeight - 40,
      width: 150,
      height: 20,
    });

    this.ball = new Ball({
      x: 100,
      y: 200,
      radius: 10,
      color: Color.Red,
    });

    const padding = 20;
    const xoffset = 60;
    const yoffset = 10;
    const columns = 1;
    const rows = 1;
    const brickWidth = 70 
    const brickHeight = 22;

    // NOTE: removing Registrations for now due to art size issues
    // could be added back in with Designs help in getting a smaller
    // graphic
    const brickTypes: string[] = ["Calendar", "CheckIns", "Giving", "Groups", "People", "Services"]
    this.bricks = [];
    for (let row = 0; row < rows; row++) {
      for (let i = 0; i < columns; i++) {
        this.bricks.push(
          new Brick({
            x: xoffset + i * (brickWidth + padding) + padding,
            y: yoffset + row * (brickHeight + padding) + padding,
            width: brickWidth,
            height: brickHeight,
            type: brickTypes[row]
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

  private addEngineHandlers() {
    // Add a mouse move listener
    this.engine.input.pointers.primary.on("move", (evt) => {
      this.paddle.pos.x = evt.worldPos.x;
    });
  }

  private addLevelHandlers() {
    this.on("New ball", () => {
      this.ball = new Ball({
        x: 100,
        y: 200,
        radius: 10,
        color: Color.Red,
      });

      this.add(this.ball)

      // NOTE: This does not seem like a good way of handling this
      // however there is something I am not understanding about
      // how the event emitters are supposed to be used so this is
      // my "make it work" approach and hope to revisit this later
      this.registerBallEventHandlers()
    })
    
    this.registerBallEventHandlers()
  }

  private registerBallEventHandlers() {
    // On collision remove the brick, bounce the ball
    this.ball.on("precollision", (ev: any) => {
      if (this.bricks.indexOf(ev.other) > -1) {
        // kill removes an actor from the current scene
        // therefore it will no longer be drawn or updated
        ev.other.kill();
      }

      // If we have removed all bricks proceed to next level 
      if (this.bricks.every(brick => brick.active === false)) {
        this.engine.goToScene('levelTwo')
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
      const currentLives = this.engine.getLives()
      const updatedLives = this.engine.setLives(currentLives - 1)

      this.lives.setLives(updatedLives)
      
      if (updatedLives === -1) {
        this.engine.start()
        .then(() => this.engine.goToScene('levelOne'))
      } else {
        // NOTE: Not sure what to do with 
        // GameEvent object just yet
        this.emit("New ball", new GameEvent())
      } 

      //engine.goToScene('levelTwo')
    });
  }

  public onActivate() {
    this.addEngineHandlers()
    this.addLevelHandlers()
  }
  //public onDeactivate() {}
}
