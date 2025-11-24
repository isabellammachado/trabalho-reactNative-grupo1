import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";


export const styles = StyleSheet.create({
  container: {
     flex: 1,
      backgroundColor: colors.video
    },

  box: { 
    padding: 20 
},
  lbl: {
     color: colors.text, 
     marginTop: 15 
    },
  val: {
     fontSize: 18,
      fontWeight: 'bold', 
      color: colors.black
    },
     profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: colors.secondary,
        backgroundColor: colors.white,
    }


});