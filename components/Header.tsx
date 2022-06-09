import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Animated, {Easing, withDelay, withTiming} from 'react-native-reanimated';
import {delay} from 'react-native-redash';

interface HeaderProps {}

const {width, height} = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const Header: React.FC<HeaderProps> = ({}) => {
  const [data, setData] = React.useState(
    Array.from(Array(10), (_, i) => {
      return i;
    }),
  );
  const {Value, timing, interpolateNode} = Animated;
  const scrollX = new Value(0);
  const diffClampY = Animated.diffClamp(scrollX, 0, 50);
  const headerHeight = Animated.interpolateNode(diffClampY, {
    inputRange: [0, 50],
    outputRange: [50, -50],
    // extrapolate: 'clamp',
  });

  const headerOpacity = Animated.interpolateNode(diffClampY, {
    inputRange: [0, 50],
    outputRange: [1, 0],
    // extrapolate: 'clamp',
  });

  console.log(headerHeight);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            transform: [{translateY: diffClampY}],
            opacity: headerOpacity,
          },
        ]}>
        <AnimatedImage
          style={{width: 130, height: headerHeight, resizeMode: 'contain'}}
          source={{
            uri: 'https://th.bing.com/th/id/R.1412cf97c300eccdff3497ce1ca1d940?rik=51Ub1Bjz0Bh03w&riu=http%3a%2f%2fpngimg.com%2fuploads%2ffacebook_logos%2ffacebook_logos_PNG19749.png&ehk=oca1BavUvaPb6pE5FdtOV3Qa%2fRkiL%2foW4ne%2bh3GZrnU%3d&risl=&pid=ImgRaw&r=0',
          }}
        />
      </Animated.View>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={5}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: scrollX}},
          },
        ])}
        style={[styles.scrollView]}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                padding: 16,
                backgroundColor: '#444444',
                alignItems: 'center',
                alignSelf: 'center',
                width: width * 0.9,
                borderRadius: 10,
                height: width / 2,
                marginVertical: 16,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  flex: 1,
                  color: '#fff',
                }}>
                {item}
              </Text>
            </View>
          );
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
    width,
  },
});
