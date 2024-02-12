'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flex:1
    },
    viewcontainer: {
        flex:10
    },
    image: {
        width: 100,
        height:100,
        resizeMode: 'contain',
        marginTop: -22,
        marginLeft:16,
        marginBottom:-22
    },
    listviewcontainer:{
        alignItems:'center',
        justifyContent:'center',
        flex:9
    },
    text:{
        color:'#922051',
        fontWeight: 'bold',
        fontSize:20
    },
});
