import { View, Text } from "react-native";

export default function Detail({navigation} : {navigation: any}) {
    return (
        <View style={{paddingTop: "7%"}}>
            <Text onPress={()=>{navigation.navigate("Home")}}>Page Detail</Text>
        </View>
    )
}