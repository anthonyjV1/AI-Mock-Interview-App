import { FieldValue, Timestamp } from "firebase/firestore";

export interface User {
    id: string;
    name: string;
    email: string;
    imageUrL: string;
    createdAt: Timestamp | FieldValue;
    updateAt: Timestamp | FieldValue;
}

export interface Interview {
    id: string;
    position: string;
    description: string;
    experience: number;
    userId: string;
    techStack: string;
    questions: { question: string; answer: string }[];
    createAt: Timestamp;
    updateAt: Timestamp;
}
