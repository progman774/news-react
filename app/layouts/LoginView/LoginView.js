import React, { Component} from 'react';
import { AppRegistry, Text, Image, View, TextInput, Button, Alert,Linking,StyleSheet,ToastAndroid, ListView,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
const base64 = require('base-64');
global.logintoken ='';
global.idNewsletter ='';
global.refreshtoken ='';
var styles = require('./style');
//var images = require('../../config/images');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import DefaultPreference from 'react-native-default-preference';
var API_URL = 'http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/RestAuth/signIn/';
export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 't.chrobak',
            password: '1234qwer',
            dataSource :  ds,
        };
        this._onPressButton=this._onPressButton.bind(this);
    }
    Refresh () {
        var data = {
            'login': 't.chrobak',
            'password': '1234qwer',
            'apiKey': '2esde2#derdsr#RD',
        };

        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        console.log('test',global.refreshtoken);
        formBody = formBody.join('&');
        var heads = new Headers();

        heads.append('Accept', 'application/json');
        heads.append('Authorization',"Basic " + base64.encode('beinsured:beinsu12'));
        heads.append('Authtoken',global.refreshtoken);
        heads.append('Content-Type','application/x-www-form-urlencoded');
        fetch(API_Refresh,{
            method: 'POST',
            headers: heads,
            body: formBody})
            .then(function(res){ return res.json(); })
            .then(function(data){
                Alert.alert(global.refreshtoken);
                if (data.status=="0")
                {
                    global.logintoken=JSON.stringify(data.login_token).replace('"','').replace('"','');
                    global.refreshtoken=JSON.stringify(data.refresh_token).replace('"','').replace('"','');
                //    Alert.alert("token odświeżony");
                }
                else {
                  Alert.alert("Beinsured",data.message);
                }

            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }
    componentWillMount() {
        DefaultPreference.get('username').then((value) => {
            if (value!=null){
                this.setState({username : value});
            }
        });
        DefaultPreference.get('password').then((value) => {
            if (value!=null){
                this.setState({password : value});
            }
        });
        if (this.state.login && this.state.password){
            console.log("if");
            console.log(this.state.login);
            this._onPressButton();
        }
        console.log("endif");
        console.log(this.state.login);
    }
    _onPressButton () {
        var data = {
            'login': this.state.username,
            'password': this.state.password,
            'apiKey': '2esde2#derdsr#RD',
        };

        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch(API_URL,
            {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Basic " + base64.encode('beinsured:beinsu12')
                },
                body: formBody
            })
            .then(function(res){ return res.json(); })
            .then(function(data){
                if (data.status="0"){
                    ToastAndroid.show(JSON.stringify(data.message).replace('"','').replace('"',''), ToastAndroid.SHORT);
                    global.logintoken=JSON.stringify(data.login_token).replace('"','').replace('"','');
                    global.refreshtoken=JSON.stringify(data.refresh_token).replace('"','').replace('"','');
                    console.log('loginView',global.refreshtoken);
                    DefaultPreference.set('refreshtoken',JSON.stringify(data.refresh_token).replace('"','').replace('"',''));
                    console.log("onclick");
                    console.log("login",data.login);
                    DefaultPreference.set('login',data.login);
                    DefaultPreference.set('password',data.password);
                    if (global.refreshtoken<=new Date())
                    {
                        this.Refresh()
                    }
                    fetch("http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/DefaultProfil/getListaNewsleter?apiKey=2esde2%23derdsr%23RD&page="+1,{
                        method: 'GET',
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': "Basic " + base64.encode('beinsured:beinsu12'),
                            'Authtoken': global.logintoken
                        },
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if (responseData.status=="OK"){
                                //Alert.alert(typeof(responseData.data));
                                DefaultPreference.set('json',JSON.stringify(responseData));
                                //  Alert.alert('text');
                                Actions.ListNewslettersView();
                            }
                            else{
                                Alert.alert('Beinsured',responseData.message);
                            }

                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                else {
                    Alert.alert('Beinsured',data.message);
                }

            });

    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Image
                        style={styles.image}
                        source={require('../../images/logo.png')}
                    />
                </View>
                <View style={styles.inputTextView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Login'
                        underlineColorAndroid= 'transparent'
                        placeholderTextColor= '#959595'
                        onChangeText={(user) => this.setState({username : user})}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.inputText}
                        placeholder='Hasło'
                        underlineColorAndroid= 'transparent'
                        placeholderTextColor= '#959595'
                        onChangeText={(pass) => this.setState({password : pass})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonView}>
                        <Button
                            onPress={this._onPressButton}
                            title="Zaloguj"
                            color="#ff7200"
                            style={styles.button}
                        />
                    </View>
                    <Text style={styles.signInText}>
                      Jeśli nie masz jeszcze konta zarejestruj się na beinsured.pl
                    </Text>
                    <Text style={styles.linkText}
                        onPress={() => Linking.openURL('http://www.beinsured.pl/pakiety/')}>
                        Link
                    </Text>
                </View>
            </View>
        );
    }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
