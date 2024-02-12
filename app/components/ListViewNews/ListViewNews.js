import React, { Component } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableWithoutFeedback,
    TouchableHighlight,
    WebView,
    Dimensions,
    PixelRatio,
    Button
} from 'react-native';
import MyWebView from 'react-native-webview-autoheight';
import Prompt from 'react-native-prompt';
import TitleItem from '../TitleItem/TitleItem';
import InformationItem from '../InformationItem/InformationItem';
import BanerItem from '../BanerItem/BanerItem';
import NewsItem from '../NewsItem/NewsItem';
const base64 = require('base-64');
import DefaultPreference from 'react-native-default-preference';
var styles = require('./style');
var API_URL = 'http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/DefaultProfil/getNewsleter?apiKey=2esde2%23derdsr%23RD';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class ListViewNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource :  ds,
            promptVisible: false,
            _listView : ListView,
        };
    }


    componentWillMount() {
        if (global.refreshtoken<=new Date())
        {
            this.Refresh();
        }
        fetch(API_URL+'&newsletter='+global.idNewsletter,{
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
                this.setState({ dataSource: ds.cloneWithRows(responseData.data.zawartosc) });
                DefaultPreference.set('news',JSON.stringify(responseData.data.zawartosc));
                //  alert(JSON.stringify(responseData.data.zawartosc));
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
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

    render() {
        return (
            <View>
                <ListView
                    ref={(listView) => { this.state._listView = listView; }}
                    dataSource={this.state.dataSource}
                    renderRow={(news)=>this.renderNews(news)}
                    //        renderRow={(rowdata,sectionID)=><Row {...rowdata,...sectionID}/>}
                />
            </View>
        );
    }
    gotoNews()
    {
        this._listView.scrollToEnd({animated: false});
    }
    onDodajKomentarz(){
        this.setState({promptVisible : true});
    }


    renderNews (news) {
        switch (news.typ) {
        case '0':
            return (
                <TitleItem {...news} />
            );
        case '1':
            return (
                <InformationItem {...news} />
            );
        case '2':
            return (
                <NewsItem news={news} />
            );
        case '3':
            return (
                <BanerItem {...news} />
            );
        default:
            return null;
        }
    }
}

export default ListViewNews;
