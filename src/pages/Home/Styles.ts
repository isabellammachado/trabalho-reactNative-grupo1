import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.video,
  },
  sub: {
    textAlign: 'center',
    padding: 10,
    color: colors.text,
    fontWeight: 'bold',
    marginTop: 10,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.text,
  },
  areaSurdo: {
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  divisor: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
   tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 4,
  },
  tab: { 
    flex: 1,
     paddingVertical: 10,
      alignItems: 'center',
       borderRadius: 6 
      },

  tabActive: {
     backgroundColor: '#FFF', 
     elevation: 2 
    },

  tabText: { 
    fontWeight: '600',
     color: '#777' 
    },
  tabTextActive: {
     color: colors.primary, 
     fontWeight: 'bold' 
    }

});