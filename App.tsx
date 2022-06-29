import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {Home, MyNotes, Create, Connexion, Detail, Profile} from "./src/pages";
import Ionicons from "@expo/vector-icons/Ionicons"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{tabBarIcon: ({ color }) => (
        <Ionicons name="home" size={30} color={color}></Ionicons> 
        ),title:"Fil d'actualités"}} name="Home" component={Home}></Tab.Screen>
      <Tab.Screen options={{tabBarIcon: ({ color }) => (
        <Ionicons name="add-circle-outline" size={30} color={color}></Ionicons> 
        ),}} name="Create" component={Create} />
      <Tab.Screen options={{tabBarIcon: ({ color }) => (
        <Ionicons name="list-outline" size={30} color={color}></Ionicons> 
        ),}} name="MyNotes" component={MyNotes} />
      <Tab.Screen options={{tabBarIcon: ({ color }) => (
        <Ionicons name="person-circle-outline" size={30} color={color}></Ionicons> 
        ),}} name="Profile" component={Profile} />
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
