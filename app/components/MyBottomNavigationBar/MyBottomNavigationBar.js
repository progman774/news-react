import React, {Component, StyleSheet} from 'react';
import { Image,} from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import {Actions} from 'react-native-router-flux';
var styles = require('./style');
const MyBottomNavigationBar = (news) => (
    <BottomNavigation
        labelColor="white"
        rippleColor="white"
        style={{ height: 30, flex:1}}
        activeTab={1}
        onTabChange={(newTabIndex) => {
            switch(newTabIndex)
            {
            case 0: {
                Actions.UserPanelView();
            } break;
            case 1: {
                Actions.ListNewslettersView();
            }break;
            case 2: {
                Actions.LoginView();
            }break;
            }
        }}
    >
        <Tab
            barBackgroundColor="#922051"
            label="Moje konto"
            icon={<Image source={require('../../images/myaccount.png')} style={styles.image}/>}

        />
        <Tab
            barBackgroundColor="#922051"
            label="Newsletter"
            icon={<Image source={require('../../images/newsletter.png')} style={styles.image}/>}
        />
        <Tab
            barBackgroundColor="#9220517"
            label="Wyloguj"
            icon={<Image source={require('../../images/logout.png')} style={styles.image} tintColor='#ffffff'/>}
        />
    </BottomNavigation>
);

export default MyBottomNavigationBar;
