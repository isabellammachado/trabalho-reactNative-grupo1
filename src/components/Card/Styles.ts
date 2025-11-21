import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  info: {
    color: '#555',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#EEE',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
  },
  tagTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.secondary,
    textTransform: 'uppercase',
  }
});