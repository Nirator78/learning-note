import { createContext } from "react";
import INote from "../interfaces/NoteInterface";

export const LoginContext = createContext(
    {} as {
        username: string;
        setUsername: React.Dispatch<React.SetStateAction<string>>;
    } 
);

export const NotesContext = createContext(
    {} as {
        allNotes: INote[];
        setAllNotes: React.Dispatch<React.SetStateAction<INote[]>>;
    }
);