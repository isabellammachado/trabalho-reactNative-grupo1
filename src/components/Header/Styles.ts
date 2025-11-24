import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 20,
    paddingTop: 50,
    backgroundColor: colors.primary,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
        alertBadge: { 
        backgroundColor: colors.vermelhoAlerta,
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