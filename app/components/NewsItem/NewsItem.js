import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Linking,TouchableHighlight, Alert,WebView,Keyboard } from 'react-native';
import MyWebView from '../WebView/MyWebView';
import Prompt from 'react-native-prompt';
const base64 = require('base-64');
var styles = require('./style');
var API_URL = 'http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/DefaultAktualnosci/dodajKomentarz';
class NewsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            promptVisible: false
        }
        //this.AddComment=this._AddComent.bind(this);
    }
    render() {
        return (
            <View style={{  alignItems: 'center'}}>
                <Text style={styles.title} onPress={() => {
                    if (this.props.news.link!=null && this.props.news.link.toString().contains("http://")){
                        Linking.openURL(this.props.news.link.replace('"','').replace('"',''));
                    }
                    else if (this.props.news.link!=null && !this.props.news.link.toString().contains("http://")){
                        Linking.openURL("http://"+this.props.news.link.replace('"','').replace('"',''));
                    }
                }}>
                    {this.props.news.tytul}
                </Text>
                <View style={{  alignItems: 'flex-start'}}>
                    <Text style={styles.text}>
                        {(this.props.news.autor=='') ? '' : 'Autor: '+this.props.news.autor}
                    </Text>
                </View>
                <Text style={styles.text}>
                    {(this.props.news.publikator=='') ? '' : 'Publikator: '+this.props.news.publikator}
                </Text>
                <MyWebView
                    source={{html: this.props.news.tresc}}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    style={styles.webview}
                />
                <View style={{width:Dimensions.get('window').width-80}}>
                    <Button
                        title="Dodaj Komentarz"
                        style={styles.button}
                        color="#ff7200"
                        onPress={()=> this.setState({promptVisible : true})}
                    />
                </View>
                <View>
                    <Prompt
                        title="Dodaj Komentarz"
                        placeholder="Komentarz"
                        visible={this.state.promptVisible}
                        onCancel={ () => this.setState({
                            promptVisible: false,
                        }) }
                        onSubmit={ (value) => {
                            var data = {
                                'id_aktualnosci' : this.props.news.id_aktualnosci,
                                'apiKey' : '2esde2#derdsr#RD',
                                'komentarz' : value,
                            };
                            var formBody = [];
                            for (var property in data) {
                                var encodedKey = encodeURIComponent(property);
                                var encodedValue = encodeURIComponent(data[property]);
                                formBody.push(encodedKey + '=' + encodedValue);
                            }
                            formBody = formBody.join('&');
                            fetch(API_URL,{
                                method: 'POST',
                                headers:{
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': "Basic "+base64.encode('beinsured:beinsu12'),
                                    'Authtoken': global.logintoken,
                                },
                                body: formBody
                            })
                                .then(function(res){ return res.json(); })
                                .then(function(data){
                                    Alert.alert('Beinsured',JSON.stringify(data.message).replace('"','').replace('"',''));
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                            this.setState({promptVisible: false});
                        }
                        }
                    />
                </View>


            </View>

        );
    }
}

export default NewsItem;
