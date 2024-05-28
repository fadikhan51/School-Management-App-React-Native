import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import colors from '../../components/colors';
import Chevron from './Chevron';
import {ReactNativeZoomableView} from '@dudigital/react-native-zoomable-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

const Accordion = ({value, type, zoom, passedclass, image, onImagePicked}) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const [pickedImage, setPickedImage] = useState(null);

  const onPressIcon = () => {
    console.log('Icon pressed');
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        setPickedImage(source);

        RNFS.readFile(response.assets[0].uri, 'base64')
          .then(base64Data => {
            // Send base64 data to the parent component
            // Assuming you have a prop called onImagePicked to handle this
            if (typeof onImagePicked === 'function') {
              onImagePicked(base64Data);
            }
          })
          .catch(error => {
            console.error('Error converting image to base64:', error);
          });
      }
    });
  };
  if (!value) {
    return null; // return early if value is undefined
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              'worklet';
              heightValue.value = withTiming(measure(listRef).height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
        }}
        style={styles.titleContainer}>
        <Text style={styles.textTitle}>{passedclass}</Text>
        <View style={styles.downIcon}>
          <Text
            style={[
              styles.status,
              {
                color:
                  value.status?.toLowerCase() == 'paid'
                    ? colors.green
                    : colors.red,
              },
            ]}>
            {value.status}
          </Text>

          <Chevron progress={progress} />
        </View>
      </Pressable>

      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View style={styles.content}>
            <View style={styles.detailsContainer}>
              {!image.uri ? (
                !pickedImage ? (
                  <Pressable onPress={onPressIcon} style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name="plus-circle-outline"
                      size={70}
                      color={colors.dark}></MaterialCommunityIcons>
                  </Pressable>
                ) : (
                  <ReactNativeZoomableView
                    maxZoom={1.5}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    captureEvent={true}>
                    <Image style={styles.imgmodal} source={pickedImage} />
                  </ReactNativeZoomableView>
                )
              ) : (
                <ReactNativeZoomableView
                  maxZoom={1.5}
                  minZoom={1}
                  zoomStep={0.5}
                  initialZoom={1}
                  bindToBorders={true}
                  captureEvent={true}>
                  <Image style={styles.imgmodal} source={image} />
                </ReactNativeZoomableView>
              )}
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 4,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  searchBtn: {
    margin: 10,
    width: 160,
    height: 60,
  },
  textTitle: {
    fontSize: 17,
    color: colors.dark,
    fontWeight: 'bold',
  },
  titleContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  content: {
    padding: 20,
    backgroundColor: colors.light + '10',
  },
  textContent: {
    fontSize: 14,
    color: 'black',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsTitle: {
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 10,
  },
  detailsText: {
    color: colors.dark,
    marginBottom: 5,
  },
  status: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'MPLUSRounded1c',
  },
  imgmodal: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  downIcon: {flexDirection: 'row', alignItems: 'center'},
  content: {
    padding: 20,
    backgroundColor: colors.light + '10',
  },
  textTitle: {
    fontSize: 17,
    color: colors.dark,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imgmodal: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
