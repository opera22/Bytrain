import React from "react";
import "./styles/NavBar.css";

const NavBar = () => {
	const handleMenuButtonClick = (e) => {
		console.log("you hit the menu button");
		console.log("you hit the menu button");
	};

	return (
		<div className="navbar">
			<i
				className="bars icon large"
				id="menu-button"
				onClick={handleMenuButtonClick}
			/>
			<h2>Bytrain</h2>
		</div>
	);
};

export default NavBar;
