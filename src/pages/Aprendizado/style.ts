import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 20 : 15,
    backgroundColor: '#e3f2fd',
    paddingTop: 40,
  },

  title: {
    fontSize: width < 767 ? 24 : 40,
    fontWeight: "bold",
    color: '#1591EA',
    textAlign: "center",
    paddingTop: 40,
  },
 
  input: {
    height: 50,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    width: 60, 
    marginHorizontal: 10 
  },
  
  button: {
    backgroundColor: '#008B8B',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    
  },
  
  buttonTexto: { 
    color: '#FFFFFF', 
    fontWeight: "bold", 
    fontSize: width < 767 ? 16 : 40,
  },

  infoContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  textoResultado: {
    fontSize: width < 767 ? 19 : 40,
    fontWeight: "bold",
    color: '#008B8B',
    marginBottom: 10,
  },

    errorText:{
      color: '#D93644',
      marginBottom: 10,
      textAlign: 'center'
    },
    descricaoTexto: {
      fontSize: 14,
      color: '#000000',
      textAlign: 'center'
    },

    infoText:{
      fontSize: width < 767 ? 16 : 40,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'center'
    },

     paginacaoContainer: { 
      flexDirection: "row", 
      marginTop: 20, 
      justifyContent: "center",
      alignItems: "center" 
      },

  
    
});
