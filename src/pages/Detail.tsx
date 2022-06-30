import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";

export default function Detail({navigation, route} : {navigation: any, route: any}) {
    const [note, setNote] = useState({} as INote)

    const getNote = async () => {
        const response = await NoteService.getOneNote(route.params.id);
        setNote(response);
    };

    useEffect(() => {
        getNote();
    });

    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Home")}}>Page Detail</Text>
        </View>
    )
}