import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";

export default function Home({navigation} : {navigation: any}) {
    const [noteList, setNoteList] = useState([] as INote[]);

    const getNoteList = async () => {
        const response = await NoteService.getNote();
        setNoteList(response);
    }

    useEffect(()=>{
        getNoteList();
    }, []);

    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Detail")}}>Page Home</Text>
            {
                noteList.length ? noteList.map((note:INote, idx:number) =>{
                    return (
                        <View key={idx}>
                            <Text>{note.title}</Text>
                            <Text>{note.text}</Text>
                        </View>
                    );
                }) : null
            }
        </View>
    )
}