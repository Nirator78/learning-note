import { View, Text } from "react-native";

export default function Create({navigation} : {navigation: any}) {
    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Home")}}>Page Detail</Text>
        </View>
    )
}