import { CTEXT, CText } from '@src/components/atoms/CText';
import { IconLocation } from '@src/components/icons/Location';
import { colors, spacing } from '@src/theme';
import { scale } from '@src/utils/scale';
import { StyleProp, StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native';

export const MainLocation = ({
  currentStreet,
  style,
}: {
  currentStreet: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[mainLocationStyles.container, style]}>
      <IconLocation
        style={mainLocationStyles.icon}
        fill={colors.base.white}
        width={CTEXT.fontSize.h2}
        height={CTEXT.fontSize.h2}
      />
      <CText variant="h3Medium" style={mainLocationStyles.text} color="light" numberOfLines={1}>
        {currentStreet}
      </CText>
    </View>
  );
};

export const CriteriaButton = ({ title, specified }: { title: string; specified: string }) => {
  return (
    <TouchableOpacity style={criteriaButtonStyles.container}>
      <CText variant="p">{title}</CText>
      <CText variant="subtitleMedium">{specified}</CText>
    </TouchableOpacity>
  );
};

export const InterestBadge = () => {
  return (
    <View style={interestBadgeStyles.container}>
      <CText variant="p" style={interestBadgeStyles.text}>
        Berenang
      </CText>
    </View>
  );
};
const mainLocationStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginBottom: spacing[4] },
  text: { marginLeft: spacing[12] },
});

const criteriaButtonStyles = StyleSheet.create({
  container: {
    width: '30%',
    alignItems: 'center',
    padding: spacing[12],
    borderWidth: 1,
    borderColor: colors.brand.primary,
    borderRadius: scale(spacing[24]),
  },
});

const interestBadgeStyles = StyleSheet.create({
  container: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    margin: spacing[4],
    borderWidth: 1,
    borderColor: colors.brand.secondary,
    borderRadius: spacing[32],
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { color: colors.brand.secondary, marginRight: spacing[4] },
});
