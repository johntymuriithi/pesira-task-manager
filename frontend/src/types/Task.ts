
export interface Task {
    id: string,
    title: string,
    description: string,
    date: string,
    status: "Pending" | "Completed" | "In_progress"
}