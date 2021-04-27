const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    subscribersRoutes = require("./subscriberRoutes"),
    courseRoutes = require("./courseRoutes"),
    homeRoutes = require("./homeRoutes"),
    errorRoutes = require("./errorRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/subscribers", subscribersRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;