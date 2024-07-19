const app = require("./app");
const mongoose = require("mongoose");

//SERVER connection
mongoose
  .connect(process.env.LOCAL_DATABASE)
  .then(() => console.log("DB connect successful"));

app.listen(process.env.PORT, () =>
  console.log("server is running port " + process.env.PORT)
);
