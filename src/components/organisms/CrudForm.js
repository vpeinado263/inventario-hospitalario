import { useState, useEffect } from "react";

const initialForm = {
  name: "",
  quantity: "",
  patient:"",
  comments: "",
  id: null
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit}) => {

  
  const [form, setForm] = useState(initialForm);
  
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit])



  const handleChange = (e) => {
    setForm(form => {
      return {
        ...form,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!Number.isInteger(Number(form.quantity)) || form.quantity <= 0) {
      alert("Por favor, ingresa una cantidad válida.");
      return;
    } 

    if (!form.name || !form.quantity) {
      alert("Por favor, completa el formulario correctamente.");
      return
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset()
  }

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };


  return (
    <section>

      <h3>{dataToEdit ? "Editar Insumo" : "Agregar insumo Faltante"}</h3>

      <form onSubmit={handleSubmit}>

        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={form.name}/>

        <input 
        type="number" 
        name="quantity" 
        placeholder="Cantidad" 
        onChange={handleChange} 
        value={form.quantity}
        min="1"
        required/>
        
        <input
        type="text"
        name="comments"
        placeholder="Detalles"
        onChange={handleChange}
        value={form.comments}/>

        <input 
        type="submit" 
        value="Enviar" 
        disabled={!form.name || !form.quantity}/>

        <input type="reset" value="Limpiar" onClick={handleReset} />

      </form>

    </section>
  );
 
};

export default CrudForm;
