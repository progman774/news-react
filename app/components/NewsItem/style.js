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
        alignItems: 'center',
        //  alignSelf: 'center',
        justifyContent: 'center',
        // width: Dimensions.get('window').width,
    },
    button:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e36703',
        fontFamily: 'Helvetica',
        marginLeft:40,
        marginRight:40,
        width: Dimensions.get('window').width,
    },
    text :{
        marginLeft:20,
        width:Dimensions.get('window').width-20,
        textAlign: 'left',
    },
    buttonContainer:{
        marginLeft:40,
        marginRight:40,
    },
    webviewContainer:{
        marginLeft: 16,
        marginRight: 16,
    },
    webview:{
        marginTop:16,
        marginBottom:16,
        marginLeft:16,
        marginRight:16,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        width: Dimensions.get('window').width-32,
    },
});
