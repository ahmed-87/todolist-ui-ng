class Todo {
    id: Number;
    title: string;
    description: string;
    createdByUserId: Number;
    updatedByUserId: Number;
    completed: boolean;

    constructor(
        id: Number, 
        title: string, 
        description: string,
        createdByUserId: Number, 
        updatedByUserId: Number,
        completed: boolean
    ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdByUserId = createdByUserId;
        this.updatedByUserId = updatedByUserId;
        this.completed = completed;
    }
}

export default Todo;