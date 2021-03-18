import React, { useState, useEffect, useRef } from "react";
import RecSidebar from "./RecSidebar";
import VideoViewer from "./VideoViewer";
import VideoDetail from "./VideoDetail";
import Comments from "./Comments";
import NavBar from "./NavBar";
import axios from "axios";
import "./styles/App.css";
import { Transition } from "semantic-ui-react";

const App = () => {
	const [videoId, setVideoId] = useState("b2ce3ad3");
	const [videoTitle, setVideoTitle] = useState("");
	const [videoDescription, setVideoDescription] = useState("");
	const [videoUserId, setVideoUserId] = useState("");
	const [videoUsername, setVideoUsername] = useState("");
	const [videoDate, setVideoDate] = useState("");
	// height should be 0.576 times the width
	const [videoWidth, setVideoWidth] = useState("650");
	const [videoHeight, setVideoHeight] = useState("375");
	const [comments, setComments] = useState([]);
	const [isSidebarVisible, setIsSidebarVisible] = useState("");
	const [isDropdownActive, setIsDropdownActive] = useState(false);
	const [commentOptionsVisible, setCommentOptionsVisible] = useState("none");
	const [commentText, setCommentText] = useState("");

	const getVideo = async () => {
		const response = await axios.get(`http://localhost:4000/videos/${videoId}`);
		setVideoTitle(response.data.data.videos[0].title);
		setVideoDescription(response.data.data.videos[0].description);
		setVideoUserId(response.data.data.videos[0].userid);
		setVideoUsername(response.data.data.videos[0].username);
		setVideoDate(response.data.data.videos[0].dateposted);
	};

	const getComments = async () => {
		const response = await axios.get(
			`http://localhost:4000/comments/${videoId}`
		);
		setComments(response.data.data.comments);
	};

	const handleCommentDelete = async (commentId) => {
		const response = await axios.delete(
			`http://localhost:4000/comments/${commentId}`
		);

		getComments();
	};

	const handleMenuButtonClick = (e) => {
		setIsSidebarVisible(isSidebarVisible ? "" : "visible");
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post(
			`http://localhost:4000/comments/${videoId}`,
			{
				content: commentText,
				userId: "45fe9975",
			}
		);
		if (response.statusText === "OK") {
			setCommentText("");
			setCommentOptionsVisible("none");
		} else {
			alert("There was an error posting your comment. Please try again later.");
		}
		getComments();
	};

	useEffect(() => {
		getVideo();
		getComments();
		setIsDropdownActive(false);
		setCommentOptionsVisible("none");
		setCommentText("");
	}, [videoId]);

	return (
		<div className="app">
			<Transition
				visible={isSidebarVisible === "" ? false : true}
				animation="fade right"
				duration={300}
				style={{ position: "sticky" }}
			>
				<div
					className={`ui sidebar inverted vertical menu ${isSidebarVisible}`}
					id="main-sidebar"
					style={{ left: "0", right: "auto" }}
				>
					<i
						className="bars icon large"
						id="menu-button"
						onClick={handleMenuButtonClick}
					/>
					<a href="/" className="item">
						Account creation coming soon!
					</a>
					<a href="/" className="item">
						...
					</a>
					<a href="/" className="item">
						...
					</a>
				</div>
			</Transition>
			<div className="navbar-container">
				<NavBar handleMenuButtonClick={handleMenuButtonClick} />
			</div>
			<div className="main">
				<div
					className="video-container"
					style={{ maxWidth: `${videoWidth}px` }}
				>
					<VideoViewer
						videoId={videoId}
						width={videoWidth}
						height={videoHeight}
					/>
					<VideoDetail
						videoTitle={videoTitle}
						videoDescription={videoDescription}
						username={videoUsername}
						videoDate={videoDate}
						isActive={isDropdownActive}
						setIsActive={setIsDropdownActive}
					/>
					<Comments
						comments={comments}
						optionsVisible={commentOptionsVisible}
						setOptionsVisible={setCommentOptionsVisible}
						commentText={commentText}
						setCommentText={setCommentText}
						handleCommentSubmit={handleCommentSubmit}
						handleCommentDelete={handleCommentDelete}
					/>
				</div>
				<div className="rec-sidebar-container">
					<RecSidebar currentVideoId={videoId} setVideoId={setVideoId} />
				</div>
			</div>
		</div>
	);
};

export default App;
