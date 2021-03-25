import React, { useState, useEffect } from "react";
import VideoDetail from "./VideoDetail";

const VideoViewer = ({ videoId, width, height }) => {
	const baseVideoURL = "https://bytrain.herokuapp.com/videos/stream/";
	useEffect(() => {}, []);

	if (!videoId) return <div></div>;

	return (
		<div
			className="video-viewer"
			style={{
				minWidth: width,
				minHeight: height,
				border: "1px solid red",
				flexBasis: "auto",
				flex: "0 0 auto",
			}}
		>
			{/* <div className="ui segment">
				<p></p>
				<div className="ui active dimmer">
					<div className="ui loader"></div>
				</div>
			</div> */}
			{/* <video
				key={videoId}
				width={width}
				height={height}
				style={{ backgroundColor: "black" }}
				controls
			>
				<source src={baseVideoURL + videoId} type="video/mp4" />
			</video> */}
			<h3>
				You are viewing a version without streaming functionality. This is to
				keep the bandwidth down. :)
				<br></br>.<br></br>.<br></br>.<br></br>.<br></br>.<br></br>.<br></br>.
				<br></br>.<br></br>.<br></br>.<br></br>.<br></br>.
			</h3>
		</div>
	);
};

export default VideoViewer;
