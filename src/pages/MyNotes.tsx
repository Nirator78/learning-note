import { useEffect, useState } from "react";
import { Text, ScrollView, TextInput, ColorPropType } from "react-native";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import StorageService from "../services/StorageService";

export default function MyNotes({navigation} : {navigation: any}) {
    const [noteList, setNoteList] = useState([] as INote[]);
    const [displayNoteList, setDisplayNoteList] = useState([] as INote[]);
    const [searchedTag, setSearchedTag] = useState("" as string);

    const getMyNoteList = async () => {
        const response = await NoteService.getNote();
        const username = await StorageService.getStorage("username");
        const listFiltered = response.filter(note => note.author === username);
        setNoteList(listFiltered);
        setDisplayNoteList(listFiltered);
    };

    const filtreNoteListByTag = async (text: string) => {
        setSearchedTag(text);
        // Si le texte est vide on remet la liste entière
        if(!text){
            setDisplayNoteList(noteList);
        }else{ 
            const listFilteredByTag = noteList.filter(note => note.tags.includes(text));
            setDisplayNoteList(listFilteredByTag);
        }
    };

    useEffect(()=>{
        getMyNoteList();
    }, []);

    return (
        <ScrollView>
            <TextInput
                style={{marginTop:'5%', backgroundColor: "#ededed", borderColor: "gray",width: "90%",borderWidth: 1,borderRadius: 10,padding: 10}}
                onChangeText={(text) => filtreNoteListByTag(text)}
                value={searchedTag}
                placeholder="Recherche par tags"
            />
            {
                displayNoteList.length ? displayNoteList.map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note}/>
                    );
                }) : null
            }
        </ScrollView>
    )
}