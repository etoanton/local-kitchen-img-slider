import React from 'react';

import { StyleSheet, View, Image, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const SlideItem = ({ src }) => (
  <View style={styles.container}>
    <View style={styles.slideImgContainer}>
      <Image style={styles.slideImg} source={src}/>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    width: deviceWidth,
    height: 300,
    position: 'relative',
  },
  slideImgContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingBottom: 10,
  },
  slideImg: {
    flex: 1,
    width: deviceWidth * 1.2, 
    height: undefined,
    resizeMode: 'contain',

    shadowColor: "#000",
    shadowOffset: {
      width: -10,
      height: 10,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
});

export default SlideItem;