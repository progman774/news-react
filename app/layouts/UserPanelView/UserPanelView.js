import React, { Component,Buffer} from 'react';
import { AppRegistry, Text, Image, View, TextInput, Button, Alert,Linking,StyleSheet,ToastAndroid} from 'react-native';
import { StackNavigator,} from 'react-navigation';
import MyBottomNavigationBar from '../../components/MyBottomNavigationBar/MyBottomNavigationBar';
import {Actions} from 'react-native-router-flux';
import DefaultPreference from 'react-native-default-preference';
const base64 = require('base-64');
import HR from 'react-native-hr'
var styles = require('./style');
var images = require('../../config/images');
var API_URL = 'http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/DefaultProfil/getPakiet?apiKey=2esde2%23derdsr%23RD';
var API_Refresh = 'http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/RestAuth/refresh';
var usernamePassword = 'beinsured:beinsu12';
class UserPanelView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rodzaj_konta : 0,
            typ_abonamentu : '',
            okres : '',
            data_konca : '',
            max_ilosc_dostepow : '',
            wykorzystano_ilosc_dostepow : '',
            text_max_ilosc_dostepow : '',
            text_wykorzystano_ilosc_dostepow : '',
        };
    }

    componentWillMount(){
        if (global.refreshtoken<=new Date())
        {
            this.Refresh()
        }
        fetch(API_URL,{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': "Basic " + base64.encode('beinsured:beinsu12'),
                'Authtoken': global.logintoken
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    rodzaj_konta : data.rodzaj_konta,
                    typ_abonamentu : data.typ_abonamentu,
                    okres: data.okres,
                    data_konca: data.data_konca
                });
                if (data.rodzaj_konta==3){
                    this.setState({max_ilosc_dostepow: data.max_ilosc_dostepow.toString()});
                    this.setState({wykorzystano_ilosc_dostepow: data.wykorzystano_ilosc_dostepow.toString()});
                    this.setState({text_max_ilosc_dostepow: 'Ilość dostępów :'});
                    this.setState({text_wykorzystano_ilosc_dostepow : 'Wykorzystano :'});
                }


            })
            .catch((error) => {
                console.error(error);
            });
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

            })
            .done()
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:10}}>
                    <Image
                        source={require('../../images/logo.png')}
                        style={styles.toolbarimage}
                    />
                    <View>
                        <Text style={styles.mojekonto}>{'Moje Konto'}</Text>
                        <View style={styles.row}>
                            <Text style={styles.informacja}>{'Tutaj możesz modyfikować swoje dane podstawowe, które opisują Twoje konto.'}</Text>
                            <Image
                                style={styles.image}
                                source={require('../../images/arrow.png')}
                            />
                        </View>
                    </View>
                    <HR lineColor={'#000000'}/>
                    <View>
                        <Text style={styles.mojekonto}>{'Abonament'}</Text>
                        <View style={styles.view}>
                            <View style={styles.rowtext}>
                                <Text>Typ: </Text>
                                <Text>{this.state.typ_abonamentu}</Text>
                            </View>
                            <View style={styles.rowtext}>
                                <Text>Okres: </Text>
                                <Text style={styles.text}>{this.state.okres}</Text>
                            </View>
                            <View style={styles.rowtextlast}>
                                <Text>Ważny do: </Text>
                                <Text style={styles.text}>{this.state.data_konca}</Text>
                            </View>
                            {(this.state.rodzaj_kont==3)?(
                                <View style={styles.rowtextlast}>
                                    <Text>{this.state.text_max_ilosc_dostepow} </Text>
                                    <Text style={styles.text}>{this.state.max_ilosc_dostepow}</Text>
                                </View>
                            ) : null}
                            {(this.state.rodzaj_kont==3) ?(
                                <View style={styles.rowtextlast}>
                                    <Text>{this.state.text_wykorzystano_ilosc_dostepow}</Text>
                                    <Text style={styles.text}>{this.state.wykorzystano_ilosc_dostepow}</Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                    <HR lineColor={'#000000'}/>
                </View>
                <MyBottomNavigationBar/>
            </View>
        );
    }
}

export default UserPanelView;
