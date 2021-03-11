const express = require("express");
const { randomBytes } = require("crypto");
// const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
// this next line looks for the index.js file in the db folder
const db = require("./db");

// Thumbnails should be size 400x225, which is a 16:9 aspect ratio.
// They should also be in PNG format. Currently they are stored
// for free on IMGUR.

// Creating express app object and setting some properties
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	console.log("hi");

	// res.sendFile("/Users/andrewburns/Desktop/Bytrain/client/build/index.html");
	res.status(200).send("HI. DID YOU MEAN TO CALL ME? I HAVE NOTHING FOR YOU.");
});

app.get("/videos", async (req, res) => {
	const videoList = [];
	res.send(videoList); ///////////////////////////////////////

	// const getVideoList = async () => {
	// 	const snapshot = await videoDetailsRef.get();

	// 	snapshot.forEach((doc) => {
	// 		videoList.push(doc.data());
	// 	});
	// };

	// await getVideoList();

	// res.status(200).send(videoList);
});

// This needs a READSTREAM to be sent from a server
app.get("/videos/:id", async (req, res) => {
	console.log(req.params);
	const range = req.headers.range;
	console.log(range);
	if (!range) {
		res.status(400).send("Requires range header");
	}

	const getVideoPath = async () => {
		const videoRef = videoDetailsRef.doc(req.params.id);
		const doc = await videoRef.get();
		return doc.data().path;
	};

	const videoPath = await getVideoPath();
	const videoSize = fs.statSync(videoPath).size;
	const CHUNK_SIZE = 1024 * 1024; // 1mb
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
	const contentLength = end - start + 1;

	const videoStream = fs.createReadStream(videoPath, {
		start,
		end,
		autoClose: true,
	});

	const headers = {
		"Content-Range": `bytes ${start} - ${end} / ${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	};

	res.writeHead(206, headers);
	videoStream.pipe(res);
});

const port = process.env.SERVERPORT;

app.listen(port, () => {
	console.log(`Listening on ${port}...`);
});

// const getData = async () => {
// 	const snapshot = await picsRef.get();
// 	snapshot.forEach((doc) => {
// 		console.log(doc.data());
// 	});
// };

// getData();

// Tools to grab random 4-byte strings
// 65139b89
// 65fe6875
// 8dc1980a
// 9f7f57ea
// const id = randomBytes(4).toString("hex");
// console.log(randomBytes(4).toString("hex"));
// console.log(randomBytes(4).toString("hex"));
