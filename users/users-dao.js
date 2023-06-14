let users = [];

export const findAllUsers = () => users;

export const findUserById = (uid) => {
    const index = users.findIndex((u) => u._id === uid);
    if (index !== -1) return users[index];
    return null;
}

export const findUserByUsername = (username) => {
    const index = users.findIndex((u) => u.username === username);
    if (index !== -1) return users[index];
    return null;
}

export const findUserByHandle = (handle) => {
    const index = users.findIndex((u) => u.handle === handle);
    if (index !== -1) return users[index];
    return null;
}

export const findUserByCredentials = (username, password) => {
    const index = users.findIndex((u) => u.username === username && u.password === password);
    if (index !== -1) return users[index];
    return null;
}

export const createUser = (user) => { user._id = (new Date()).getTime() + ''; users.push(user); return user;};

export const updateUser = (uid, user) => {
    console.log("user id to update is ",uid);

    const index = users.findIndex((u) => u._id === uid);
    users[index] = { ...users[index], ...user};
    console.log(users[index]);
    return users[index];
}

export const deleteUser = (uid) => {
    const index = users.findIndex((u) => u._id === uid);
    users.splice(index, 1);
    return {status: "ok"};
}

