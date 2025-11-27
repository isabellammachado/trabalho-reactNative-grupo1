import { Dimensions, Platform, StyleSheet } from 'react-native';
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
    padding: Platform.OS === 'ios' ? 20 : 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%', 
    maxHeight: '80%', 
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
  
  videoContainer: {
    width: '100%',
    height: 220, 
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden', 
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  labelVideo: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10, 
    color: '#FFF',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  }
});