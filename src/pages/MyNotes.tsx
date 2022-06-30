import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import StorageService from "../services/StorageService";
import { NotesContext } from "../utils/Context";

export default function MyNotes() {
    const allNotesContext = useContext(NotesContext);

    const [userNotesList, setUserNotesList] = useState([] as INote[]);
    const [displayNoteList, setDisplayNoteList] = useState([] as INote[]);
    const [searchedTag, setSearchedTag] = useState("" as string);    
    const [refreshing, setRefreshing] = useState(false);

    const getMyNoteList = async () => {
        const username = await StorageService.getStorage("username");
        const response = await NoteService.getNote();
        allNotesContext.setAllNotes(response.reverse());
        const listFiltered = response.filter(note => note.author === username);
        setUserNotesList(listFiltered);
        setDisplayNoteList(listFiltered);
    };

    const filtreNoteListByTag = async (text: string) => {
        setSearchedTag(text);
        // Si le texte est vide on remet la liste entière
        if(!text){
            setDisplayNoteList(userNotesList);
        }else{ 
            const filterList = (note: INote) => {
                return note.tags.some(tag => tag.toLowerCase() === text.toLowerCase()) || note.author?.toLowerCase() === text.toLowerCase();
            }; 

            const listFilteredByTag = allNotesContext.allNotes.filter(filterList);
            setDisplayNoteList(listFilteredByTag);
        }
    };
    
    useEffect(()=>{
        getMyNoteList();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getMyNoteList()
        setRefreshing(false);
    }, []);

    return (
        <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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