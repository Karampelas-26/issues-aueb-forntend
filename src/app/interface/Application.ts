import {Comment} from "./Comment";

export interface Application {
    id: string,
    title: string,
    siteName: string,
    status: string,
    buildingName: string,
    priority: string,
    createDate: Date,
    assigneeTechId: string,
    comments: Comment[],
    description: string,
    issueType: string,
    dueDate: Date
}
