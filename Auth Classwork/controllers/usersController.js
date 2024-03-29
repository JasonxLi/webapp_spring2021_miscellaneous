"use strict";

const passport = require("passport");

const User = require("../models/user"),
    getUserParams = body => {
        return {
            name: {
                first: body.first,
                last: body.last
            },
            email: body.email,
            password: body.password,
            zipCode: body.zipCode
        };
    };


module.exports = {
    login: (req, res) => {
        res.render("users/login");
    },

    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next()
            })
            .catch(error => {
                console.log(`Error feting user data: ${error.message}`);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("users/index");
    },
    new: (req, res) => {
        res.render("users/new");
    },
    create: (req, res, next) => {
        if (req.skip) return next();

        let userParams = getUserParams(req.body);
        let newUser = new User(userParams);

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", "User account successfully created!");
                res.locals.redirect = "/users";
                next();
            }
            else {
                req.flash("error", `Failed to create user account: ${error.message}`);
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },
    validate: (req, res, next) => {
        req.sanitize("email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("email", "Email is invalid").isEmail();
        req.check("zipCode", "Zip Code is invalid").notEmpty().isInt().isLength({
            min: 5,
            max: 5
        });
        req.check("password", "Password cannot be empty").notEmpty();

        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/users/new";
                next();
            }
            else{
                next();
            }
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Login failed! Check your email or password",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You are logged out");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next()
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    showView: (req, res) => {
        res.render("users/show");
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("./users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    update: (req, res, next) => {
        if(req.skip) return next();
        let userId = req.params.id;
        let updatedUser = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        };
        User.findByIdAndUpdate(userId, updatedUser)
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/users/${user._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    }
}
