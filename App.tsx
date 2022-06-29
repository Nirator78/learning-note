import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Create from './src/pages/Create';
import Home from './src/pages/Home';
import Ionicons from "@expo/vector-icons/Ionicons"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{tabBarIcon: ({ color }) => (
          <Ionicons name="home" size={30} color={color}></Ionicons> 
          ),}} name="Home" component={Home}></Tab.Screen>
        <Tab.Screen options={{tabBarIcon: ({ color }) => (
          <Ionicons name="list-outline" size={30} color={color}></Ionicons> 
          ),}} name="Create" component={Create} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
