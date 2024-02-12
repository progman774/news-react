import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
var styles = require('./style');
class LoadingIndicator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            this.props.loading ? (
                <View style={ styles.loading }>
                    <ActivityIndicator
                        animating={ true }
                        style={[ styles.loading ]}
                        size="large"
                    />
                </View>
            ) : null
        );
    }

}

export default LoadingIndicator;
