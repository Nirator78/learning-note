import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import StorageService from "../services/StorageService";

export default function MyNotes() {
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
            <View style={{ flexGrow:1, display: 'flex', alignItems:'center', justifyContent:'center', backgroundColor: "white", padding:20, margin:10, borderRadius: 10 }}>
                <Text style={{fontWeight: "bold", fontSize: 15}}>Rechercher c'est trouver</Text>
                <TextInput
                    style={{marginTop:'5%', borderColor: "gray",width: "90%",borderWidth: 0.5,borderRadius: 10,padding: 10}}
                    onChangeText={(text) => filtreNoteListByTag(text)}
                    value={searchedTag}
                    placeholder="Recherche par tags"
                    autoCapitalize="none"
                />
            </View>

            {
                displayNoteList.length ? displayNoteList.map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note} getList={getMyNoteList} />
                    );
                }) : null
            }
        </ScrollView>
    )
}