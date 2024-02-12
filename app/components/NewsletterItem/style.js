'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    //  flex: 1
    },
    title: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        width: 320,
        marginBottom: 15,
        marginLeft: 16,
        marginRight:16,
        marginTop:22,
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
        marginLeft:16,
        marginBottom:15,
        marginRight:16,
        marginTop: 30,
        resizeMode: 'contain',
    //  justifyContent: 'center',
    //alignItems: 'center'
    },
});
