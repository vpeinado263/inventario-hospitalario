
 const CrudTableRow = ({ insumo, deleteData, setDataToEdit}) => {

  const { name, quantity, comments} = insumo;

  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{comments}</td>
      <td>
          <button onClick={() => setDataToEdit(insumo)}>Editar</button>
          <button onClick={() => deleteData(insumo)}>Eliminar</button>
      </td>
    </tr>
    );

  };
 
 export default CrudTableRow;