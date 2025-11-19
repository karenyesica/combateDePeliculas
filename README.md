# 🎬 Combate de Películas de Estudio Ghibli

# ¿Qué es?

Es un proyecto final desarrollado para las clases de **JavaScript** de **TECNO3F**.

El sitio permite **jugar** a un “combate” de películas, en el cual se sacan tres cartas/películas para el oponente y tres cartas/películas para el jugador, cada carta tendrá un puntaje y se sumará el de las 3 que se jugaron, al final se decide quién ganó según la cantidad de puntos que tenga cada uno.

Además, el sitio permite **buscar** películas según el título en inglés (la API trae la información en ese idioma) y ver información de la película buscada. Y también permite **contactarse** por medio de un formulario.

---

## 🌟 Descripción General

**Combate de Películas de Estudio Ghibli** es una página web **interactiva y responsive** que combina:

- Contenido informativo sobre Studio Ghibli.
- Consumo dinámico de una API pública [GhibliAPI](https://ghibliapi.vercel.app/films).
- Interacciones con JavaScript.
- Validación visual y funcional de un formulario.

---

## 🚀 Funcionalidades Principales

### 🧭 1. **Encabezado (Header)**

Incluye:

- Título del sitio.
- Barra de navegación responsive.
- Acceso rápido a cada sección del proyecto.

---

### 📚 2. **Contenido Principal**

Sección donde se juega el combate, otra sección donde se pueden buscar películas y una sección final con un formulario de contacto.

---

### 🎥 3. **Consumo de API Pública – GhibliAPI**

El proyecto utiliza la siguiente API:

👉 [**https://ghibliapi.vercel.app/films**](https://ghibliapi.vercel.app/films)

A través de `fetch()`, se obtiene y muestra:

- Título y título original.
- Poster e Imagen.
- Año de lanzamiento.
- Director.
- Duración.
- RT score.
- Descripción.

---

### 📝 4. Formulario de contacto con validación completa

Incluye los siguientes campos:

- Nombre.
- Email.
- Asunto.
- Mensaje.

### ✔ Validaciones implementadas:

- **Nombre:** mínimo 3 caracteres.
- **Email:** debe contener formato válido.
- **Asunto:** opción obligatoria.
- **Mensaje:** campo requerido.

### ✔ Validación visual:

- Bordes rojos en campos con error.
- Bordes verdes en campos válidos.
- Mensajes de error debajo de cada campo.

### ✔ Evita envío si hay errores

Si alguno de los campos falla una validación, el formulario **no se envía**.

### ✔ Validación en tiempo real

Mientras el usuario escribe, los campos se validan automáticamente gracias a eventos como:

---

## 🛠 Tecnologías Utilizadas

- **HTML5:** estructura del sitio.
- **CSS3:** estilos generales e identidad visual inspirada en Ghibli.
- **JavaScript (Vanilla JS):** interacción, validaciones, consumo de API.
- **Fetch API:** para obtener datos en tiempo real.
- **Herramientas de Diseño Gráfico:** las imágenes utilizadas en el proyecto que no fueron traídas de la API, fueron diseñadas especialmente para el sitio.

---

## 📁 Estructura del Proyecto

```
index.html
css
   /style.css
js
   /app.js
img
   ...
README.md
```

---

## ✨ Autoría

Proyecto realizado por **Karen Yesica Benitez**

Trabajo Práctico Final – **JavaScript – TECNO3F**
