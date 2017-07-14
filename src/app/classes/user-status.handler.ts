export class UserStatusHandler {

    private onlineUsers: any = [];    
    private offlineUsers: any = [];
    private onlineUsersIds: any = [];
    private offlineUsersIds: any = [];

    constructor(onlineUsers,offlineUsers) {
        let j: number = 0,k: number = 0;
        for(j = 0;j < onlineUsers.length;j++) {
            this.onlineUsersIds.push(onlineUsers[j]._id);
            this.onlineUsers.push(onlineUsers[j]);
        }
        for(k = 0;k < offlineUsers.length;k++) {
            this.offlineUsersIds.push(offlineUsers[k]._id);
            this.offlineUsers.push(offlineUsers[k]);
        }
    }

    public userCameOnline(user: any) {
        this.addUserToOnlineList(user); //add only if not already present
        this.removeUserFromOfflineList(user); //remove only if present
    }

    public userWentOffline(user: any) {
        this.removeUserFromOnlineList(user); //remove only if present
        this.addUserToOfflineList(user); //add only if not already present
    }

    public getOnlineUsers() {
        return this.onlineUsers;
    }

    public getOfflineUsers() {
        return this.offlineUsers;
    }

    private addUserToOnlineList(user: any) {
        let i = this.onlineUsersIds.indexOf(user._id);
        if(i === -1) {
            this.onlineUsers.push(user);
            this.onlineUsersIds.push(user._id);
        }
    }

    private removeUserFromOfflineList(user: any) {
        let i = this.offlineUsersIds.indexOf(user._id);
        if(i > -1) {
            this.offlineUsers.splice(i,1);
            this.offlineUsersIds.splice(i,1);
        }
    }

    private removeUserFromOnlineList(user: any) {
        let i = this.onlineUsersIds.indexOf(user._id);
        if(i > -1) {
            this.onlineUsers.splice(i,1);
            this.onlineUsersIds.splice(i,1);
        }
    }

    private addUserToOfflineList(user: any) {
        let i = this.offlineUsersIds.indexOf(user._id);
        if(i === -1) {
            this.offlineUsers.push(user);
            this.offlineUsersIds.push(user._id);
        }
    }

    public getOnlineUsersIds() {
        return this.onlineUsersIds;
    }

    public getOfflineUsersIds() {
        return this.offlineUsersIds;
    }

    public getOnlineUsersCount() {
        return this.onlineUsers.length;
    }

    public getOfflineUsersCount() {
        return this.offlineUsers.length;
    }

}