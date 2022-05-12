import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";


const OlvidePassword = () => {

  const [ email, setEmail ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
      e.preventDefault();

      if (email === '' || email.length < 6) {
        setAlerta({ msg: 'Please fill the required field' , error: true})
        return;
      }

      try {
       
        const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
        console.log(data);

        setAlerta({ msg: data.msg})
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg, 
          error: true
        })
      };

  };

  const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600  font-black text-6xl ">Reset your {""}<span className="text-black">Password</span></h1>
            <h2 className="text-gray-500 text-sm mt-5 text-justify ">To reset your password, enter your email and submit. An email will be sent to you with instructions about how to complete the process.</h2>
        </div>
    
        <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">

              {msg &&
                <Alerta 
                  alerta={alerta}
                />

              }
            <form  onSubmit={handleSubmit}  >
                <div className="my-5">
                    <label className="uppercase text-gray-600, block, text-xl, font-bold">Email</label>
                    <input type="email" placeholder="E-mail" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                           value={email}
                           onChange = { e => setEmail(e.target.value)}
                    />
                </div>

                <input type="submit" value="Reset Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-800 md:w-auto"  />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">Have an account? <span className="text-black">Sign In</span></Link>

                <Link className="block text-center my-5 text-gray-500" to="/registrar">Don't have an account? <span className="text-black">Sign Up</span></Link>
            </nav>
        </div>
    </>
  )
}

export default OlvidePassword