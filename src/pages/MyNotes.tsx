import { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import StorageService from "../services/StorageService";

export default function MyNotes({navigation} : {navigation: any}) {
    const [noteList, setNoteList] = useState([] as INote[]);

    const getMyNoteList = async () => {
        const response = await NoteService.getNote();
        const username = await StorageService.getStorage("username");
        const listFiltered = response.filter(note => note.author === username);
        setNoteList(listFiltered);
    }

    useEffect(()=>{
        getMyNoteList();
    }, []);

    return (
        <ScrollView>
            <Text onPress={()=>{navigation.navigate("Connexion")}}>Page Home</Text>
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