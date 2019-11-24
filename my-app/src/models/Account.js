export class Account {

    customWorkouts = [];
    favorites = [];
    avatar = 'http://placehold.it/240x240';
    bio = 'Tell the world about yourself';

    constructor(id, userName, password, avatar, bio, friends, favorites) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.avatar = avatar;
        this.bio = bio;
        this.friends = friends;
        this.favorites = favorites;
    }
}

export default Account;