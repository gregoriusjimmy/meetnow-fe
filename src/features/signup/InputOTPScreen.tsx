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

export function InputOTPScreen() {
  const navigation = useNavigation<TInputOTPScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <CText style={styles.title} variant="h2Medium">
        Enter code
      </CText>
      <View style={styles.resendContainer}>
        <CText variant="subtitle" style={styles.phoneNumber}>
          +6289392838
        </CText>
        <Button variant="primary" size="s">
          Resend
        </Button>
      </View>
      <View style={styles.content}>
        <InputField textCenter width={'10%'} keyboardType="numeric" maxLength={1} />
        <InputField textCenter width={'10%'} keyboardType="numeric" maxLength={1} />
        <InputField textCenter width={'10%'} keyboardType="numeric" maxLength={1} />
        <InputField textCenter width={'10%'} keyboardType="numeric" maxLength={1} />
        <InputField textCenter width={'10%'} keyboardType="numeric" maxLength={1} />
        <InputField textCenter width={'10%'} keyboardType="numeric" maxLength={1} />
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
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[56],
  },
  phoneNumber: {
    marginRight: spacing[8],
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    marginTop: spacing[56],
  },
  title: {
    marginBottom: spacing[12],
  },
});
