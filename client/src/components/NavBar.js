import React from "react";
import "./styles/NavBar.css";

const NavBar = ({ handleMenuButtonClick }) => {
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
