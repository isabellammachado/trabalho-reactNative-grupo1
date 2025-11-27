import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors'; 


export const styles = StyleSheet.create({
    container: {
    position: 'absolute', 
    top: 80, 
    left: 0,
    right: 0,
    backgroundColor: colors.vermelhoAlerta,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, 
    zIndex: 999, 
    },

    text: { 
    color: colors.white, 
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    },

    time: {
    color: colors.floating, 
    fontSize: 12,
    marginTop: 4,
    },
});