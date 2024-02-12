import React, { Component } from 'react';
import { ListView, StyleSheet,TouchableHighlight, View, Text,Image, Alert} from 'react-native';
const base64 = require('base-64');
var API_URL = 'http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/DefaultProfil/getListaNewsleter?apiKey=2esde2%23derdsr%23RD';
import DefaultPreference from 'react-native-default-preference';
import TitleItem from '../TitleItem/TitleItem';
import InformationItem from '../InformationItem/InformationItem';
import BanerItem from '../BanerItem/BanerItem';
import NewsItem from '../NewsItem/NewsItem';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var styles = require('./style');
import {Actions} from 'react-native-router-flux';
class RowNews extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.news.typ) {
        case '0':
            return (
                <TitleItem {...this.props.news} />
            );
        case '1':
            return (
                <InformationItem news={this.props.news} />
            );
        case '2':
            return (
                <NewsItem news={this.props.news} />
            );
        case '3':
            return (
                <BanerItem {...this.props.news} />
            );
        default:
            return null;
        }
    }
}


export default RowNews;
