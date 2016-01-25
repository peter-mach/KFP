// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import React, {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import Assets from '../Assets';
import bs from '../BaseStyles';
import { isIOS, isAndroid } from './tools/Platforms';
import SessionStorage from './tools/SessionStorage';

import Over from './Over';

import Tutorial from './components/Tutorial';
import Counter from './components/Counter';
import Player from './gameplay/Player';
import Enemy, {
  spawnEnemy,
  moveEnemies,
  findEnemyToKill,
} from './gameplay/Enemy';

const TYPES = ['l', 'r', 't', 'b'];

export default class Game extends React.Component {
  constructor(props: {}) {
      super(props);
      this.state = {
        isActive: false,
        showTutorial: false,
      };
      this.startX = 0;
      this.startY = 0;

      this.score = 0;
      this.diff = 0;
      this.tickTime = 400;
      this.emptyChance = 32;

      this.player = null;
  }

  componentDidMount() {
    // console.info('GAME DID mount:::::');
    if (SessionStorage.showTutorial) {
      setTimeout(() => this.setState({showTutorial:true}), 500);
    } else {
      setTimeout(() => this.start(), 1000);
    }
  }

  increaseDifficulty() {
    console.info('MORE DIFFICULTY!:', this.diff + 1);
    this.emptyChance = this.emptyChance + 10;

    clearInterval(this.gameTimer);
    this.tickTime = this.tickTime - 25;
    this.diff = this.diff + 1;
    if (this.tickTime < 125) {
      this.tickTime = 125;
    } else {
      this.gameTimer = setInterval(this.gameLoop, this.tickTime);
    }
  }

  gameLoop = () => {
    // console.log('game Tick');

    let isGameOver = moveEnemies();

    // --check game over
    if (isGameOver) {
      return this.gameOver();
    }

    // --create new enemy
    const isEnemy = Math.floor(Math.random() * this.emptyChance);
    if (isEnemy > 8) {
      // console.info('spawn enemy');
      const direction = TYPES[Math.floor(Math.random() * 4)];
      spawnEnemy(direction);
    }
  };

  gameOver() {
    this.setState({isActive: false});
    clearInterval(this.gameTimer);
    this.gameTimer = null;
    setTimeout(() => {
      this.props.goto('overView', Over, {score: this.score});
    }, 1000);
  }

  start() {
    this.setState({isActive: true});
    this.gameTimer = setInterval(this.gameLoop, this.tickTime);
    console.info('start the game!');
  }

  handleTouchStart(event: Object) {
    if (!this.state.isActive) {return true;}
    this.startX = event.nativeEvent.pageX;
    this.startY = event.nativeEvent.pageY;
  }

  handleTouchEnd(event: Object) {
    if (!this.state.isActive) {return true;}
    const deltaX = event.nativeEvent.pageX - this.startX;
    const deltaY = event.nativeEvent.pageY - this.startY;

    let direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 'r' : 'l';
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 'b' : 't';
    }
    if (direction !== -1) {
      if (this.player.punch(direction)) { // can puch (not tired)
        // invert direction
        let enemyDirection;
        if (direction === 'l' || direction === 'r') {
          enemyDirection = direction === 'l' ? 'r' : 'l';
        } else {
          enemyDirection = direction === 't' ? 'b' : 't';
        }
        const enemyToKill = findEnemyToKill(enemyDirection);
        if (enemyToKill) {
          console.info('ENEMY TO KILL', enemyToKill.state.id);
          enemyToKill.kill();
          this.score++;
          this.counter.update(this.score);

          // --increase difficulty
          if (this.score % 20 === 0) {
            this.increaseDifficulty();
          }
        }
      }
    }
  }

  onCloseTutorial() {
    if (this.tutorialClosed) {return true;}
    this.tutorialClosed = true;

    this.setState({showTutorial: false});
    SessionStorage.showTutorial = false;
    setTimeout(() => this.start(), 1000);
  }

  render() {
    console.info('RERENDER GAME', this.state.isActive);
    const isActive = this.state.isActive;
    const showTutorial = this.state.showTutorial;
    // initialize array with enemies (spread is needed for map to work)
    const enemies = isActive ? [...Array(12)].map((e, index) => <Enemy id={index} key={`enemy_${index}`} />) : [];
    return (
      <View
        key="gameView"
        style={bs.container}
        onTouchStart={event => this.handleTouchStart(event)}
        onTouchEnd={event => this.handleTouchEnd(event)}
      >
        <Image key="bgImageBig" style={bs.bgImageBig}
          source={{ uri: Assets['gameplay/bg_big.png'] }}
        />
        <Image key="bgImage" style={bs.bgImage}
          source={{ uri: Assets['gameplay/bg.png'] }}
        />

        {enemies}
        <Player ref={p => this.player = p} />
        <Counter ref={c => this.counter = c} x={bs.screenCenterX + 70} y={bs.screenCenterY * 0.12} />

        {showTutorial ? <Tutorial onCloseHandler={() => this.onCloseTutorial()} /> : null}
      </View>
    );
  }

  componentWillUnmount() {
    console.log('destroy GAME screen');
  }
}

const s = StyleSheet.create({

});
