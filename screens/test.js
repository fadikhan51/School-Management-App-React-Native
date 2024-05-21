import React from 'react';

import {View, FlatList, StyleSheet, Text, Dimensions} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const deviceWidth = Dimensions.get('window').width;

const threshold = -deviceWidth * 0.4;

const FlatListItem = ({item}) => {
  const dragX = useSharedValue(0);

  const height = useSharedValue(65);

  const opacity = useSharedValue(1);

  const gestureHander = useAnimatedGestureHandler({
    onActive: e => {
      dragX.value = e.translationX;
    },

    onEnd: e => {
      if (threshold < e.translationX) {
        dragX.value = withTiming(0);
      } else {
        dragX.value = withTiming(-deviceWidth);

        height.value = withTiming(0);

        opacity.value = withTiming(0);
      }
    },
  });

  const itemContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: dragX.value,
        },
      ],

      height: height.value,

      opacity: opacity.value,

      marginTop: opacity.value === 1 ? 10 : 0,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHander}>
      <Animated.View style={[styles.itemContainer, itemContainerStyle]}>
        <Text style={styles.itemText}>Swipeable item {item}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const SwipeableFlatlist = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Swipe to delete</Text>

      <FlatList
        style={styles.flatlistStyle}
        data={[1, 2, 3, 4, 5]}
        renderItem={({item}) => <FlatListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'rgba(255,255,255, 0.8)',
  },

  flatlistStyle: {backgroundColor: 'rgba(190,0,90, .2)'},

  itemContainer: {
    backgroundColor: 'white',

    borderRadius: 10,

    marginHorizontal: 16,

    shadowOpacity: 0.2,

    shadowOffset: {
      width: 0,

      height: 5,
    },
  },

  itemText: {
    color:'black',
    padding: 20,
    fontSize: 20,
  },

  heading: {
    padding: 15,
    color:'black',
    fontSize: 26,
  },
});

export default SwipeableFlatlist;
