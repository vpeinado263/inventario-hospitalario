import DeleteButton from "../atoms/DeleteButton";
import EditButton from "../atoms/EditButton";
import styles from "@/styles/CrudTableRow.module.css";

const CrudTableRow = ({ insumo, deleteData, setDataToEdit }) => {
  const { _id, name, quantity, comments } = insumo;

  return (
    <tr>
      <td className={styles.cell}>{name}</td>
      <td className={styles.cell}>{quantity}</td>
      <td className={styles.cell}>{comments}</td>
      <td>
        <EditButton onClick={() => setDataToEdit(insumo)} />
        <DeleteButton onClick={() => deleteData(_id)} />
      </td>
    </tr>
  );
};

export default CrudTableRow;

