// @ts-nocheck
import { Actor, CollisionType, Color, Engine, DisplayMode, Loader } from "excalibur";
import { Resources } from "./resources"
import Wall from "./actors/wall"
import Brick from "./actors/brick"
import Ball from "./actors/ball"
import Paddle from "./actors/paddle"
import Lives from "./actors/lives"  

import LevelOne from './scenes/level-one/level-one';
import LevelTwo from './scenes/level-two/level-two';

export class ManagedGame extends Engine {
  private levelOne: LevelOne;
  private levelTwo: LevelTwo;
  private lives: Lives;
  public loader: Loader;

  public getLives() {
    return this.lives.getLives()
  }

  public setLives(lives) {
    return this.lives.setLives(lives)
  }

  constructor() {
    super({
      backgroundColor: Color.DarkGray,
      displayMode: DisplayMode.FitScreen
    });
  }

  public start() {
    this.lives = new Lives()  
    this.levelOne = new LevelOne();
    this.levelTwo = new LevelTwo();
    
    this.add('levelOne', this.levelOne);
    this.add('levelTwo', this.levelTwo);
    this.currentScene.add(this.lives)

    this.loader = new Loader(Object.values(Resources))

    this.loader.playButtonText = "Let's Pico-Breakout"
    this.loader.backgroundColor = "#4c4a50"

    //loader.logo = "base64 encoded logo here" // TODO: Come back and add a logo

    // customizing loader start button
    //loader.startButtonFactory = () => {
      //const myButton = document.createElement('button')
      //myButton.textContent = "Let's Pico-Breakout!"
      //return myButton
    //}

    return super.start(this.loader);
  }
}
const managedGame = new ManagedGame();

managedGame.start().then(() => {
  Resources.ThemeSong.loop = true
  //Resources.ThemeSong.play(1) // uncomment when you want sound to play
  managedGame.goToScene('levelOne');
});
