import React, { useState } from "react";
import RecSidebar from "./RecSidebar";
import VideoViewer from "./VideoViewer";
import VideoDetail from "./VideoDetail";
import "./styles/App.css";

const App = () => {
	const [video, setVideo] = useState("");

	return (
		<div className="app">
			this is my app
			<div className="video-container">
				<VideoViewer video={video} />
				<VideoDetail video={video} />
			</div>
			<div className="rec-sidebar-container">
				<RecSidebar currentVideo={video} setVideo={setVideo} />
			</div>
		</div>
	);
};

export default App;
