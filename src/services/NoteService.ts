import axios from "axios";

const api = axios.create({baseURL: "https://m66nqp6pe8.eu-west-1.awsapprunner.com", headers:{}});

class NoteService {
    async getNote() {
        const response = await api.get("/note");
        const noteList = await response;
        return noteList.data;
    }
}

export default new NoteService();