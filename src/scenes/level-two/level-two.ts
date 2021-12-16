import { Engine, Scene, Color } from 'excalibur';

import Paddle from "../../actors/paddle"

export default class LevelTwo extends Scene {
  private paddle: Paddle

  public onInitialize(engine: Engine) {
    this.paddle = new Paddle({
      x: 150,
      y: engine.drawHeight - 40,
      width: 200,
      height: 20,
    });

    this.add(this.paddle)
  }

  //public onActivate() {}
  //public onDeactivate() {}
}

