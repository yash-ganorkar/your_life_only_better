import React from 'react';
import {Animated} from 'react-native';

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
        time: this.props.time
    }

    componentDidMount() {
        Animated.sequence([
            Animated.delay(this.props.delay),
            Animated.timing(                  // Animate over time
                this.state.fadeAnim,            // The animated value to drive
                {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                    duration: this.state.time,              // Make it take a while
                }
            )]).start();                        // Starts the animation
    }

    render() {
        let {fadeAnim} = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default FadeInView
