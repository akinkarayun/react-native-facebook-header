import React from 'react';
import {
  FlatList,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Animated,
  PushNotificationIOS,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Header} from './components/Header';

const {width, height} = Dimensions.get('window');
const App = () => {
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const colorMap = [] as any;

  const [data, setData] = React.useState(
    Array.from(Array(10), (_, i) => {
      colorMap[i] = getRandomColor();
      return i;
    }),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
