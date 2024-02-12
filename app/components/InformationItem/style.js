'use strict';

var React = require('react-native');
//var Dimensions = require('react-native');
var {
    StyleSheet,Dimensions
} = React;

module.exports = StyleSheet.create({
    row: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
        marginLeft: 16,
        marginRight:16,
        marginTop:22,
    },
    mywebview:{
        marginTop:16,
        marginBottom:16,
        marginLeft:16,
        marginRight:16,
        alignItems: 'center',
        //  alignSelf: 'center',
        justifyContent: 'center',
        flex:1,
        width: 100
    },
    container:{
        alignItems:'center',
    },
    webview: {
        width: Dimensions.get('window').width-32,
        marginTop:16,
        marginBottom:16,
        marginLeft:16,
        marginRight:16,
        alignItems: 'center',
        justifyContent: 'center',
        height:100,
        flex: 1,
    },
});
