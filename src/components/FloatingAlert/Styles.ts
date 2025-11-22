import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors'; 

const ALERT_RED = '#D93644'; 

export const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        top: 0, 
        left: 0,
        right: 0,
        backgroundColor: ALERT_RED,
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
        color: '#FFD1D5', 
        fontSize: 12,
        marginTop: 4,
    },
});