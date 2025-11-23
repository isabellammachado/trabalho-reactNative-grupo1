import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },

  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
    textTransform: 'uppercase',
  },

  text:{
    fontSize: 13,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.text,
    textTransform: 'uppercase',
  },

  tag: {
    backgroundColor: '#EEE',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 10,
  },
  tagTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  info: {
    color: colors.text,
    fontWeight: 'bold',
    marginTop: 4,
    textTransform: 'uppercase',
  },
 
});