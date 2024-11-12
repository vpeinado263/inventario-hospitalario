
 
   
 


 const CrudTableRow = ({ insumo, deleteData, setDataToEdit}) => {

  const { name, quantity} = insumo;

  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>
          <button onClick={() => setDataToEdit(insumo)}>Editar</button>
          <button onClick={() => deleteData(insumo)}>Eliminar</button>
      </td>
    </tr>
    );

  };
 
 export default CrudTableRow;