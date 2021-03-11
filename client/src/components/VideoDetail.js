import React from "react";

const VideoDetail = (video) => {
	if (!video) return <div></div>;

	return (
		<div className="video-detail">
			<h2 className="video-title">{video.title}</h2>
			<div className="username">{video.user}</div>
			<div className="description">{video.desc}</div>
		</div>
	);
};

export default VideoDetail;
