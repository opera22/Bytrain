import React, { useState, useEffect } from "react";
import VideoDetail from "./VideoDetail";

const VideoViewer = ({ videoId, width, height }) => {
	const baseVideoURL = "http://localhost:4000/videos/stream/";
	useEffect(() => {}, []);

	if (!videoId) return <div></div>;

	return (
		<div className="video-viewer">
			{/* <div className="ui segment">
				<p></p>
				<div className="ui active dimmer">
					<div className="ui loader"></div>
				</div>
			</div> */}
			<video
				key={videoId}
				width={width}
				height={height}
				style={{ backgroundColor: "black" }}
				controls
			>
				<source src={baseVideoURL + videoId} type="video/mp4" />
			</video>
		</div>
	);
};

export default VideoViewer;
