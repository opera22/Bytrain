const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const { Pool } = require("pg");
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const dbQuery = (text, params) => pool.query(text, params);

// Creating express app object and setting some properties
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(express.static("./client/build"));

app.get("/", (req, res) => {
	console.log("You hit the main endpoint.");

	res.sendFile(path.join(__dirname + "/client/build/index.html"));
	// res.status(200).send(__dirname + "/../client/build/index.html");
});

app.get("/users/:id", async (req, res) => {
	try {
		const results = await dbQuery("SELECT * FROM users WHERE userid = $1", [
			req.params.id,
		]);
		res.status(200).json({
			status: "Success",
			results: results.rows.length,
			data: {
				users: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "There was an error. Try again later.",
		});
	}
});

app.get("/comments/:id", async (req, res) => {
	try {
		const results = await dbQuery(
			"SELECT * FROM comments INNER JOIN users ON comments.userid = users.userid WHERE videoid = $1 ORDER BY dateposted DESC",
			[req.params.id]
		);
		res.status(200).json({
			status: "Success",
			results: results.rows.length,
			data: {
				comments: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "There was an error. Try again later.",
		});
	}
});

app.post("/comments/:videoId", async (req, res) => {
	const commentId = randomBytes(4).toString("hex");

	try {
		const results = await dbQuery(
			"INSERT INTO comments (commentId, content, userId, videoId, dateposted) VALUES ($1, $2, $3, $4, now());",
			[commentId, req.body.content, req.body.userId, req.params.videoId]
		);
		res.status(200).json({
			status: "Success",
			results: results.rows.length,
			data: {
				comments: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "There was an error. Try again later.",
		});
	}
});

app.delete("/comments/:commentId", async (req, res) => {
	try {
		const results = await dbQuery("DELETE FROM comments WHERE commentid = $1", [
			req.params.commentId,
		]);
		res.status(200).json({
			status: "Successfully Deleted",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "There was an error. Try again later.",
		});
	}
});

app.get("/videos", async (req, res) => {
	const videoList = [];

	try {
		const results = await dbQuery("SELECT * FROM videos");
		res.status(200).json({
			status: "Success",
			results: results.rows.length,
			data: {
				videos: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "There was an error. Try again later.",
		});
	}
});

// use a JOIN sql statement to get the user's username

app.get("/videos/:id", async (req, res) => {
	try {
		const results = await dbQuery(
			"SELECT * FROM videos INNER JOIN users ON videos.userid = users.userid WHERE videos.videoid = $1",
			[req.params.id]
		);
		res.status(200).json({
			status: "Success",
			results: results.rows.length,
			data: {
				videos: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "There was an error. Try again later.",
		});
	}
});

// // This needs a READSTREAM to be sent from a server
// app.get("/videos/stream/:id", async (req, res) => {
// 	console.log(req.params);
// 	const range = req.headers.range;
// 	console.log(range);
// 	if (!range) {
// 		res.status(400).send("Requires range header");
// 	}

// 	// Must be instantiated before the scope is limited
// 	let videoPath = "";

// 	try {
// 		const results = await dbQuery("SELECT * FROM videos WHERE videoid = $1", [
// 			req.params.id,
// 		]);
// 		console.log("Query results in try-catch in id endpoint" + results.rows[0]);
// 		videoPath = results.rows[0].path;
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({
// 			status: "There was an error. Try again later.",
// 		});
// 	}

// 	const videoSize = fs.statSync(videoPath).size;
// 	const CHUNK_SIZE = 1024 * 1024; // 1mb
// 	const start = Number(range.replace(/\D/g, ""));
// 	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
// 	const contentLength = end - start + 1;

// 	const videoStream = fs.createReadStream(videoPath, {
// 		start,
// 		end,
// 		autoClose: true,
// 	});

// 	const headers = {
// 		"Content-Range": `bytes ${start} - ${end} / ${videoSize}`,
// 		"Accept-Ranges": "bytes",
// 		"Content-Length": contentLength,
// 		"Content-Type": "video/mp4",
// 	};

// 	res.writeHead(206, headers);
// 	videoStream.pipe(res);
// });

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Listening on ${port}...`);
});

// Thumbnails should be size 400x225, which is a 16:9 aspect ratio.
// They should also be in PNG format. Currently they are stored
// for free on IMGUR.

// Tools to grab random 4-byte strings
// 65139b89
// 65fe6875
// 8dc1980a
// 9f7f57ea
// const id = randomBytes(4).toString("hex");
// console.log(randomBytes(4).toString("hex"));
// console.log(randomBytes(4).toString("hex"));
