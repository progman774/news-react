'use strict';

var React = require('react-native');

var {
    StyleSheet,Dimensions
} = React;

module.exports = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        //  flex: 1
    },
    row2: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: 'gray',
        //  flex: 1
    },
    title: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        width: Dimensions.get('window').width-100,
        marginBottom: 15,
        marginRight:16,
        marginTop:22,
        marginLeft : 16
    },
    date: {
        fontSize:12,
        marginLeft:20,
        marginRight:20,
        marginBottom:10,
        marginTop:23,
    },
    image:{
        width:20,
        height:20,
        marginBottom:15,
        marginRight:16,
        marginTop: 30,
        marginLeft : 20,
        resizeMode: 'contain',
        //  justifyContent: 'center',
        //alignItems: 'center'
    },
    listView:{
        flex:1,
        height:300,
    },
    whiteRow:{
        width : Dimensions.get('window').width
    },
    grayRow:{
        width : Dimensions.get('window').width,
        backgroundColor: '#f0f0f0'
    },
});
