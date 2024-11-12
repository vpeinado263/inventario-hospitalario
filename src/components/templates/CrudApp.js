import { useState, useEffect } from "react";
import axios from "axios";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";


const initialDb = [];

const CrudApp = () => {
  
  const [db, setDb] = useState(initialDb)
  const [dataToEdit, setDataToEdit] = useState(null);

  const readData = async () => {
    const ENDPOINT = "http://localhost:5000/insumos";
    try {
      const response = await axios.get(ENDPOINT);
      const data = response.data;
      console.log("Data received:", data);  // Verifica si los datos se están recibiendo correctamente
      setDb(data);
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };
  
  
  
  const createData = async (data) => {
    data.id = Date.now();
  
    const OPTIONS = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    };
  
    const ENDPOINT = "http://localhost:5000/insumos";
    console.log("Creating data at:", ENDPOINT);
    console.log("Data to be sent:", data);
  
    try {
      const response = await axios(ENDPOINT, OPTIONS);
      console.log("Response:", response);
      readData();
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };
  
  

  const updateData = async (data) => {
    const OPTIONS = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    };
  
    const ENDPOINT = `http://localhost:5000/insumos/${data.id}`;
    console.log("Updating data at:", ENDPOINT); // Verificar endpoint
  
    try {
      await axios(ENDPOINT, OPTIONS);
      readData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  const deleteData = async (data) => {
    const { name, constellation, id } = data;
  
    const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar ${name} de ${constellation}?`);
  
    if (confirmar) {
      const OPTIONS = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
  
      const ENDPOINT = `http://localhost:5000/insumos/${id}`;
      console.log("Deleting from:", ENDPOINT);
  
      try {
        await axios(ENDPOINT, OPTIONS);
        readData();  // Vuelve a leer los datos después de la eliminación
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };
  


  return (
    <div>
    <h1>Reposicion de Insumos</h1>
    <CrudForm  
    createData ={ createData}  
    updateData={updateData} 
    dataToEdit={dataToEdit} 
    setDataToEdit={setDataToEdit}
    />
    <CrudTable data={db}
     deleteData={deleteData} 
     setDataToEdit={setDataToEdit}/>
</div>
  )
}

export default CrudApp;
