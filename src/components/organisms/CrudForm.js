import { useState, useEffect } from "react";
import styles from "@/styles/CrudForm.module.css";

const initialForm = {
  name: "",
  quantity: "",
  comments: "",
  id: null, 
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("El nombre del insumo es obligatorio.");
      return;
    }

    const qty = Number(form.quantity);
    if (!qty || qty <= 0) {
      alert("Por favor, ingresa una cantidad válida mayor a 0.");
      return;
    }

    if (form.id == null) {
      createData(form);
    } else {
      updateData(form);
    }    

    handleReset();
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };
  
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>
        {form.id ? "Editar Insumo" : "Insumo Faltante"}
      </h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de insumo"
          onChange={handleChange}
          value={form.name}
          className={styles.input}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Cantidad requerida"
          onChange={handleChange}
          value={form.quantity}
          min="1"
          className={styles.input}
        />

        <input
          type="text"
          name="comments"
          placeholder="Detalles"
          onChange={handleChange}
          value={form.comments}
          className={styles.input}
        />

        <input
          type="submit"
          value={form.id ? "Actualizar" : "Insertar"}
          disabled={!form.name || !form.quantity}
          className={`${styles.button} ${styles.submit}`}
        />

        <input
          type="reset"
          value="Limpiar"
          onClick={handleReset}
          className={`${styles.button} ${styles.reset}`}
        />
      </form>
    </section>
  );
};

export default CrudForm;
