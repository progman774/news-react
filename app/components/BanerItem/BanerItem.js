import React from 'react';
import { View, Image, StyleSheet,PixelRatio,Linking, TouchableHighlight } from 'react-native';
var styles = require('./style');
const BanerItem = (news) => (
    <View style={styles.baner}>
        <TouchableHighlight onClick={() => {
            if (news.link!=null && news.link.toString().contains("http://")){
                Linking.openURL(news.link.replace('"','').replace('"',''));
            }
            else if (news.link!=null && !news.link.toString().contains("http://")){
                Linking.openURL("http://"+news.link.replace('"','').replace('"',''))
            }
        }}>
            <Image
                source={{uri: news.image.link}}
                style={{
                    width: parseInt(news.image.width, 10)/PixelRatio.get(),
                    height: parseInt(news.image.height, 10)/PixelRatio.get(),
                }}
            />
        </TouchableHighlight>
    </View>
);
export default BanerItem;
