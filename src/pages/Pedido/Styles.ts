import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  box: {
    padding: 20,
  },
  lbl: {
    fontWeight: 'bold',
    marginTop: 15,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    marginTop: 5
  }
});