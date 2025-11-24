import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    paddingTop: 40,
  },

  title: {
    fontSize: width < 767 ? 24 : 40,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
     paddingTop: 40,
  },
 
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
    width: 60, 
    marginHorizontal: 10 
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    
  },
  
  buttonTexto: { 
    color: colors.white, 
    fontWeight: "bold", 
    fontSize: width < 767 ? 16 : 40,
  },

  infoContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: 200,
    borderWidth: 1,
    borderColor: colors.border,
  },


  textoResultado: {
    fontSize: width < 767 ? 19 : 40,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 10,
  },

    errorText:{
      color: colors.vermelhoAlerta,
      marginBottom: 10,
      textAlign: 'center'
    },
    descricaoTexto: {
      fontSize: 14,
      color: '#000',
      textAlign: 'center'
    },

    infoText:{
      fontSize: width < 767 ? 16 : 40,
      color: '#000',
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
