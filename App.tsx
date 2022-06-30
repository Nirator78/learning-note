import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, MyNotes, Connexion, Detail, Profile, Formulaire } from "./src/pages";
import Ionicons from "@expo/vector-icons/Ionicons"
import "./ignoreWarning";
import { LoginContext, NotesContext } from './src/utils/Context';
import { useState } from 'react';
import INote from './src/interfaces/NoteInterface';

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
        ),}} name="Create" component={Formulaire} />
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
  const [username, setUsername] = useState("");
  const [allNotes, setAllNotes] = useState([] as INote[]);

  return (
    <LoginContext.Provider value={{username, setUsername}}>
      <NotesContext.Provider value={{allNotes, setAllNotes}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Connexion' component={Connexion}></Stack.Screen>
            <Stack.Group screenOptions={{ headerShown: true, presentation: 'modal' }}>
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen name="Formulaire" component={Formulaire} />
            </Stack.Group>
            <Stack.Screen name='BottomTabNavigation' component={BottomTabNavigation}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NotesContext.Provider>
    </LoginContext.Provider>
  );
};
