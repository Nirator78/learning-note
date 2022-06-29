import { View, Text } from "react-native";

export default function Detail({navigation, route} : {navigation: any, route: any}) {
    console.log("detail", route.params.id);
    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Home")}}>Page Detail</Text>
        </View>
    )
}