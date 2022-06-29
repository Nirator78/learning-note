import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StorageService from "../services/StorageService";

export default function Connexion({navigation} : {navigation: any}) {
    const [username, setUsername] = useState("");

    const launchTask = async () => {
        if(username){
            StorageService.setStorage("username", username);
            navigation.navigate("BottomTabNavigation");
        }
    };

    const verifIfUserAlreadyConntected = async () => {
        if(await StorageService.getStorage("username"))
            navigation.navigate("BottomTabNavigation");
    };

    useEffect(()=>{
        verifIfUserAlreadyConntected();
    });

    return (
        <SafeAreaView>
            <Text>Page Connexion</Text>
            <TextInput
                style={{marginTop:'5%', justifyContent: "center", backgroundColor: "#ededed", borderColor: "gray",width: "90%",borderWidth: 1,borderRadius: 10,padding: 10}}
                onChangeText={setUsername}
                value={username}
            />
            <TouchableOpacity
                style={{marginTop:'5%', backgroundColor: "#BEAF40", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                onPress={launchTask}
            >
                <Text style={{fontSize: 12}}>Se connecter</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}