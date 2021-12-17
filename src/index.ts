import { Actor, CollisionType, Color, Engine, DisplayMode, Loader } from "excalibur";
import { Resources } from "./resources"
import Wall from "./actors/wall"
import Brick from "./actors/brick"
import Ball from "./actors/ball"
import Paddle from "./actors/paddle"

import LevelOne from './scenes/level-one/level-one';
import LevelTwo from './scenes/level-two/level-two';

class ManagedGame extends Engine {
  private levelOne: LevelOne;
  private levelTwo: LevelTwo;

  constructor() {
    super({ displayMode: DisplayMode.FitScreen });
  }

  public start() {
    this.levelOne = new LevelOne();
    this.levelTwo = new LevelTwo();
    
    this.add('levelOne', this.levelOne);
    this.add('levelTwo', this.levelTwo);

    const loader = new Loader(Object.values(Resources))

    loader.playButtonText = "Let's Pico-Breakout"
    loader.backgroundColor = "#4c4a50"
    //loader.logo = "This is s tat"
    // customizing loader start button
    //loader.startButtonFactory = () => {
      //const myButton = document.createElement('button')
      //myButton.textContent = "Let's Pico-Breakout!"
      //return myButton
    //}

    return super.start(loader);
  }
}

const managedGame = new ManagedGame();

managedGame.start().then(() => {
  managedGame.goToScene('levelOne');
});
