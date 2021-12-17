import { Actor, CollisionType, Sprite, Color } from "excalibur";
import { Resources } from '../resources';

export default class Paddle extends Actor {
  constructor({ x, y, width, height, radius = 0 }) {
    super({
      x,
      y,
      height,
      width,
      radius,
      color: Color.White,
    })

    this.body.collisionType = CollisionType.Fixed
  }

  //onInitialize() {
    //const sprite = new Sprite({
      //image: Resources.Paddle,
      //sourceView: {
        //x: 50,
        //y: 55,
        //width: 200,
        //height: 20
      //},
    //}) 
    //this.graphics.use(sprite)
  //}
}
