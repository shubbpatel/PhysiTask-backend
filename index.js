const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const signuproute = require("./routes/signupRoute");
const authentication = require("./controllers/authentication");
const Project = require("./models/projectSubmission");
// const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const googleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const passport = require("passport");
const path = require("path");
// const MongoStore = require('connect-mongo');
const User = require("./models/signModel");
const authenticatedUser = require("./routes/user");
const cookieParser = require('cookie-parser');
// const projectRoutes = require("./routes/projects");
const bidRoutes = require("./routes/bids");
require('dotenv').config({ path: '.env.local' });


const ObjectId = mongoose.Types.ObjectId;

const { ensureAuthenticated } = require("./middleware/middleware");
const corsOptions = {
  origin: "https://physitask-2391d.web.app/",
};

const app = express();
app.use(
  cors({
    origin: "https://physitask-2391d.web.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cors(corsOptions));

app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ url: 'mongodb://localhost:27017/physitask' }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use("/project", projectRoutes);
  app.use("/bid", bidRoutes);


  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  });
  // .connect("mongodb://localhost:27017/physitask", {
  
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb is up");
  })
  .catch((err) => {
    console.log(err);
  });
  
  // app.get('/signup', (req, res) => {
    // res.send("<h1>shubham</h1> <input name='input'></input>")
    // })
    passport.use(
      new googleStrategy(
        {
          clientID:process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
          
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if user already exists
            let user = await User.findOne({ googleId: profile.id });
            // console.log(profile);
            if (user) {
              console.log("user exists");
              return done(null, user);
            } else {
              // Create new user
              const newUser = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                profileImage: profile.photos[0].value, // add this line to get profile image

              });
              user = await newUser.save();
              return done(null, user);
            }
          } catch (err) {
            console.error(err);
            return done(err, null);
          }
    
          // const newUser = User.findOne({googleId:profile.id});
          // if(newUser){
          //   res.json({status:"user exists"})
          // }else{
          //   const saveUser = new User({
          //       googleId: profile.id,
          //       displayName: profile.displayName,
          //       email: profile.emails[0].value,
          //   })
          //   saveUser.save();
          // }
        }
      )
    );
    app.post("/", (req, res) => {
      console.log(req.body);
  res.send(req.body);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = JSON.stringify(req.user);
    // const redirectUrl = `http://localhost:3000/projects?displayName=${user.displayName}&id=${user.id}&email=${user.email}`;
    res.cookie('user', user);
    const redirectUrl = `https://physitask-2391d.web.app?=${user}`;
    // const redirectUrl = `/login/success`;
    res.redirect(redirectUrl);
    // res.send(user);
  }
);

app.get('/login/success', (req, res)=> {
  const user = JSON.stringify(req.user);
// if(user){
//   res.status(200).json({
//     success: true,
//     message:'successfull',
//     user:user
//   })
// }
res.json(user)
// console.log(user);
})

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};
app.get("/logout", (req, res) => {
  req.logout(()=>{
    res.redirect('http://localhost:3000');
  });

});
app.get("/dashboard", requireAuth, (req, res) => {
  res.send(`Welcome ${req.user.displayName}!`);
});

app.post("/projectsubmission", async (req, res) => {
  const project = new Project(req.body);

  try {
    const projectDetails = Project.find({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      deadline: req.body.deadline,
      category: req.body.category,
      userId: req.body.userId,
      location: req.body.location, // Add location
      coordinates: req.body.coordinates, // Add coordinates
    });

    if (projectDetails) {
      project.save();
      console.log("Project Submitted");
    } else {
      console.log("data not filled");
      res.status(400).json({ message: "Data not filled" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });

  }
  console.log(req.body);
});


app.get("/project", async (req, res) => {
  // const project = new Project(req.body);

  try {
    const projectDetails = await Project.find().sort({ _id: -1 });
    res.json(projectDetails);
  } catch (error) {
    console.log(error);
  }
});
app.get("/biddersprofile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Project.find({userId:userId});
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.put("/projectupdate/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Failed to update project" });
  }
});

app.delete("/projectdelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }else{

      await project.deleteOne();
      // res.redirect('http://localhost:3000/profile')
      res.json({ message: "Project deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});




app.get("/project/:id", async (req, res) => {

  try {
    const id = req.params.id;
    const projectDetails = await Project.findById(id);
    res.json(projectDetails);
  } catch (error) {
    console.log(error);
  }
});



app.listen(process.env.PORT, () => {
  console.log("server is running");
});
