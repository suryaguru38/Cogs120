const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

var http = require("http");
var path = require("path");
var handlebars = require("express3-handlebars");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
//app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, ".../public")));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.urlencoded());

// The below works but isn't a good practice because it's not scalable
app.use("/app.js", express.static(path.join(__dirname, "/app.js")));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

/*Environments 

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
*/

// Passport config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is Connected..."))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

/* development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
*/

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//const PORT = process.env.PORT || 5000;

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
