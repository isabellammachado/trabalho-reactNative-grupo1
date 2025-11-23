import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
const { width } = Dimensions.get('window');

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
     fontSize: width < 767 ? 20 : 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
    textTransform: 'uppercase',
  },

  text:{
    fontSize: width < 767 ? 13 : 40,
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
    fontSize: width < 767 ? 16 : 40,
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