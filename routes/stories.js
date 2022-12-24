const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc  Show Add Page
// @rout GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
	res.render("stories/add");
});

// @desc  Process Add Form
// @rout POST /stories
router.post("/", ensureAuth, async (req, res) => {
	try {
		console.log(req.user);
		req.body.user = req.user.id;
		await Story.create(req.body);
		res.redirect("/dashboard");
	} catch (error) {
		console.error(error);
		res.render("error/500");
	}
});

// @desc  Show All Stories
// @rout GET /stories
router.get("/", ensureAuth, async (req, res) => {
	try {
		const stories = await Story.find({ status: "public" })
			.populate("user")
			.sort({ createdAt: "desc" })
			.lean();
		res.render("stories/index", {
			stories,
		});
	} catch (error) {
		console.error(error);
		res.render("error/500");
	}
});

// @desc  Show Edit story Page
// @rout GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
	try {
		const story = await Story.findOne({ _id: req.params.id }).lean();

		if (!story) {
			return res.render("error/404");
		} else {
			if (story.user.toString() === req.user.id.toString()) {
				res.render("stories/edit", {
					story,
				});
			} else {
				res.redirect("/stories");
			}
		}
	} catch (error) {
		console.error(error);
		return res.render("error/500");
	}
});

// @desc  Update Story
// @rout PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
	try {
		let story = await Story.findOne({ _id: req.params.id }).lean();

		if (story) {
			if (story.user.toString() === req.user.id.toString()) {
				story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
					new: true,
					runValidators: true,
				});

				res.redirect("/dashboard");
			} else {
				res.redirect("/stories");
			}
		} else {
			return res.render("error/404");
		}
	} catch (error) {
		console.error(error);
		return res.render("error/500");
	}
});

// @desc  Delete Story
// @rout DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
	try {
		let story = await Story.findOne({ _id: req.params.id }).lean();

		if (story) {
			if (story.user.toString() === req.user.id.toString()) {
				story = await Story.findOneAndDelete({ _id: req.params.id });

				res.redirect("/dashboard");
			} else {
				res.redirect("/stories");
			}
		} else {
			return res.render("error/404");
		}
	} catch (error) {
		console.error(error);
		return res.render("error/500");
	}
});

// @desc  Show Single Story
// @rout GET /stories/:id
router.get("/:id", ensureAuth, async (req, res) => {
	try {
		let story = await Story.findOne({ _id: req.params.id })
			.populate("user")
			.lean();

		if (story) {
			res.render("stories/show", {
				story,
			});
		} else {
			return res.render("error/404");
		}
	} catch (error) {
		console.error(error);
		return res.render("error/404");
	}
});

// @desc  Show User Stories
// @rout GET /stories/user/:id
router.get("/user/:id", ensureAuth, async (req, res) => {
	try {
		const stories = await Story.find({
			user: req.params.id,
			status: "public",
		})
			.populate("user")
			.lean();

		if (stories) {
			console.log(req.user);
			res.render("stories/user", {
				stories,
				userObj: stories[0].user,
				loggedUser: req.user,
			});
		} else {
			return res.render("error/404");
		}
	} catch (error) {
		console.error(error);
		return res.render("error/404");
	}
});

module.exports = router;
