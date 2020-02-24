class User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(id: number, firstName: string, lastName: string, email: string){
        this.userId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

export default User;