import DeleteButton from "../atoms/DeleteButton";
import EditButton from "../atoms/EditButton";

 const CrudTableRow = ({ insumo, deleteData, setDataToEdit}) => {

  const { name, quantity, comments} = insumo;

  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{comments}</td>
      <td>
          <EditButton onClick={() => setDataToEdit(insumo)}/>
          <DeleteButton onClick={() => deleteData(insumo)}/>
      </td>
    </tr>
    );

  };
 
 export default CrudTableRow;