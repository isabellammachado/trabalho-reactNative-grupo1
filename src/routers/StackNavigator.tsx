import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { RootStackParamList } from "../@types/navigation";
import { AuthContext } from "../hooks/AuthContext";
import LoginScreen from "../pages/Login/Index";
import CadastroScreen from "../pages/Cadastro/Index";
import   {TabsRouters } from "./TabsRouters";
import CriarPedidoScreen from "../pages/Pedido/Index";


const Stack = createNativeStackNavigator<RootStackParamList>();

export const  StackNavigator = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
      <Stack.Navigator
      id={undefined}
       screenOptions={{ headerShown: false }}>
        {!signed ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="AppTabs" component={ TabsRouters } />
            <Stack.Screen name="CriarPedido" component={CriarPedidoScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
  );
}