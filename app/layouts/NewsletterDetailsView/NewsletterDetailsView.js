import React, { Component } from 'react';
import { Text, Image, View, ScrollView, ListView,Picker, Alert,VirtualizedList, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import ListViewNews from '../../components/ListViewNews/ListViewNews';
import MyBottomNavigationBar from '../../components/MyBottomNavigationBar/MyBottomNavigationBar';
import TitleItem from '../../components/TitleItem/TitleItem';
import BanerItem from '../../components/BanerItem/BanerItem';
import NewsItem from '../../components/NewsItem/NewsItem';
import InformationItem from '../../components/InformationItem/InformationItem';
import RowNews from '../../components/RowNews/RowNews';
var styles = require('./style');
var images = require('../../config/images');
import DefaultPreference from 'react-native-default-preference';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import ModalPicker from 'react-native-modal-picker-improved';
var API_URL = 'http://www.beinsured.t.test.ideo.pl/api/v1/1/pl/DefaultProfil/getNewsleter?apiKey=2esde2%23derdsr%23RD';
var data = null;
const base64 = require('base-64');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class NewsletterDetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [],
            filterItems: [],
            dataSource :  ds,
            promptVisible: false,
            _scrollView : ScrollView,
            article : ""
        };
    }

    componentWillMount()  {
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
                if(responseData.status=='OK') {
                this.setState({ dataSource: ds.cloneWithRows(responseData.data.zawartosc) });
                this.setState({ items: responseData.data.zawartosc });
                this.setState({filterItems :this.state.items.filter(x => x.typ!=0 && x.typ!=3 && x.tytul!=null)});

              }
              else {
                Alert.alert("Beinsured",responseData.message);
              }
            })
            .catch((error) => {
                console.error(error);
            })
          //  .done();
    }
    checkTitle(news) {
        return news.tytul!=null && news.typ!=0 && news.typ!=3;
    }
    check(news,news2) {
        return news.tytul==news2.tytul;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={require('../../images/logo.png')}
                            style={styles.image}
                        />
                        <View>
                            <Image
                                source={require('../../images/menu.png')}
                                style={styles.menu}
                            />
                            <Picker
                                selectedValue={this.state.article}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.gotoNews(itemValue)}>
                                {

                                    this.state.items.filter(this.checkTitle).map((news, i) => {
                                         {return <Picker.Item key={news.kotwica} label={news.tytul} value={news}/>;}
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                            {
                            this.state.items.length>0?
                            <VirtualizedList
                                ref={(ref) => { this.flatListRef = ref; }}
                                data={this.state.items}
                                renderItem={({ item, index }) =>  <RowNews news={item}/>}
                                getItemCount={(data) => data.length}
                                getItem ={ (data : any, index: number) => data[index]}
                                keyExtractor= {(data,index)=>data.kotwica}
                            />:<ActivityIndicator />}
                </View>
                <MyBottomNavigationBar />
            </View>
        );
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
            .done();
    }


    gotoNews (news)   {
        this.flatListRef.scrollToIndex({animated: true, index:news});
    }
    gotoNewsItem (news)   {
        this.flatListRef.scrollToItem({animated: true, item:news});
    }
    onDodajKomentarz(){
        this.setState({promptVisible : true});
    }


    renderNews (news) {
        switch (news.typ) {
        case '0':
            return (
                <TitleItem  {...news} />
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

export default NewsletterDetailsView;
