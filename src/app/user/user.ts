class User {
    userId: Number;
    firstName: String;
    lastName: String;
    email: String;

    constructor(id: number, firstName: string, lastName: string, email: string){
        this.userId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

export default User;