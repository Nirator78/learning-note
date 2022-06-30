import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CardsDetails from "../components/CardsDetail";
import INote from "../interfaces/NoteInterface";

export default function Detail({navigation, route} : {navigation: any, route: any}) {
    const [note, setNote] = useState({} as INote)

    useEffect(() => {
        console.log(route.params.note)
        setNote(route.params.note);
    }, []);

    return (
        <View>
            <CardsDetails note={note}/> 
        </View>
    )
}