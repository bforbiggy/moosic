import "./Menu.scss";
import { Moosic } from "../../App/App";
import { useContext } from "react";
import { BiMenuAltLeft, BiX } from "react-icons/bi"
import Directories from "./directories/Directories";

const Menu = () => {
	const [moosic, setMoosic] = useContext(Moosic);

	const toggleMenu = () => {
		setMoosic({
			...moosic,
			menu: !moosic.menu
		})
		console.log('toggling menu to', !moosic.menu);
	}


	return <div className="menuContainer">
		{moosic.menu ?
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