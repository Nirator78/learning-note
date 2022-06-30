import { useCallback, useEffect, useState } from "react";
import { Text, ScrollView, View, TextInput, RefreshControl } from "react-native";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import StorageService from "../services/StorageService";

export default function Home() {
    const [noteList, setNoteList] = useState([] as INote[]);
    const [displayNoteList, setDisplayNoteList] = useState([] as INote[]);
    const [username, setUserName] = useState("");
    const [searchedTag, setSearchedTag] = useState("" as string);
    const [refreshing, setRefreshing] = useState(false);

    const setDynamicTitle = async () => {
        const username = await StorageService.getStorage("username");
        setUserName(username);
    };

    const getNoteList = async () => {
        const response = await NoteService.getNote();
        setNoteList(response.reverse());
        setDisplayNoteList(response);
    };

    const filtreNoteListByTag = async (text: string) => {
        setSearchedTag(text);
        // Si le texte est vide on remet la liste entière
        if(!text){
            setDisplayNoteList(noteList);
        }else{
            const filterList = (note: INote) => {
                return note.tags.some(tag => tag.toLowerCase() === text.toLowerCase()) || note.author?.toLowerCase() === text.toLowerCase();
            }; 

            const listFilteredByTag = noteList.filter(filterList);
            setDisplayNoteList(listFilteredByTag);
        }
    };

    useEffect(()=>{
        getNoteList();
        setDynamicTitle();
    }, []);

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await getNoteList()
      setRefreshing(false);
    }, []);

    return (
        <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 20, margin: 10}}>
                <Text style={{fontSize: 17}}> Bienvenue </Text>
                <Text style={{fontWeight: "bold"}}>{username}</Text>
            </View>
            <View style={{ flexGrow:1, display: 'flex', alignItems:'center', justifyContent:'center', backgroundColor: "white", padding:20, margin:10, borderRadius: 10 }}>
                <Text style={{fontWeight: "bold", fontSize: 15}}>Rechercher c'est trouver</Text>
                <TextInput
                    style={{marginTop:'5%', borderColor: "gray",width: "90%",borderWidth: 0.5,borderRadius: 10,padding: 10,}}
                    onChangeText={(text) => filtreNoteListByTag(text)}
                    value={searchedTag}
                    placeholder="Recherche par tags"
                    autoCapitalize="none"
                />
            </View>
            {
                displayNoteList.length ? displayNoteList.map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note} getList={getNoteList}/>
                    );
                }) : null
            }
        </ScrollView>
    )
}