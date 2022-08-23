import { colors } from '@src/theme';
import React from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <ActivityIndicator color={colors.brand.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
});
