import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 20,
    paddingTop: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  txt: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  }
});