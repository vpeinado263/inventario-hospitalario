import { useState, useEffect } from "react";
import axios from "axios";
import CrudForm from "../organisms/CrudForm";
import CrudTable from "../organisms/CrudTable";

const initialDb = [];

const CrudApp = () => {
  const [db, setDb] = useState(initialDb);
  const [dataToEdit, setDataToEdit] = useState(null);

  const readData = async () => {
    try {
      const ENDPOINT = "https://inventario-hospitalario.onrender.com/api/insumos";
      const response = await axios.get(ENDPOINT);
      setDb(response.data);
    } catch (error) {
      console.error("Error al leer los datos:", error);
    }
  };

  const createData = async (data) => {
    try {
      const ENDPOINT = "https://inventario-hospitalario.onrender.com/api/insumos";
      await axios.post(ENDPOINT, data);
      readData();
    } catch (error) {
      console.error("Error al crear insumo:", error);
    }
  };

  const updateData = async (data) => {
    try {
      const ENDPOINT = `https://inventario-hospitalario.onrender.com/api/insumos/${data._id}`;
      await axios.put(ENDPOINT, data);
      readData();
    } catch (error) {
      console.error("Error al actualizar insumo:", error);
    }
  };

  const deleteData = async (id) => {
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar este insumo?`);
    if (confirmar) {
      try {
        const ENDPOINT = `https://inventario-hospitalario.onrender.com/api/insumos/${id}`;
        await axios.delete(ENDPOINT);
        readData();
      } catch (error) {
        console.error("Error al eliminar insumo:", error);
      }
    }
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <div>
      <CrudForm 
        createData={createData} 
        updateData={updateData} 
        dataToEdit={dataToEdit} 
        setDataToEdit={setDataToEdit} 
      />

      <CrudTable 
        data={db} 
        deleteData={deleteData} 
        setDataToEdit={setDataToEdit} 
      />
    </div>
  );
};

export default CrudApp;
