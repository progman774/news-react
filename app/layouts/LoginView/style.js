'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        marginTop: 100,
    },
    inputText: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
        color: '#5a5b5b',
        borderColor: '#e6e6e6',
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'OpenSans',
    },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e36703',
        fontFamily: 'Helvetica',
    },
    signInText:{
        textAlign: 'center',
    },
    linkText:{
        color: '#922051',
        textAlign:'center',
    },
    image:{
        width: 200,
        justifyContent:'center',
        height:200,
        marginBottom:-10,
        resizeMode: 'contain',
    },
    toolbar:{
        alignItems:'center',
        justifyContent:'center'
    },
    inputTextView:{
        marginLeft:40,
        marginRight:40
    },
    buttonView:{
        marginTop: 10,
        marginBottom:10
    }
});
