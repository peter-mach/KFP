// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import { Platform } from 'react-native';

export default {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};
