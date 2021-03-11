import React, { useEffect } from "react";

const VideoViewer = ({ video }) => {
	const baseVideoURL = "http://localhost:4000/videos/";

	useEffect(() => {
		console.log(video);
		console.log("component was created or re-rendered");
	}, [video]);

	if (!video) return <div></div>;

	return (
		<div>
			<video key={video} width="650" controls>
				<source src={baseVideoURL + video} type="video/mp4" />
			</video>
		</div>
	);
};

export default VideoViewer;
