// src/components/SeccionReingreso.jsx
const SeccionReingreso = () => (
  <div className="mt-12 mb-16 bg-gray-100 border-l-4 border-blue-700 text-gray-800 px-6 py-5 max-w-5xl mx-auto rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">¿Ya te postulaste anteriormente?</h3>
    <p className="text-sm">
      Si ya has registrado tus datos y deseas volver a postularte, debes solicitar la eliminación o actualización de tu información.
      Esto garantiza el cumplimiento de las políticas de tratamiento de datos y evita conflictos con registros previos.
    </p>
    <div className="mt-4">
      <a
        href="/solicitud-eliminacion"
        className="inline-block bg-blue-700 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-800 transition"
      >
        Solicitar actualización o eliminación de datos
      </a>
    </div>
  </div>
);

export default SeccionReingreso;
