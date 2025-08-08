if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const Listing = require("./models/listing.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const searchRouter = require("./routes/search.js");
const userRouter = require("./routes/user.js");
const dbUrl = process.env.ATLASDB_URL;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.redirect("/listings");
});
main()
  .then(() => {
    console.log("Connected succesfully!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {},
  touchAfter: 24 * 3600,
});
store.on("error", (err) => { // Fix: Add 'err' as a parameter
  console.log("ERROR in MONGO SESSION STORE", err);
});
const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // expires after one week;
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next(); //if failled to write next then the page will stcuk on this middleware!.
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "sudhir@gmail.com",
//     username: "sudhir03",
//   });

//   let registeredUser = await User.register(fakeUser, "hello");
//   res.send(registeredUser);
// });

app.use("/search", searchRouter);
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

//checks if any new route is searched.
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

//error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("listening to port 8080");
});

