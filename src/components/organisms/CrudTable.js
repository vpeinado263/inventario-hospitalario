import CrudTableRow from "../molecules/CrudTableRow";


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
                      <td colSpan={3}>Sin Insumos</td>
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
