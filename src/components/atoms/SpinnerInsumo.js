import styles from "@/styles/SpinnerInsumo.module.css"

const SpinnerInsumo = () => {
  return (
    <>
    <div className={styles.container}>
        <h1 className={styles.title}>Sistema de Gestión </h1>
        <h2 className={styles.description}>Inventario Hospitalario</h2>
    </div>
    <div className={styles.spinner}></div>
    </>
  )
}

export default SpinnerInsumo;
