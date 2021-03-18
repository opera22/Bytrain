import React, { useEffect, useState } from "react";
import "./styles/VideoDetail.css";

const VideoDetail = ({
	videoTitle,
	videoDescription,
	username,
	videoDate,
	isActive,
	setIsActive,
}) => {
	if (!videoTitle) return <div></div>;

	const months = {
		"01": "January",
		"02": "February",
		"03": "March",
		"04": "April",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "August",
		"09": "September",
		"10": "October",
		"11": "November",
		"12": "December",
	};

	const handleClick = (e) => {
		setIsActive(isActive ? false : true);
		// setIconText(isActive ? "Less" : "More");
	};

	const formatDate = (dateStr) => {
		let day = dateStr.split("-")[2].split("T")[0];
		// if the day string has a leading zero
		if (day[0] === "0") {
			day = day[1];
		}

		const month = months[dateStr.split("-")[1]];

		const year = dateStr.split("-")[0];

		const newDate = `${month} ${day}, ${year}`;
		return newDate;
	};

	const formattedDate = videoDate ? formatDate(videoDate) : "";

	return (
		<div className="video-detail ui inverted segment" id="video-detail">
			<h2 className="video-title">{videoTitle}</h2>
			<div className="date">
				{username}
				<span style={{ letterSpacing: "5px" }}> •</span>
				{formattedDate}
			</div>
			<hr />
			<div className="ui inverted accordion" id="desc-dropdown">
				<div
					className={`${isActive ? "active" : ""} title pointer`}
					onClick={handleClick}
					id="desc-dropdown-title"
				>
					{/* conditionally render this next line */}
					{isActive ? (
						<div></div>
					) : (
						<div className="dropdown-text">Show More</div>
					)}
				</div>
				<div
					className={`description ${isActive ? "active" : ""} content`}
					id="desc-dropdown-desc"
				>
					{videoDescription}
				</div>
				<div
					id="desc-dropdown-title"
					className="title pointer"
					onClick={handleClick}
				>
					{isActive ? (
						<div className="dropdown-text">Show Less</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoDetail;
