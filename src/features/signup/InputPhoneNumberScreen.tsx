import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '@src/AppNavigator';
import { Button } from '@src/components/atoms/Button';
import { CText } from '@src/components/atoms/CText';
import { InputField } from '@src/components/atoms/InputField';
import { spacing } from '@src/theme';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TInputOTPScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  'InputPhoneNumber'
>;

export function InputPhoneNumberScreen() {
  const navigation = useNavigation<TInputOTPScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <CText style={styles.title} variant="h2Medium">
        Input your phone number
      </CText>
      <View style={styles.content}>
        <InputField
          editable={false}
          value={'+62'}
          style={styles.firstInput}
          width={'16%'}
          keyboardType="number-pad"
        />
        <InputField width={'50%'} keyboardType="number-pad" maxLength={14} />
      </View>
      <Button
        style={styles.btn}
        variant="primary"
        size="l"
        onPress={() => navigation.push('InputOTP')}>
        Continue
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layout,
    paddingTop: spacing[40] * 2,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
  },
  firstInput: {
    marginRight: spacing[16],
  },
  btn: {
    marginTop: spacing[56],
  },
  title: {
    marginBottom: spacing[56],
  },
});
