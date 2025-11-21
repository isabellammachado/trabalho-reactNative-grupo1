import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    paddingTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
     paddingTop: 40,
  },
 
  scrollView: {
    marginTop: 20,
  },
  
  input: {
    height: 50,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    width: 60, 
    marginHorizontal: 10 
  },
  button: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    
  },
  
  buttonTexto: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 16 
  },

  infoContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: 200,
    borderWidth: 1,
    borderColor: "#DDD",
  },


  textoResultado: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

    errorText:{
      color: 'red',
      marginBottom: 10,
      textAlign: 'center'
    },
    descricaoTexto: {
      fontSize: 14,
      color: '#555',
      textAlign: 'center'
    },

    infoText:{
      fontSize: 16,
      color: '#555',
      textAlign: 'center'
    },
     paginacaoContainer: { 
      flexDirection: "row", 
      marginTop: 20, 
      justifyContent: "center",
      alignItems: "center" 
      },




    
});
