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
const OFFSET = 48;
const ENEMIES_POOL = [];

export const spawnEnemy = function(type) {
  const idleEnemy = ENEMIES_POOL.find(e => !e.state.isActive);
  // console.log('enemy spawned: ', idleEnemy);
  idleEnemy.spawn(type);
};
export const moveEnemies = function() {
  let gameOver = false;
  ENEMIES_POOL.forEach(e => {
    if (e.move()) {gameOver = true;}
  });
  return gameOver;
};
export const findEnemyToKill = function(type) {
  const e = ENEMIES_POOL.find(e => e.state.isActive && e.state.direction === type && e.state.position === 1);
  return e;
};


export default class Enemy extends React.Component {
  static propTypes = {
    id: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      direction: props.direction || 'l',
      isActive: false,
      position: 4,
    };

    this.translate = null;

    ENEMIES_POOL.push(this);
    // console.log('pull:', ENEMIES_POOL.length);
  }

  spawn(type) {
    // console.log('SPAWN: ', this.props.id);
    this.setState({direction: type, isActive: true});
    this.move();
  }

  move() {
    // don't move inactive enemies
    if (!this.state.isActive) {return false;}

    // console.log('move: ', this.props.id);
    let newPosition = this.state.position - 1;
    if (newPosition < 0) {
      this.kill();
      return true;
    } else {
      const sign = this.state.direction === 'l' || this.state.direction === 't' ? 1 : -1;
      const axis = this.state.direction === 'l' || this.state.direction === 'r' ? 'X' : 'Y';
      const axis0 = axis === 'X' ? 'Y' : 'X';
      this.translate = {transform: [{ [`translate${axis}`]: newPosition * OFFSET * sign, [`translate${axis0}`]: 0}]};
      this.setState({position: newPosition});
    }
  }

  kill() {
    this.translate = null;
    this.setState({position: 4, isActive: false});
  }

  render() {
    const direction = this.state.direction;
    const isActive = this.state.isActive;

    return (
      <View style={[s.wrap, this.translate, !isActive ? s.hidden : null]}>
          <Image style={s.shadow}
            source={{ uri: Assets['gameplay/shadow.png'] }}
          />
          <Image style={[s.img, { opacity: direction === 'l' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/n_l.png'] }}
          />
          <Image style={[s.img, { opacity: direction === 'r' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/n_r.png'] }}
          />
          <Image style={[s.img, { opacity: direction === 't' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/n_t.png'] }}
          />
          <Image style={[s.img, { opacity: direction === 'b' ? 1 : 0 }]}
            source={{ uri: Assets['gameplay/n_b.png'] }}
          />
      </View>
    );
  }

  componentWillUnmount() {
    ENEMIES_POOL.splice(ENEMIES_POOL.indexOf(this), 1);
  }

}

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left:bs.screenCenterX, top: bs.screenCenterY,
  },
  hidden: {
    left: -100, top: -100,
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
