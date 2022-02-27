const mockUsers = require("./user.mock");
const db = require("../app/models");
const appConfig = require("../app.config");
const bcrypt = require("bcryptjs");
const User = db.user;

const fillUsers = () => {
  User.find().exec((err, users) => {
    if(err) {
      return;
    }
    if(!users.length) {
      for(let i=0;i<mockUsers.length;i++) {
        const user = mockUsers[i];
        user.password = bcrypt.hashSync(user.password, appConfig.BCRYPT_SALT)
      }
      User.insertMany(mockUsers).then(() => {
        console.log("Mock Users added successfully");
      }).catch(function(error){
        console.error("Error in inserting mock users ", error);
      });
    }
  });
}

module.exports = fillUsers;