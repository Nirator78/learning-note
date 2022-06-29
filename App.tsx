import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Home';
import MyNotes from './src/pages/MyNotes';
import Detail from './src/pages/Detail';
import Create from './src/pages/Create';
import Connexion from './src/pages/Connexion';
import Ionicons from "@expo/vector-icons/Ionicons"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>   
      <Tab.Screen options={{tabBarIcon: ({ color }) => (
        <Ionicons name="home" size={30} color={color}></Ionicons> 
        ),}} name="Home" component={Home}></Tab.Screen>
      <Tab.Screen options={{tabBarIcon: ({ color }) => (
        <Ionicons name="list-outline" size={30} color={color}></Ionicons> 
        ),}} name="Create" component={Create} />
      <Tab.Screen options={{tabBarIcon: ({ color }) => (
        <Ionicons name="list-outline" size={30} color={color}></Ionicons> 
        ),}} name="MyNotes" component={MyNotes} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Connexion' component={Connexion}></Stack.Screen>
        <Stack.Screen name='BottomTabNavigation' component={BottomTabNavigation}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
