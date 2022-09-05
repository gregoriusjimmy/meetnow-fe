import { colors, spacing } from '@utils/theme';
import Slider from 'range-slider-react-native';
import { memo, useCallback } from 'react';
import { View, StyleSheet, StyleProp } from 'react-native';

const Rail = memo(() => {
  return <View style={railStyles.root} />;
});

const RailSelected = memo(() => {
  return <View style={railSelectedStyles.root} />;
});

const THUMB_RADIUS = spacing[20];

const Thumb = () => {
  return <View style={thumbStyles.root} />;
};

export const RangeSlider = ({
  handleValueChange,
  min,
  max,
  low,
  high,
  step = 1,
  minRange = 1,
  disableRange = false,
  style,
}: {
  handleValueChange: (low: number, high: number) => void;
  min: number;
  max: number;
  low?: number;
  high?: number;
  step?: number;
  minRange?: number;
  disableRange?: boolean;
  style?: StyleProp<View>;
}) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  return (
    <Slider
      style={[{ width: '100%' }, style]}
      min={min}
      max={max}
      low={low}
      high={high}
      disableRange={disableRange}
      minRange={minRange}
      step={step}
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      onValueChanged={useCallback((low: number, high: number) => handleValueChange(low, high), [])}
    />
  );
};

const thumbStyles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

const railSelectedStyles = StyleSheet.create({
  root: {
    height: spacing[16],
    backgroundColor: '#4499ff',
    borderRadius: spacing[16],
  },
});

export const railStyles = StyleSheet.create({
  root: {
    flex: 1,
    height: spacing[16],
    borderRadius: spacing[16],
    backgroundColor: colors.base.lightGray,
  },
});
