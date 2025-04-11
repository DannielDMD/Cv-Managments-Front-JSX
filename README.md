# Plataforma de Gestión de Candidatos – Frontend (React)

Este proyecto es una plataforma interna para la empresa **Joyco**, desarrollada con el objetivo de centralizar el proceso de postulación y gestión de hojas de vida de candidatos. A través de un formulario multipaso y un panel administrativo, permite recopilar, visualizar y analizar perfiles de forma eficiente.

## 🚀 Tecnologías utilizadas

- **React** + **Vite** (JSX)
- **Tailwind CSS** – para estilos rápidos y responsivos
- **React Router DOM** – manejo de rutas
- **Axios** – consumo de API REST
- **React Select** – selectores personalizados
- **React Toastify** – alertas visuales y elegantes
- **React Icons** – iconografía simple y moderna
- **Lucide-React** -- Iconos (npm install lucide-react --legacy-peer-deps)
- **Recharts** – visualización de estadísticas en el dashboard
- **@azure/msal-browser** y **@azure/msal-react** – integración con Microsoft Azure AD

## ⚙️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/DannielDMD/Cv-Managments-Front-JSX.git
   cd Cv-Managments-Front-JSX


2. Instala las dependencias necesarias: (Mejor forzar instalacción con --legacy-peer-deps)

```bash
npm install --legacy-peer-deps
```

3. Inicia el entorno de desarrollo:

```bash
npm run dev
```

---

## 🧩 Características principales

- **Formulario multipaso** para el registro de candidatos (datos personales, educación, experiencia, habilidades, preferencias)
- Propagación automática del `id_candidato` entre secciones
- Validaciones en cada paso del formulario
- Control de flujo para evitar volver a editar la información ya registrada
- **Dashboard administrativo** para Talento Humano:
  - Visualización de métricas por categoría
  - Estadísticas dinámicas (niveles educativos, habilidades, ciudades, cargos)
- Acceso protegido mediante **login corporativo con Azure**

---

## 🔐 Seguridad

- Solo usuarios autenticados con cuenta corporativa pueden acceder al dashboard y gestionar información de candidatos.

- La autenticación se maneja con MSAL (Microsoft Authentication Library) usando los paquetes:

- **@azure/msal-browser**

- **@azure/msal-react**

**⚠️ IMPORTANTE PARA USUARIOS DE REACT 19**
Si estás trabajando con React 19, debes instalar los paquetes de MSAL usando la siguiente opción obligatoriamente:

- bash
- Copiar
- Editar

```bash
npm install @azure/msal-browser @azure/msal-react@2 --legacy-peer-deps
```
  
De lo contrario, se generarán errores debido a la incompatibilidad actual entre @azure/msal-react y React 19.

---

## 📝 Notas adicionales

Este proyecto forma parte de las soluciones internas de Joyco. El código fuente se encuentra alojado en el siguiente repositorio:

🔗 [Repositorio Frontend (GitHub)](https://github.com/DannielDMD/Cv-Managments-Front-JSX.git)

---

## 👨‍💻 Desarrollado por

Daniel Méndez Díaz  
Desarrollador Web – Joyco  
2025

---
