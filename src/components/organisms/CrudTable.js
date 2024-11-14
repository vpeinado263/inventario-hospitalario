import CrudTableRow from "../molecules/CrudTableRow";


const CrudTable = ({ data, deleteData, setDataToEdit }) => {

  return (
    <div  className={styles['table-container']}>
        <h3 className={styles.title}>Insumos para Reponer</h3>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Comentarios</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
              {
                  data.length === 0 && (
                    <tr className={styles['empty-row']}>
                      <td colSpan={4}>Sin Insumos</td>
                    </tr>
                  )
              }
               {
                 data.length !== 0 && (
                  data.map(insumo => 

                  <CrudTableRow 
                  key={insumo.id} 
                  insumo={insumo} 
                  deleteData={deleteData} 
                  setDataToEdit={setDataToEdit}/>
                  
                ))}
            </tbody>

        </table>
    </div>
  )

};

export default CrudTable;
