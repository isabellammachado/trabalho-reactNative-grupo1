import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 100,
    backgroundColor: colors.background,
  },

  surdo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain',
    borderRadius: 12,
    alignSelf: 'center',
  },

  logo: {
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Merriweather',
  },
});