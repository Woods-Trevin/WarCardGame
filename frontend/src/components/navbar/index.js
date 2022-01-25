import './navbar.css';
import { NavLink } from 'react-router-dom'

function Navbar() {

    return (
        <div className="navbar_ctnr" >
            <div className='navbar_inner_ctnr'>
                <NavLink to='/' className="war_link"> War </NavLink>
                <NavLink to='/results' className="results_link"> Results </NavLink>
            </div>

        </div>
    )
}

export default Navbar;