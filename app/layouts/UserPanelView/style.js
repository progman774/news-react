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
    image:{
        width:20,
        height:20,
        marginLeft:16,
        marginBottom:15,
        marginRight:16,
        marginTop: 20,
        resizeMode: 'contain',
        transform: [
            { rotate: '90deg'}],
        //  justifyContent: 'center',
        //alignItems: 'center'
    },
    mojekonto:{
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
    informacja:{
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        marginBottom: 15,
        marginLeft: 16,
        marginRight:16,
        marginTop:10,
    },
    text:{
        fontWeight: 'bold',
    },
    rowtext:{
        flexDirection: 'row',
    },
    rowtextlast:{
        flexDirection: 'row',
        marginBottom: 10,
    },
    toolbarimage:{
        width: 100,
        height:100,
        resizeMode: 'contain',
        marginTop: -22, marginLeft:16,
        marginBottom:-22
    },
    container:{
        flex:1,
    },
    viewcontainer:{
        flex:10,
    },
    view:{
        marginLeft:20,
    }
});
