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

    // NOTE: Is precollision the appropriate lifecycle we want to
    // hook into?
    this.on('precollision', (_) => {
      Resources.Chime.play(1)
    })
  }

  onInitialize() {
    this.graphics.use(Resources[this.type].toSprite())    
  }
}
