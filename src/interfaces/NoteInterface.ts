export default interface INote {
    _id: string;
    title: string;
    text: string;
    author: string;
    anonym: boolean;
    tags: string[];
    creation_date: Date;
    __v: number;
};