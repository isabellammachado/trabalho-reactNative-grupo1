import { Dimensions, Platform, StyleSheet } from "react-native"

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
},

  texto: {
     color: '#999', 
     marginTop: 15 
    },

modalConteudo: {
    width: '85%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 20 : 15,
},
modalTitle: {
    fontSize: width < 767 ? 20 : 40,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4F4F4F',
},
input: {
    height: 40,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
},

profileImage: {
 width: 100,
  height: 100,
  borderRadius: 50,
  marginBottom: 15,
  borderWidth: 3,
  borderColor: '#008B8B',
  backgroundColor: '#ddd',
},

});