interface User {
    id:string;
    phone:string;
    friends:string[];
    firstName:string;
    lastName:string;
}

interface Child {
    id:string;
    parentId:string;
    firstName:string;
    lastName:string;
}

interface PlayDate {
    date: Date;
    ownerId:string;
    location:string;
    id:string;
}

interface Invitation {
    childId:string;
    confirmed:string;
    playDateId:string;
    id:string;
}