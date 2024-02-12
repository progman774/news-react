import React, {Component} from 'react';
import { StyleSheet, Dimensions, View, Text, WebView, Linking, } from 'react-native';
import MyWebView from 'react-native-webview-autoheight';
var styles = require('./style');
class InformationItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title} onPress={() => {
                        if (this.props.news.link!=null && this.props.news.link.toString().contains("http://")){
                            Linking.openURL(this.props.news.link.replace('"','').replace('"',''));
                        }
                        else if (this.props.news.link!=null && !this.props.news.link.toString().contains("http://")){
                            Linking.openURL("http://"+this.props.news.link.replace('"','').replace('"',''))
                        }
                    }} >{this.props.news.tytul}</Text>
                </View>
                <MyWebView
                    source={{html: this.props.news.tresc}}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    style={styles.webview}
                />
            </View>
        );
    }
}
export default InformationItem;
