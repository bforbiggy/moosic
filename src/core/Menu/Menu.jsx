import "./Menu.scss";
import { BiMenuAltLeft, BiX } from "react-icons/bi"
import Directories from "./directories/Directories";

const Menu = ({ menu, setMenu }) => {
	const toggleMenu = () => {
		setMenu(!menu);
	}

	return <div className="menuContainer">
		<div className={`menu ${menu ? 'open' : 'close'}`}>
			<BiX className="closer" onClick={toggleMenu} />
			<Directories />
		</div>

		<div className="buttonbar" style={{ display: menu ? 'none' : 'block' }}>
			<BiMenuAltLeft onClick={toggleMenu} />
		</div>
	</div >
}

export default Menu;