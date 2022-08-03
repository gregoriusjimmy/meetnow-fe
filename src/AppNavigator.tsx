import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EnableLocationScreen } from "./features/enable-location/EnableLocationScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='EnableLocation' component={EnableLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
