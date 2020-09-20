import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Slider from './components/Slider';
import menuItems from './menuItems';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Slider menuItems={menuItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
