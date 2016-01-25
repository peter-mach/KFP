'use strict';

import React, {
  Image,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import TouchableBounce from 'TouchableBounce';

import Assets from '../Assets';
import bs from '../BaseStyles';

import Counter from './components/Counter';
import Game from './Game';
import MainMenu from './MainMenu';

import WithCustomFont from '@exponent/with-custom-font';
const WithGameFont = WithCustomFont.createCustomFontComponent({
  uri: Assets['04b19.ttf'],
});

export default class Over extends React.Component {
  static propTypes = {
    score: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    score: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      score: this.props.score,
      bestScore: 0,
    };

    this.blockTaps = false;
  }

  componentDidMount() {
    AsyncStorage.getItem('bestScore').then(savedScore => {
      if (savedScore) {
        savedScore = parseInt(savedScore, 10);
        if (this.state.score > savedScore) {
          this.setState({bestScore: this.state.score});
          AsyncStorage.setItem('bestScore', '' + this.state.score);
        } else {
          this.setState({bestScore: savedScore});
        }
      } else {
        this.setState({bestScore: this.state.score});
        AsyncStorage.setItem('bestScore', '' + this.state.score);
      }
    }).catch(e => {
      console.log('error loading from local storage', e);
    });
  }

  mainMenuHandler = () => {
    if (this.blockTaps) {return true;}
    this.blockTaps = true;
    this.props.goto('mainMenu', MainMenu);
  }

  playHandler = () => {
    if (this.blockTaps) {return true;}
    this.blockTaps = true;
    this.props.goto('gameView', Game);
  }

  render() {
    return (
      <View
        onClick={this.goto}
        key="gameView"
        style={bs.container}>
          <Image key="bgImageBig" style={bs.bgImageBig}
            source={{ uri: Assets['ui/bg_go.png'] }}
          />
          <Image key="bgImage" style={bs.bgImage}
            source={{ uri: Assets['ui/bg_go.png'] }}
          />

          <WithGameFont>
            <View style={s.scoreLabelWrap}>
              <Text key="scoreTextLabel" style={s.scoreLabel}>
                SCORE:
              </Text>
            </View>
          </WithGameFont>
          <Counter key="currentScore" value={this.state.score} x={bs.screenCenterX} y={bs.screenH * 0.12} />

          <WithGameFont>
            <View style={s.bestScoreLabelWrap}>
              <Text key="bestScoreTextLabel" style={s.bestScoreLabel}>
                BEST:
              </Text>
            </View>
          </WithGameFont>
          <Counter key="bestScore" size={50} value={this.state.bestScore} x={bs.screenCenterX} y={bs.screenH * 0.32} />

          <TouchableBounce onPress={this.mainMenuHandler} style={s.menuBtnWrap}>
            <Image key="menuBtn" style={s.menuBtn}
              source={{ uri: Assets['ui/b_back.png'] }}
            />
          </TouchableBounce>

          <TouchableBounce onPress={this.playHandler} style={s.playBtnWrap}>
            <Image key="playBtn" style={s.playBtn}
              source={{ uri: Assets['ui/b_play.png'] }}
            />
          </TouchableBounce>
      </View>
    );
  }

  componentWillUnmount() {
    console.log('destroy over screen');
  }
}

const s = StyleSheet.create({
  menuBtnWrap: {
    position: 'absolute',
    left: 20, top: 20,
  },
  menuBtn: {
    width: 40, height: 40,
  },
  playBtnWrap: {
    position: 'absolute',
    left: bs.screenCenterX, top: bs.screenH * 0.6,
    marginLeft: -134 / 2,
  },
  playBtn: {
    width: 135, height: 81,
  },
  scoreLabelWrap: {
    position: 'absolute',
    right: bs.screenCenterX + 10, top: bs.screenH * 0.12 + 28,
  },
  scoreLabel: {
    color: '#85081d',
    fontSize: 30,
    fontFamily: '04b19',
  },
  bestScoreLabelWrap: {
    position: 'absolute',
    right: bs.screenCenterX + 10, top: bs.screenH * 0.32 + 18,
  },
  bestScoreLabel: {
    color: '#85081d',
    fontSize: 24,
    fontFamily: '04b19',
  },
});
