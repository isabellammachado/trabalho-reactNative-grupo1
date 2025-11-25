import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container:{
      flex:1,
      padding: 20,
      backgroundColor: colors.video,
      paddingTop: 90,
  },
  
  tit:{
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  lbl: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: colors.text,
  },
  row: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
  }
});