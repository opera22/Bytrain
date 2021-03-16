import React from "react";

const Comments = ({ comments }) => {
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

	const renderedComments = () => {
		return comments.map((comment) => {
			const formattedDate = formatDate(comment.dateposted);

			return (
				<div>
					<h2>{comment.username}</h2>
					<div>{formattedDate}</div>
					<div>{comment.content}</div>
				</div>
			);
		});
	};

	return <div>{renderedComments()}</div>;
};

export default Comments;
