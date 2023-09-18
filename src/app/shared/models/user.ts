
export class User {

    public userId: number;
    public userName: string;
    public email: string;
    public mobileNumber: string;
    public password: string;
    public created: Date;
    public userRole: string;
    public userStatus: string;
    public emailVerified: string;
    public mobileVerified: string;
    public firstName: string;
    public lastName: string;
    public pendingCashback:number;
    public approvedCashback:number;


    // only for ui for checkbox selection
    public selected: boolean;

    //for multiselect

    public selectedUserRoles = [];
    public selectedUserStatus = [];
}