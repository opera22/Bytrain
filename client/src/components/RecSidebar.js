import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/RecSidebar.css";

const RecSidebar = ({ currentVideo, setVideo }) => {
	const [videoList, setVideoList] = useState([]);

	useEffect(() => {
		const getVideoList = async () => {
			const response = await axios.get("http://localhost:4000/videos");
			setVideoList(response.data.data.videos);
		};
		getVideoList();
	}, []);

	if (videoList.length === 0) {
		return <div>Video List is empty...</div>;
	}

	const renderedVideos = videoList.map((video) => {
		return (
			<div
				className="video-list-item item"
				key={video.videoid}
				onClick={() => setVideo(video.videoid)}
			>
				<img src={video.thumbnail} alt={video.title} className="image" />
				<div className="content">
					<div className="header" id="videoItemHeader">
						{video.title}
					</div>
					<div className="description" id="videoItemDescription">
						{video.description}
					</div>
				</div>
			</div>
		);
	});

	return <div className="ui items">{renderedVideos}</div>;
};

export default RecSidebar;
