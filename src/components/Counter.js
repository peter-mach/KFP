// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Assets from '../../Assets';
import bs from '../../BaseStyles';

import WithCustomFont from '@exponent/with-custom-font';
const WithGameFont = WithCustomFont.createCustomFontComponent({
  uri: Assets['04b19.ttf'],
});

const FONT_SIZE = 65;

export default class Counter extends React.Component {
  static propTypes = {
    value: React.PropTypes.number,
    size: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  };

  static defaultProps = {
    value: 0,
    size: null,
    x: 0,
    y: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  update(value) {
    this.setState({value});
  }

  render() {
    return (
      <WithGameFont>
        <View style={[s.wrapper, {left:this.props.x, top: this.props.y}]}>
          <Text key="scoreTextBack" style={[s.score, s.scoreBack, {fontSize: this.props.size || FONT_SIZE}]}>
            {this.state.value}
          </Text>
          <Text key="scoreTextTop" style={[s.score, s.scoreTop, {fontSize: this.props.size || FONT_SIZE}]}>
            {this.state.value}
          </Text>
        </View>
      </WithGameFont>
    );
  }
}

const s = StyleSheet.create({
  wrapper: {
      position: 'absolute',
      left: 0, top: 0,
  },
  score: {
    position: 'absolute',
    color: '#c31834',
    fontSize: FONT_SIZE,
    fontFamily: '04b19',
    backgroundColor: 'transparent',
  },
  scoreTop: {
    color: '#c31834',
  },
  scoreBack: {
    color: '#85081d',
    left: 4, top: 4,
  },
});
