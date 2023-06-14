import * as usersDao from "./users-dao.js";
var currentUserVar;

const AuthController = (app) => {
   
    const register = (req, res) => {
        const handle = req.body.handle;
        const user = usersDao.findUserByHandle(handle); // user's handle is unique
        if (user) { // if user exists already
            res.sendStatus(409);
            return;
        }
        const newUser = usersDao.createUser(req.body); // new user's info is in
        currentUserVar = newUser;
        res.json(newUser);
    };
    
    const login = (req, res) => { // given username and password
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
            currentUserVar = user;
            res.json(user); // display the user
        } else {
            res.sendStatus(404);
        }
    };
    // if a user has already logged in, we can retrieve the current user by using the profile
    // API as shown below
    const profile = (req, res) => {
      const currentUser = currentUserVar;
      if (!currentUser) {
          res.sendStatus(404);
          return;
      }
      res.json(currentUser);
  };
    // logout users by destroying the session
    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = (req, res) => {
      const currentUser = currentUserVar;
      const user = req.body;
      console.log("inside update currentUser ", currentUser);
      if (!currentUser) {
          res.sendStatus(404);
      } else {
          const updatedUser = usersDao.updateUser(currentUser._id, user);
          currentUserVar = updatedUser;
          res.json(updatedUser);
      }
  };

    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",          update);
}
export default AuthController;