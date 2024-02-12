import React, { Component,Buffer } from 'react';
import { AppRegistry} from 'react-native';
import RouterApp from './app/routes/RouterApp.js';

 export default class AwesomeProject extends Component {
   render() {
    return (
     <RouterApp/>
    );
  }
 }


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
