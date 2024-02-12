import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleItem = (news) => (
    <View style={styles.row}>
        <Text style={styles.title}>{news.tytul}</Text>
    </View>
);
var styles =  require('./style');
export default TitleItem;
