

const CrudTable = ({ data, deleteData, setDataToEdit }) => {

  return (
    <div>
        <h3>Insumos para Reponer</h3>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
              {
                  data.length === 0 && (
                    <tr>
                      <td colSpan={3}>Información no disponibles</td>
                    </tr>
                  )
              }
               {
                 data.length !== 0 && (
                  data.map(caballero => 
                  <CrudTableRow
                  key={caballero.id} 
                  caballero={caballero} 
                  deleteData={deleteData} 
                  setDataToEdit={setDataToEdit}
                  />
                ))}
            </tbody>
        </table>
    </div>
  )

}

export default CrudTable;
