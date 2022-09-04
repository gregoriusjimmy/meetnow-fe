import { CModal } from '@components/atoms/CModal';
import { CTEXT, CText } from '@components/atoms/CText';
import { RangeSlider } from '@components/atoms/RangeSlider';
import { IconLocation } from '@components/icons/Location';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '@utils/scale';
import { colors, spacing } from '@utils/theme';
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

const mainLocationStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginBottom: spacing[4] },
  text: { marginLeft: spacing[12] },
});

export const CriteriaButton = ({
  title,
  specified,
  handlePress,
}: {
  title: string;
  specified: string;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity style={criteriaButtonStyles.container} onPress={handlePress}>
      <CText variant="p">{title}</CText>
      <CText variant="subtitleMedium">{specified}</CText>
    </TouchableOpacity>
  );
};

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

export const ModalCriteriaAge = ({
  handleBackdropPress,
  handleValueChange,
  low,
  high,
  visible,
}: {
  handleBackdropPress: () => void;
  handleValueChange: (low: number, high: number) => void;
  low: number;
  high: number;
  visible: boolean;
}) => {
  return (
    <CModal handleBackdropPress={handleBackdropPress} visible={visible}>
      <View style={modalCriteriaAgeStyles.content}>
        <CText variant="h4" style={modalCriteriaAgeStyles.textTitle}>
          Age range
        </CText>
        <CText variant="h2Medium">{`${low} - ${high}`}</CText>
        <RangeSlider
          low={low}
          high={high}
          min={18}
          max={50}
          minRange={5}
          handleValueChange={handleValueChange}
        />
      </View>
    </CModal>
  );
};

const modalCriteriaAgeStyles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: colors.base.white,
    paddingHorizontal: spacing.layout,
    paddingVertical: verticalScale(spacing[56]),
    borderTopLeftRadius: scale(spacing[28]),
    borderTopRightRadius: scale(spacing[28]),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  textTitle: {
    marginBottom: spacing[8],
  },
});

export const ModalCriteriaDistance = ({
  handleBackdropPress,
  handleValueChange,
  value,
  visible,
}: {
  handleBackdropPress: () => void;
  handleValueChange: (value: number) => void;
  value: number;
  visible: boolean;
}) => {
  return (
    <CModal handleBackdropPress={handleBackdropPress} visible={visible}>
      <View style={modalCriteriaAgeStyles.content}>
        <CText variant="h4" style={modalCriteriaAgeStyles.textTitle}>
          Maximum distance
        </CText>
        <CText variant="h2Medium">{`${value}km`}</CText>
        <RangeSlider
          disableRange
          min={1}
          max={21}
          step={1}
          low={value}
          handleValueChange={handleValueChange}
        />
      </View>
    </CModal>
  );
};

type TGenderCriteriaOption = 'MALE' | 'FEMALE' | 'ALL';
export const ModalCriteriaGender = ({
  handleBackdropPress,
  visible,
  selectedCriteria,
  handleSelectedOption,
}: {
  handleBackdropPress: () => void;
  visible: boolean;
  selectedCriteria: TGenderCriteriaOption;
  handleSelectedOption: (option: TGenderCriteriaOption) => void;
}) => {
  const Option = ({ option }: { option: TGenderCriteriaOption }) => (
    <TouchableOpacity
      onPress={() => handleSelectedOption(option)}
      style={[
        modalCriteriaGenderStyles.optionContainer,
        selectedCriteria === option && modalCriteriaGenderStyles.optionActive,
      ]}>
      {option === 'FEMALE' && (
        <Ionicons name="female-outline" size={24} color={colors.brand.secondary} />
      )}
      {option === 'MALE' && <Ionicons name="male-outline" size={24} color={colors.brand.primary} />}
      {option === 'ALL' && (
        <Ionicons name="ios-male-female-outline" size={24} color={colors.base.darkGray} />
      )}
      <CText style={modalCriteriaGenderStyles.text}>{option}</CText>
    </TouchableOpacity>
  );
  return (
    <CModal handleBackdropPress={handleBackdropPress} visible={visible}>
      <View style={[modalCriteriaAgeStyles.content, modalCriteriaGenderStyles.content]}>
        <Option option="MALE" />
        <Option option="FEMALE" />
        <Option option="ALL" />
      </View>
    </CModal>
  );
};

const modalCriteriaGenderStyles = StyleSheet.create({
  optionContainer: {
    borderWidth: 1,
    paddingVertical: spacing[16],
    paddingHorizontal: spacing[8],
    borderColor: colors.base.lightGray,
    borderRadius: spacing[16],
    width: '30%',
    alignItems: 'center',
  },
  optionActive: {
    borderColor: colors.brand.primary,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: { marginTop: spacing[4] },
});

export const InterestBadge = ({ interest }: { interest: string }) => {
  return (
    <View style={interestBadgeStyles.container}>
      <CText variant="p" style={interestBadgeStyles.text}>
        {interest}
      </CText>
    </View>
  );
};

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
