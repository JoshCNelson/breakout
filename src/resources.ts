// @ts-nocheck
import { ImageSource, Sound } from 'excalibur';

import calendar from './images/calendar.png';
import checkIns from './images/check-ins.png';
import giving from './images/giving.png';
import groups from './images/groups.png';
import people from './images/people.png';
import registrations from './images/registrations.png';
import services from './images/services.png';

import themeSong from './audio/theme.mp3'
import chime from './audio/chime.mp3'

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Calendar: new ImageSource(calendar),
    CheckIns: new ImageSource(checkIns),
    Giving: new ImageSource(giving),
    Groups: new ImageSource(groups),
    People: new ImageSource(people),
    Registrations: new ImageSource(registrations),
    Services: new ImageSource(services),

    ThemeSong: new Sound(themeSong),
    Chime: new Sound(chime),
}

export { Resources }
