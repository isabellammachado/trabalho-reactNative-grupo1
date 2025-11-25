import { NavigationContainer } from "@react-navigation/native";
import {StackNavigator}  from "./StackNavigator";



export const Routers = () => {
    return(
        <NavigationContainer> 
        <StackNavigator />
        </NavigationContainer>
    )
    
};