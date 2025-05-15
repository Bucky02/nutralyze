import './Navbar.css'
import Link from './Link'



function Navbar(){
    return(
        <ul>
            <li><Link>Nome</Link></li>
            <li><Link>Cognome</Link></li>
            <li><Link>Indirizzo</Link></li>
            <li><Link>Eta'</Link></li>
            <li><Link>Sesso</Link></li>
        </ul>
    )
}
export default Navbar