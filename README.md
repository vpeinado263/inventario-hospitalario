# 8va-Tarea-REACT-NEXT.JS

Este proyecto es una aplicación CRUD creada con **React** y **Next.js** que permite la creación, lectura, actualización y eliminación de datos a través de un formulario, utilizando eventos y métodos básicos de JavaScript.

## Descripción

Esta aplicación es un ejercicio práctico de implementación de operaciones CRUD en una aplicación web. CRUD es un acrónimo que representa las cuatro operaciones principales que permite realizar el protocolo HTTP:
- **C**reate (crear)
- **R**ead (leer)
- **U**pdate (actualizar)
- **D**elete (eliminar)

En esta app, cada una de estas operaciones se asocia con un verbo HTTP diferente:
- **Read** se representa mediante el verbo `GET`.
- **Create** se representa mediante el verbo `POST`.
- **Update** se representa mediante el verbo `PUT`.
- **Delete** se representa mediante el verbo `DELETE`.

## Características de la App

1. **Formulario de creación**: La aplicación incluye un formulario que permite crear registros de datos.
2. **Manejo de eventos**: Implementación de `handleChange` para gestionar la entrada de datos en el formulario.
3. **Uso de `Date.now`**: Este método devuelve la cantidad de milisegundos transcurridos desde el 1 de enero de 1970 hasta el momento actual. Nos permite, por ejemplo, crear identificadores únicos para los registros.
4. **Cadena templada**: Utilización de cadenas templadas (template strings) para construir cadenas de texto dinámicamente, lo cual facilita la manipulación de datos en los métodos CRUD.
