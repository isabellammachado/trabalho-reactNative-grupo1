import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#1591EA',
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
        alertBadge: { 
        backgroundColor: '#D93644',
        borderRadius: 12,           
        width: 24,                  
        height: 24,                 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 45, 
        right: 15,
        zIndex: 10,
    },
    alertBadgeText: { 
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});