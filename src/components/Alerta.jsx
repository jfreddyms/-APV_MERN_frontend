

const Alerta = ({alerta}) => {
  return (
    
      <div className= {`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-700'} bg-gradient-to-r
                      text-center p-3 rounded-xl  text-white font-bold  mb-10`}>
            {alerta.msg}
      </div>
   
  )
}

export default Alerta