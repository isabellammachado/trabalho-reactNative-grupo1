import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2, 
    shadowColor: '#000000', 
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  info: {
    color: '#4F4F4F',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#F5F5F5',
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
    color: '#008B8B',
    textTransform: 'uppercase',
  }
});