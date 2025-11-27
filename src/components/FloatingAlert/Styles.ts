import { StyleSheet } from 'react-native'; 


export const styles = StyleSheet.create({
    container: {
    position: 'absolute', 
    top: 80, 
    left: 0,
    right: 0,
    backgroundColor: '#D93644',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, 
    zIndex: 999, 
    },

    text: { 
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    },

    time: {
    color: '#FFD1D5', 
    fontSize: 12,
    marginTop: 4,
    },
});