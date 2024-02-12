import React from 'react';
import { View, Text, StyleSheet, Image,Alert,TouchableHighlight } from 'react-native';


var styles = require('./style');
const NewsletterItem = (newsletter) => (
    //<TouchableHighlight onClick={()=>this._onPressButton(props.key)}>
    <View>
        <View style={styles.row}>
            <Text style={styles.title}>{newsletter.tytul}</Text>
            <Image
                style={styles.image}
                source={require('../../images/arrow.png')}
            />
        </View>
        <View>
            <Text style={styles.date}>{`${newsletter.data_wyslania.substring(0, 10)} ${newsletter.czas_wyslania}`}</Text>
        </View>
    </View>
//</TouchableHighlight>
);

export default NewsletterItem;
