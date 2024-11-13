import { useState, useEffect } from "react";
import axios from "axios";
import CrudForm from "../organisms/CrudForm";
import CrudTable from "../organisms/CrudTable";

const initialDb = [];

const CrudApp = () => {

  //Los useState creados
  const [db, setDb] = useState(initialDb)
  const [dataToEdit, setDataToEdit] = useState(null);

  const readData = async () => {
      const ENDPOINT = "http://localhost:5000/insumos"
      const response = await axios.get(ENDPOINT);
      const data = await response.data;
      setDb(data);
  }
  useEffect(() => {
    readData()
  }, [])

  const createData = async (data) => {
    data.id = Date.now();

    const OPTIONS = {
      method : "POST",
      headers: { "Content-Type": "application/json"},
      data: JSON.stringify(data)
    }
    
    const ENDPOINT = "http://localhost:5000/insumos"
    await axios(ENDPOINT, OPTIONS)

    readData()
  }

  const updateData = async (data) => {
    const OPTIONS = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data)
    }

    const ENDPOINT = `http://localhost:5000/insumos/${data.id}`
    await axios(ENDPOINT, OPTIONS)
    
    readData()

  };

  const deleteData = async (data) => {
    const { name, quantity, id } = data;
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar ${quantity} unidades de ${name}?`);

    if (confirmar) {
      const OPTIONS = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      } 
      const ENDPOINT = `http://localhost:5000/insumos/${id}`
      await axios(ENDPOINT, OPTIONS) 
      readData();
    } else {
      return
    }
  };


//visualizamos las props a pasar
  return (
    <div> 
      <h1>Reposición de Insumos</h1>
     
      <CrudForm 
      createData={createData} 
      updateData={updateData} 
      dataToEdit={dataToEdit} 
      setDataToEdit={setDataToEdit} />

      <CrudTable 
      data={db} 
      deleteData={deleteData} 
      setDataToEdit={setDataToEdit} />

    </div>

  );

};

export default CrudApp;
