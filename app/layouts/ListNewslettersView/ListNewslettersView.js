import React, { Component } from 'react';
import { AppRegistry, Text, Image, View, TextInput, Button, Alert,Linking,StyleSheet,ToastAndroid,ScrollView, FlatList, Picker,Icon} from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import ListViewNewsletter from '../../components/ListViewNewsletter/ListViewNewsletter';
import MyBottomNavigationBar from '../../components/MyBottomNavigationBar/MyBottomNavigationBar';
var styles = require('./style');
class ListNewslettersView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewcontainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={require('../../images/toolbarlogo.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.listviewcontainer}>
                        <Text style={styles.text}>
                          Lista newsleterów
                        </Text>
                        <ListViewNewsletter/>
                    </View>
                </View>
                <MyBottomNavigationBar />
            </View>
        );
    }
}

export default ListNewslettersView;
