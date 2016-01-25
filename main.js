// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import React, {
  AppRegistry,
  View,
  StatusBarIOS,
} from 'react-native';
// import { isIOS, isAndroid } from './src/tools/Platforms';

import bs from './BaseStyles';
import SceneManager from './src/tools/SceneManager';

// import Game from './src/Game';
import MainMenu from './src/MainMenu';

class Main extends React.Component {
  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setHidden(true, 'none');
    }
  }

  render() {
    return (
      <View style={bs.container}>
        <SceneManager
          ref="scene"
          initView={MainMenu}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('main', () => Main);
