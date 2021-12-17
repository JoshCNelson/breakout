import { Actor, Color, CollisionType } from "excalibur";
import { Resources } from "../resources"


//type BrickType = 
  //"Calendar"       |
  //"Check_Ins"      |
  //"CheckIns"       | 
  //"Giving"         | 
  //"Groups"         | 
  //"Registrations"  | 
  //"People"         | 
  //"Services" 



export default class Brick extends Actor {
  //private type: BrickType
  private type: string 

  constructor({ x, y, width, height, type }: any) {
    super({
      x,
      y,
      width,
      height,
    })

    this.type = type 

    this.body.collisionType = CollisionType.Active
  }

  onInitialize() {
    this.graphics.use(Resources[this.type].toSprite())    
  }
}
