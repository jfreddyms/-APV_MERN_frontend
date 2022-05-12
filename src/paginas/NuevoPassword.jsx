import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios.jsx";
import Alerta from "../components/Alerta.jsx";


const NuevoPassword = () => {

    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const [ tokenValido, setTokenValido ] = useState(false);
    const [ passwordModificado, setPasswordModificado ] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect( () => {

        const comprobarToken = async () => {
            try {
              const nuevoPaswword =   await clienteAxios(`/veterinarios/olvide-password/${token}`);
              const { data } = nuevoPaswword 
                setAlerta({ msg: data.msg })

                setTokenValido(true)
            } catch (error) {
                setAlerta({msg: error.response.data.msg, error: true})
            }
        }
        comprobarToken ();

    }, [])

    const { msg } = alerta; 

    const handleSubmit = async e => {
        e.preventDefault()

        if ( [ password, confirmPassword ].includes('')) {
            setAlerta({ msg: 'Please fill all required fields', error: true});
          return;
        };

        if (password !== confirmPassword) {
            setAlerta({ msg: 'Passwords do not match', error: true});
            return;
        };

        if (password.length < 6) {
            setAlerta({ msg: 'The password must contain at least six letters', error: true});
            return;
        };

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, {password})

            setAlerta( { msg: data.msg })

            setPasswordModificado(true)
            
        } catch (error) {
            setAlerta( {msg: error.response.data.msg, error: true})
        }
    };

  return (
    <>
        <div>
          <h1 className="text-indigo-600  font-black text-6xl ">Reset your Password and  Manage {""}<span className="text-black">your Patients</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">
            
        { msg && 
             <Alerta 
                    alerta={alerta}
            />
        }

        {tokenValido && (

            <form onSubmit={handleSubmit} >
                <div className="my-5">
                     <label className="uppercase text-gray-600, block, text-xl, font-bold">New Password</label>
                     <input type="password" placeholder="New Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                     />
                   
                </div>

                <div className="my-5">
                    <label className="uppercase text-gray-600, block, text-xl, font-bold">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                           value={confirmPassword}
                           onChange = { e => setConfirmPassword(e.target.value)}
                    />
                   
                </div>
 
                 <input type="submit" value="SAVE YOUR NEW PASSWORD" className="bg-indigo-700 w-full py-3 px-10 text-xs rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-800 md:w-auto"  />
             </form>          
        )}

        { passwordModificado && (
                
                <Link className="block text-center my-5 mt-10 text-gray-500" to="/"><span className="text-black text-xl">Sign In</span></Link>
        )}
           
        </div>
    </>
  )
}

export default NuevoPassword;