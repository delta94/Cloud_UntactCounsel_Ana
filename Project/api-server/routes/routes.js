const path = require("path");
const indexRouter = require("./public/index");

/* public */
const loginRouter = require("./public/login");
const signupRouter = require("./public/signup");

/* private */
// const chatRouter = require("./websocket/chat");
const chatRouter = require("./chat/chat");

/* manage */
const adminRouter = require("./admin/admin");
const managerRouter = require("./manager/manager");

/* router  */
module.exports = (app) => {
  /* public */
  app.use("/api", indexRouter); // main

  app.use("/api/login", loginRouter);
  app.use("/api/signup", signupRouter);

  /* chat */
  app.use("/api/chat", chatRouter);

  /* manage */
  app.use("/api/admin", adminRouter);
  app.use("/api/manager", managerRouter);

  // frontend zone
  app.use("*", (req, res, next) => {
    res.sendFile(
      path.join(__dirname, "..", "..", "frontend", "build", "index.html")
    );
  });

  // error handler
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    console.log(err);
    // render the error page

    res.send(err);
  });
};
