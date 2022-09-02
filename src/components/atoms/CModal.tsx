import { colors } from '@utils/theme';
import { forwardRef } from 'react';
import { Modal, ModalProps, Pressable, StyleSheet } from 'react-native';

interface Props extends ModalProps {
  children: JSX.Element;
  handleBackdropPress: () => void;
}

export const CModal = forwardRef<Modal, Props>(
  ({ children, handleBackdropPress, ...otherProps }, ref) => {
    return (
      <Modal ref={ref} transparent={true} animationType="fade" {...otherProps}>
        <Pressable style={styles.backdrop} onPress={handleBackdropPress} />
        {children}
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: { opacity: 0.5, backgroundColor: colors.base.black, flex: 1 },
});
