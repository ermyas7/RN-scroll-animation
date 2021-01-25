/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import faker from 'faker';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + 3 * SPACING;
const BG_IMG =
  'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}) => {
    const inputRange = [-1, 0, index * ITEM_SIZE, index * (ITEM_SIZE + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          padding: SPACING,
          marginBottom: SPACING,
          borderRadius: 12,
          backgroundColor: 'rgba(255,255,255,.9)',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          transform: [{scale}],
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE,
            marginRight: SPACING / 2,
          }}
        />
        <View>
          <Text style={{fontSize: 20, fontWeight: '700'}}>{item.name}</Text>
          <Text style={{fontSize: 16, opacity: 0.7}}>{item.jobTitle}</Text>
          <Text style={{fontSize: 14, color: '#0099cc'}}>{item.email}</Text>
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={{backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <Image source={{uri: BG_IMG}} style={StyleSheet.absoluteFillObject}  blurRadius={80}/>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 24,
        }}
      />
    </View>
  );
};
