import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sub: {
    textAlign: 'center',
    padding: 10,
    color: '#666',
    fontWeight: 'bold',
    marginTop: 10,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
  areaSurdo: {
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  divisor: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  }
});