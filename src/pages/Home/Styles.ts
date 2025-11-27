import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  sub: {
    textAlign: 'center',
    padding: 10,
    color: '#4F4F4F',
    fontWeight: 'bold',
    marginTop: 10,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 50,
    color: '#4F4F4F',
  },
  areaSurdo: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  },
  divisor: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1591EA',
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
     color: '#1591EA', 
     fontWeight: 'bold' 
    }

});