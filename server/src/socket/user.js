const users = [];

const Users = {
    addUser: (user) => {
        return users.push(user);
    },
    addRooms: (socketId, rooms = []) => {
        const index = users.findIndex((user) => user.socketId === socketId);
        users[index].rooms = [...users[index].rooms, ...rooms];
    },
    removeUser: (socketId) => {
        const index = users.findIndex((user) => user.socketId === socketId);
        if (index !== -1) users.splice(index, 1)[0];
    },
    getUser: (id) => users.find((user) => user.id === id),
    getRooms: (id) => users.find((user) => user.socketId === id).rooms,
    getUsers: () => users,
};
module.exports = Users;
