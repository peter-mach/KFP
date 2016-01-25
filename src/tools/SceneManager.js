// --
// -- -- Code by Piotr Machowski <piotr@machowski.co>
// --

'use strict';

import React, {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  fill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

function noop() { }

export default class SceneManager extends React.Component {
  static propTypes = {
    initView: React.PropTypes.func.isRequired,
    initViewProps: React.PropTypes.object,
    initViewName: React.PropTypes.string,
    opacityStep: React.PropTypes.number,
    onLoading: React.PropTypes.func,
    onLoaded: React.PropTypes.func,
  };

  static defaultProps = {
    initViewProps: {},
    initViewName: 'init-scene-view',
    opacityStep: 0.2,
    onLoading: noop,
    onLoaded: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      views: [],
    };

    this.isAnimating = false;

    //bindings
    this.goto = this.goto.bind(this);
  }

  goto(name, component, props) {
    let state = this.state;

    if (state.views.length === 1) {
      if (state.views[0].name === name) {
        state.views[0].props = props;
        state.views[0].opacity = 1;

        this.setState(state);

        return true;
      }
    }

    if (!this.isAnimationg) {
      state.views.push({
        name,
        component,
        props,
        opacity: 0,
      });

      this.props.onLoading(name);
      this.startAnimation();

      return true;
    }

    return false;
  }

  startAnimation() {
    let props = this.props;

    this.isAnimating = true;

    const loop = () => {
      let state = this.state;
      let viewFront;
      let viewBack;

      switch (state.views.length) {
        case 0:
          //no views yet so cancel the animation
          this.isAnimating = false;
          return;

        case 1:
          //check the opacity value
          viewFront = state.views[0];
          if (viewFront.opacity < 1) {
            viewFront.opacity += props.opacityStep;
            this.setState(state);
          } else {
            props.onLoaded(viewFront.name);
            this.isAnimating = false;
            return;
          }
          break;

        case 2:
          viewBack = state.views[0];
          viewFront = state.views[1];

          if (viewFront.opacity < 1) {
            //viewFront is displaying,
            viewFront.opacity += props.opacityStep;
            viewBack.opacity -= props.opacityStep;

            this.setState(state);
          } else {
            //we need to remove the view from stack
            state.views.shift();
            props.onLoaded(viewFront.name);

            this.setState(state);
            return;
          }
          break;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  genScene(key, opacity, Component, props) {
    return (
      <View key={key} style={[styles.fill, {opacity}]}>
        <Component {...props} goto={this.goto}/>
      </View>
    );
  }

  render() {
    let state = this.state;
    let props = this.props;

    if (state.views.length === 0) {
      state.views.push({
        name: props.initViewName,
        component: props.initView,
        props: props.initViewProps,

        opacity: 1,
      });
    }

    const views = state.views.map((view) => {
      return this.genScene(view.name, view.opacity, view.component, view.props);
    });

    return (
      <View style={styles.container}>
        {views}
      </View>
    );
  }
}
