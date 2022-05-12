import usePacientes from "../hooks/usePacientes";


const Paciente = ({paciente}) => {

    const { setEdicion, eliminarPaciente } = usePacientes();
    
    const { email, propietario, nombre, fecha, sintomas, _id } = paciente;

    const formatearFecha = () => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('en-EN', {dateStyle: 'long'}).format(nuevaFecha);
    };

  return (
    <>
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
                <p className="font-bold uppercase text-indigo-700 my-2">Name: {''}<span className="font-normal text-black normal-case">{nombre}</span></p>

                <p className="font-bold uppercase text-indigo-700 my-2">Owner's name: {''}<span className="font-normal text-black normal-case">{propietario}</span></p>

                <p className="font-bold uppercase text-indigo-700 my-2">Email: {''}<span className="font-normal text-black normal-case">{email}</span></p>

                <p className="font-bold uppercase text-indigo-700 my-2">Discharge date: {''}<span className="font-normal text-black normal-case">{formatearFecha(fecha)}</span></p>

                <p className="font-bold uppercase text-indigo-700 my-2">Symptom: {''}<span className="font-normal text-black normal-case">{sintomas}</span></p>

                <div className="flex justify-between my-5 mt-8">
                        {/* como ya tenemos iterado los pacientes, le pasamos el paciente completo al cual le estamos dando click */}
                    <button onClick={() => setEdicion(paciente)} type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg">Edit</button>

                    <button onClick={ () => eliminarPaciente(_id)} type="button" className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg">Delete</button>

                </div>
        </div>    
    </>
  )
}

export default Paciente;