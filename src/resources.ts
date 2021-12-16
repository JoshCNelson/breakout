import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import paddle from './images/paddle.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    Paddle: new ImageSource(paddle)
}

export { Resources }
