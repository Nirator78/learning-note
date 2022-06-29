import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NoteService from "../services/NoteService";

export default function Home({navigation} : {navigation: any}) {
    const [noteList, setNoteList] = useState([] as any);

    const getNoteList = async () => {
        const response = await NoteService.getNote();
        console.log(response)
        setNoteList(response);
    }

    useEffect(()=>{
        getNoteList();
    }, []);

    return (
        <View>
            <Text onPress={()=>{navigation.navigate("Detail")}}>Page Home</Text>
            {
                noteList.length ? noteList.map((note:any, idx:number) =>{
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