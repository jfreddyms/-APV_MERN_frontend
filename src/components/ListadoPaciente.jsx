import usePacientes from "../hooks/usePacientes.jsx";
import Paciente from "./Paciente.jsx";

  const ListadoPaciente = () => {

  const { pacientes } = usePacientes();
  
  return (
    <>
        { pacientes.length ?
        
        (
          <>
              <h2 className="font-black text-3xl text-center">Patient List</h2>

              <p className="text-xl mt-5 mb-10 text-center">Manage your {""}<span className="text-indigo-600 font-bold">Patients and Appointments</span></p>

              {
                pacientes.map(paciente => (
                  <Paciente 
                    key={paciente._id}
                    paciente = { paciente}
                  
                  />

                ))
              }
          </>

        ) : 
        
        (
          <>
              <h2 className="font-black text-3xl text-center">Has No Added Patients</h2>

              <p className="text-xl mt-5 mb-10 text-center">Start Adding Patients and {""}<span className="text-indigo-600 font-bold">They Will Appear on This Side</span></p>
          </>

        )}
    </>
  )
};

export default ListadoPaciente;