import { Entypo } from '@expo/vector-icons';
import { spacing } from '@src/utils/theme';
import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { CText } from './CText';

interface Props extends TouchableOpacityProps {
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary' | 'white';
  fullWidth?: boolean;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
}

export const SelectField = forwardRef<TouchableOpacity, Props>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return <Text style={styles.dropdown}>This is where the dropdown will be rendered.</Text>;
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <CText variant="p">label</CText>
      <Entypo name="chevron-down" size={24} color="black" />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    borderBottomWidth: 1,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
  },
});
