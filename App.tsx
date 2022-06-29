import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Detail from './src/pages/Detail';
import Home from './src/pages/Home';
import Ionicons from "@expo/vector-icons/Ionicons"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{tabBarIcon: ({ color }) => (
          <Ionicons name="home" size={30} color={color}></Ionicons> 
          ), title: "Fil d'actualités"}} name="Home" component={Home}></Tab.Screen>
        <Tab.Screen options={{tabBarIcon: ({ color }) => (
          <Ionicons name="list-outline" size={30} color={color}></Ionicons> 
          ),}} name="Detail" component={Detail} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
