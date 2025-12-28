import CrudTableRow from "../molecules/CrudTableRow";
import styles from "@/styles/CrudTable.module.css";

const CrudTable = ({ data = [], deleteData, setDataToEdit }) => {
  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Nombre</th>
            <th className={styles.th}>Cantidad</th>
            <th className={styles.th}>Comentarios</th>
            <th className={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr className={styles["empty-row"]}>
              <td className={styles.td} colSpan={4}>
                Sin Insumos
              </td>
            </tr>
          ) : (
            data.map((insumo) => (
              <CrudTableRow
                key={insumo.id}
                insumo={insumo}
                deleteData={deleteData}
                setDataToEdit={setDataToEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
