import React from "react";

const Comments = ({ comments }) => {
	const mycomments = ["suh", "suh2"];
	const renderedComments = () => {
		return mycomments.map((comment) => {
			return (
				<div>
					<h2>commenter name</h2>
					<div>date</div>
					<div>content</div>
				</div>
			);
		});
	};

	return <div>{renderedComments()}</div>;
};

export default Comments;
