import { useEffect, useState } from "react";
import { Text, ScrollView, View } from "react-native";
import Cards from "../components/Cards";
import INote from "../interfaces/NoteInterface";
import NoteService from "../services/NoteService";
import StorageService from "../services/StorageService";

export default function Home() {
    const [noteList, setNoteList] = useState([] as INote[]);
    const [username, setUserName] = useState("");

    const setDynamicTitle = async () => {
        const username = await StorageService.getStorage("username");
        setUserName(username);
    };

    const getNoteList = async () => {
        const response = await NoteService.getNote();
        setNoteList(response);
    }

    useEffect(()=>{
        getNoteList();
        setDynamicTitle();
    }, []);

    return (
        <ScrollView>
            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", padding: 20, margin: 15}}>
                <Text style={{fontSize: 17}}> Bienvenue </Text>
                <Text style={{fontWeight: "bold"}}>{username}</Text>
            </View>
            {
                noteList.length ? noteList.map((note:INote, idx:number) =>{
                    return (
                        <Cards key={idx} note={note} getList={getNoteList}/>
                    );
                }) : null
            }
        </ScrollView>
    )
}