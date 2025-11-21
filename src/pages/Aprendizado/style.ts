import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 16 
  },

  videoContainer: {
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

  textoStatus: {
     fontSize: 16,
      color: "#007AFF" 
    },
 textoResultado: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
 TextoMock: { 
    fontSize: 12, 
    color: "#888",
     textAlign: "center"
     },

  videoPlayer: {
     width: "100%",
      height: 180 
    }, 
});
