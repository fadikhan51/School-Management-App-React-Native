import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Category} from '../data/data';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Chevron from './Chevron';
import colors from '../../components/colors';

const Accordion = ({value, type}) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

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
        <Text style={styles.textTitle}>{value.title}</Text>
        <View style={styles.downIcon}>
          <Text
            style={[
              styles.status,
              {
                color:
                  value.status.toLowerCase() == 'paid' ? colors.green : colors.red,
              },
            ]}>
            {value.status}
          </Text>

          <Chevron progress={progress} />
        </View>
      </Pressable>

      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          {value.content.map((v, i) => {
              return (
                <View key={i} style={styles.content}>
                  <View style={styles.detailsContainer}>
                    <View>
                      <Text style={styles.detailsTitle}>Details</Text>
                      <Text style={styles.detailsText}>Amount Due</Text>
                      <Text style={styles.detailsText}>Paid Amount</Text>
                      <Text style={styles.detailsText}>Balance</Text>
                      <Text style={styles.detailsText}>Due Date</Text>
                      <Text style={styles.detailsText}>Remarks</Text>
                    </View>
                    <View>
                      <Text style={styles.detailsTitle}>Amount</Text>
                      <Text style={styles.detailsText}>{v.DueAmount}</Text>
                      <Text style={styles.detailsText}>{v.PaidAmount}</Text>
                      <Text style={styles.detailsText}>{v.Balance}</Text>
                      <Text style={styles.detailsText}>{v.DueDate}</Text>
                      <Text style={styles.detailsText}>{v.Remarks}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
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
  downIcon: {flexDirection: 'row', alignItems: 'center'},
});
