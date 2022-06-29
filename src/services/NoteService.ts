import axios from "axios";
import INote from "../interfaces/NoteInterface";

const api = axios.create({baseURL: "https://m66nqp6pe8.eu-west-1.awsapprunner.com", headers:{}});

class NoteService {
    async getNote(): Promise<INote[]> {
        const response = await api.get("/note");
        const noteList = await response;
        return noteList.data;
    }
}

export default new NoteService();