import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.video,
  },
  sub: {
    textAlign: 'center',
    padding: 10,
    color: colors.text,
    fontWeight: 'bold',
    marginTop: 10,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.text,
  },
  areaSurdo: {
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  divisor: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  }
});