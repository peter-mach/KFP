// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import React, {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import TouchableBounce from 'TouchableBounce';

import Assets from '../Assets';
import bs from '../BaseStyles';

import Game from './Game';
// import Over from './Over';



export default class MainMenu extends React.Component {
    constructor(props: {}) {
      super(props);
      this.blockTaps = false;
      //bindings
      this.playHandler = this.playHandler.bind(this);
    }

    playHandler = () => {
      if (this.blockTaps) {return true;}
      this.blockTaps = true;
      this.props.goto('gameView', Game);
    }

    render() {
        return (
            <View
                key="mainMenuView"
                style={bs.container}>
                  <Image
                    key="bgImageBig"
                    style={bs.bgImageBig}
                    source={{ uri: Assets['ui/bg.png'] }}
                  />
                  <Image
                    key="bgImage"
                    style={bs.bgImage}
                    source={{ uri: Assets['ui/bg.png'] }}
                  />
                  <Image
                    key="logo"
                    style={s.logo}
                    source={{ uri: Assets['ui/logo.png'] }}
                  />

                  <TouchableBounce onPress={this.playHandler} style={s.playBtnWrap}>
                      <Image
                        key="playBtn"
                        style={s.playBtn}
                        source={{ uri: Assets['ui/b_play.png'] }}
                      />
                  </TouchableBounce>

            </View>
        );
    }
}

const s = StyleSheet.create({
  logo: {
    position: 'absolute',
    left: bs.screenCenterX, top: bs.screenH * 0.1,
    marginLeft: -148 / 2 + 5,
    width: 148, height: 180,
  },
  playBtnWrap: {
    position: 'absolute',
    left: bs.screenCenterX, top: bs.screenH * 0.6,
    marginLeft: -134 / 2,
  },
  playBtn: {
    width: 135, height: 81,
  },
});
