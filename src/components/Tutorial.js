// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import React, {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import TouchableBounce from 'TouchableBounce';

import Assets from '../../Assets';
import bs from '../../BaseStyles';

export default class Tutorial extends React.Component {
  static propTypes = {
    onCloseHandler: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={s.wrap}>
          <TouchableBounce onPress={this.props.onCloseHandler}>
            <Image style={s.img}
              source={{ uri: Assets['ui/tutorial.png'] }}
            />
          </TouchableBounce>
      </View>
    );
  }

  componentWillUnmount() {
  }

}

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left:bs.screenCenterX, top: bs.screenCenterY,
  },
  img: {
    position: 'absolute',
    width: 140 * 2, height: 194 * 2,
    marginLeft: -140, marginTop:-194,
  },
});
