import { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import Cards from "../components/Cards";
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
        <ScrollView>
            <Text onPress={()=>{navigation.navigate("Detail")}}>Page Home</Text>
            {
                noteList.length ? noteList.map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note}/>
                    );
                }) : null
            }
        </ScrollView>
    )
}