import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container:{
      flex:1,
      padding: 20,
      backgroundColor: '#e3f2fd',
      paddingTop: 90,
  },
  
  tit:{
    fontSize: 24,
    color: '#1591EA',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  lbl: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#4F4F4F',
  },
  row: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
  }
});