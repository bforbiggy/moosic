import "./Menu.scss";
import { BiMenuAltLeft, BiX } from "react-icons/bi"
import Directories from "./directories/Directories";

const Menu = ({ menu, setMenu }) => {
	const toggleMenu = () => {
		setMenu(!menu);
	}

	return <div className="menuContainer">
		{menu ?
			<div className="menu">
				<BiX className="menuClose" onClick={toggleMenu} />
				<Directories />
			</div>
			:
			<div className="buttonbar">
				<BiMenuAltLeft onClick={toggleMenu} />
			</div>
		}
	</div >
}

export default Menu;