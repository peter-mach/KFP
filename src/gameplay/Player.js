// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import React, {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import Assets from '../../Assets';
import bs from '../../BaseStyles';

const BOARD_OFFSET = 20;

export default class Player extends React.Component {
  static defaultProps = {
    value: 0,
    style: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      direction: 'i',
    };
  }

  componentDidMount() {
      console.info('did mount player');
  }

  rest = () => {
    if (this.restTimer) {
      clearTimeout(this.restTimer);
      this.restTimer = null;
    }
  }

  idle = () => {
    this.idleTimer = null;
    this.setState({direction:'i'});
  }

  punch(direction) {
    if (this.restTimer) {return true;}
    if (this.idleTimer) {clearTimeout(this.idleTimer);}
    this.setState({direction});
    this.idleTimer = setTimeout(this.idle, 250);
    this.restTimer = setTimeout(this.rest, 200);
    return true;
  }

  render() {
    let active = this.state.direction;
    return (
      <View style={s.wrap}>
          <Image style={s.shadow}
            source={{ uri: Assets['gameplay/shadow.png'] }}
          />
          <Image style={[s.img, { opacity: active === 'i' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/kf_i.png'] }}
          />
          <Image style={[s.img, { opacity: active === 'l' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/kf_l.png'] }}
          />
          <Image style={[s.img, { opacity: active === 'r' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/kf_r.png'] }}
          />
          <Image style={[s.img, { opacity: active === 't' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/kf_t.png'] }}
          />
          <Image style={[s.img, { opacity: active === 'b' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/kf_b.png'] }}
          />
      </View>
    );
  }

  componentWillUnmount() {
    console.log('destroy player');
  }

}

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left:bs.screenCenterX, top: bs.screenCenterY,
  },
  img: {
    position: 'absolute',
    width: 60, height: 60,
    left: -30, top: -30 - BOARD_OFFSET,

  },
  shadow: {
    position: 'absolute',
    width: 40, height: 24,
    left: -20, top: -10,
    opacity: 0.5,
  },
});
