import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import CardsDetails from "../components/CardsDetail";
import INote from "../interfaces/NoteInterface";

export default function Detail({navigation, route} : {navigation: any, route: any}) {
    const [note, setNote] = useState({} as INote)

    useEffect(() => {
        setNote(route.params.note);
    }, []);

    return (
        <ScrollView>
            <CardsDetails note={note}/> 
        </ScrollView>
    )
}