// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import Dimensions from 'Dimensions';

const SCREEN_WIDTH  = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default {
  screenW: SCREEN_WIDTH,
  screenH: SCREEN_HEIGHT,
  screenCenterX: SCREEN_WIDTH / 2,
  screenCenterY: SCREEN_HEIGHT / 2,

  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0, left: 0,
    width: SCREEN_WIDTH, height: SCREEN_HEIGHT,
  },

  bgImageBig: {
    position: 'absolute',
    left: 0, top: 0,
    width: SCREEN_WIDTH, height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  bgImage: {
    position: 'absolute',
    left: SCREEN_WIDTH / 2, top: SCREEN_HEIGHT / 2,
    marginLeft: -192, marginTop: -334,
    width: 192 * 2, height: 334 * 2,
  },

};
