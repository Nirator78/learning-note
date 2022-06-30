import { useContext, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import BasicButton from "../components/Button";
import StorageService from "../services/StorageService";
import { LoginContext } from "../utils/Context";

export default function Profile({navigation} : {navigation: any}) {
    const loginContext = useContext(LoginContext);
    const [username, setUserName] = useState("");

    const deconnect = async () => {
        StorageService.removeStorage("username");
        navigation.navigate("Connexion");
    };
    
    useEffect(()=>{
        setUserName(loginContext.username);
    }, []);

    return (
        <View style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', backgroundColor: "white", padding:30, margin: 20, borderRadius: 10}}>
            <Image
                source={{uri: 'http://via.placeholder.com/60x60'}}
                style={{width: 60, height: 60, margin:5, borderRadius: 40}}
            />
            <Text>{username}</Text>
            <BasicButton
                style={{marginTop:'5%', backgroundColor: "#57A0D2", borderRadius: 10, alignItems: 'center', paddingHorizontal: 32, paddingVertical: 12}}
                onPress={deconnect}
            >
            <Text style={{fontSize: 12}}>Se déconnecter</Text>
            </BasicButton>
        </View>
    )
}