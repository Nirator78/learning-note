import { View, Text } from "react-native";

export default function MyNotes({navigation} : {navigation: any}) {
    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Connexion")}}>Page MyNotes</Text>
        </View>
    )
}