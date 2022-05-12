import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios.jsx";
import Alerta from "../components/Alerta";

const ConfirmarCuenta =  () => {

  const [ cuentaConfirmada, setCuentaCorfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [ alerta, setAlerta ] = useState({});

  const params = useParams();
  const { id } = params; 

  useEffect(() => {
      
      const confirAccount = async () => {
        try {
          const url = `/veterinarios/confirmar/${id}`;
          const { data } = await clienteAxios(url); 
                                               
          setCuentaCorfirmada(true);
          
          setAlerta( { msg: data.msg} );

        } catch (error) {
          setAlerta( { msg: error.response.data.msg, error: true } );
        }

        setCargando(false);
      }

      confirAccount();

  }, [])

  return (
    <>
        <div>
            <h1 className="text-indigo-600  font-black text-6xl ">Confirm your Account and  Manage {""}<span className="text-black">your Patients</span></h1>
        </div>

        <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">

          {!cargando &&
            <Alerta 
              alerta={alerta}
            />
          }

          {cuentaConfirmada && (

              <Link className="block text-center my-5 text-gray-500" to="/">Have an account? <span className="text-black">Sign In</span></Link>

          )}
        </div>
        
    </>
  )
}

export default ConfirmarCuenta