import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

  const [ nombre, setNombre ] = useState('');
  const [ propietario, setPropietario ] = useState('');
  const [ email, setEmail ]= useState('');
  const [ fecha, setFecha ] = useState('');
  const [ sintomas, setSintomas ] = useState('');
  const [ id, setId ] = useState(null);

  const [ alerta, setAlerta ] = useState({});

  const { guardarPaciente, pacient} = usePacientes();
  
  useEffect(() => {
      if (pacient?.nombre) { 
        setNombre(pacient.nombre);
        setPropietario(pacient.propietario);
        setEmail(pacient.email);
        setFecha(pacient.fecha);
        setSintomas(pacient.sintomas);
        setId(pacient._id);
      }

  }, [pacient])
  

  const handleSubmit = e => {
      e.preventDefault();

      if ([nombre, propietario, email, fecha, sintomas].includes('')) {
          setAlerta({msg: 'Please fill all required fields', error: true});
          return;
      };
      setAlerta({})
      
      guardarPaciente({nombre, propietario, email, fecha, sintomas, id});

      setAlerta({ msg: 'Patient Successfully Saved', error: false})

      setNombre('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');
      setId('')

  };

  const { msg } = alerta ;

  return (
      <>
           <h2 className="font-black text-3xl text-center">Patient Manager</h2>

           <p className="text-xl mt-5 mb-10 text-center">Add your Patients and {""}<span className="text-indigo-600 font-bold">Manage Them</span></p>

            <form  onSubmit={handleSubmit}  className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md">
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Pet's Name</label>
                    <input id="nombre" placeholder="The Pet's Name" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                           value={nombre}
                           onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Owner's name</label>
                    <input id="propietario" placeholder="The Owner's Name" type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                           value={propietario}
                           onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                    <input id="email" placeholder="Your Email" type="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Discharge date</label>
                    <input id="fecha"  type="date" className="border-2 w-full p-2 mt-2"
                           value={fecha}
                           onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Symptoms</label>
                    <textarea id="sintomas" placeholder="Describe the Symptoms" className="border-2 w-full p-2 mt-2 placeholder-gray-400"
                              value={sintomas}
                              onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors" value={ id ? 'Save Changes': "Save Patients"}/>

            </form>

            { msg &&
                <Alerta 
                    alerta={alerta}
                />

            }
      </>
  )
};

export default Formulario;