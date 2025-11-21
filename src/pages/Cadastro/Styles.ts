import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  box: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  tit: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  lbl: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  }
});