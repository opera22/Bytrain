import React from "react";
import "./styles/Comments.css";

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

	const renderComments = () => {
		return comments.map((comment) => {
			const formattedDate = formatDate(comment.dateposted);

			return (
				<div className="comment" id="whitetext" key={comment.commentid}>
					<div className="content" id="whitetext">
						<a href="/" className="author" id="whitetext">
							{comment.username}
						</a>
						<div className="metadata" id="whitetext">
							<span className="date" id="greytext">
								{formattedDate}
							</span>
						</div>
						<div className="text" id="whitetext">
							{comment.content}
						</div>
					</div>
				</div>
			);
		});
	};

	const renderedComments = renderComments();

	return (
		<div className="comments-component" id="whitetext">
			<div className="ui comments">
				{" "}
				<h3 className="ui dividing header" id="whitetext">
					Comments
				</h3>
				{comments.length === 0 ? (
					<div className="no-comments">No comments yet!</div>
				) : (
					renderedComments
				)}
			</div>
		</div>
	);
};

export default Comments;
