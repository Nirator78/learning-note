import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CardsDetails from "../components/CardsDetail";
import INote from "../interfaces/NoteInterface";

export default function Detail({route} : {route: any}) {
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