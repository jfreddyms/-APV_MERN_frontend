import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const { cerrarSesion }= useAuth()

  return (
     <header className="py-10 bg-indigo-600">
         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200"><span className="text-white
             font-bold">Veterinary {""} </span> Patient Management</h1>
    
            <nav className="flex items-center gap-4 mt-5 lg:mt-0">
                <Link to='/admin' className="text-white uppercase text-sm  font-bold">Patients</Link>
                <Link to="/admin/perfil" className="text-white uppercase text-sm  font-bold">Profile</Link>

                <button type="button" className="text-indigo-100 text-sm  uppercase font-bold "
                        onClick={cerrarSesion}
                >Log out</button>
            </nav>

         </div>
         
     </header>
  )
}

export default Header;