// src/pages/SolicitudEliminacion.jsx
import { useState } from "react";
import { postSolicitudEliminacion } from "../services/FormServices/solicitudService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import joycoLogo from "../assets/joyco-logo.png";
import Footer from "../components/Footer";
import InputField from "../components/form/InputField";


const SolicitudEliminacion = () => {
    const [form, setForm] = useState({
        nombre_completo: "",
        cc: "",
        correo: "",
        motivo: "",
        descripcion_motivo: "", // <-- nuevo campo
    });


    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);
    const [mostrarModalInfo, setMostrarModalInfo] = useState(true);


    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        const nuevoValor = name === "correo" ? value.toLowerCase() : value;

        setForm((prev) => ({ ...prev, [name]: nuevoValor }));
    };

    const validarCampos = () => {
        const nuevosErrores = {};

        if (!form.nombre_completo.trim()) {
            nuevosErrores.nombre_completo = "El nombre es obligatorio.";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre_completo)) {
            nuevosErrores.nombre_completo = "Solo se permiten letras y espacios.";
        }

        if (!form.cc.trim()) {
            nuevosErrores.cc = "La cédula es obligatoria.";
        } else if (!/^\d{6,10}$/.test(form.cc)) {
            nuevosErrores.cc = "La cédula debe tener entre 6 y 10 dígitos numéricos.";
        }

        if (!form.correo.trim()) {
            nuevosErrores.correo = "El correo es obligatorio.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.correo)) {
            nuevosErrores.correo = "Ingresa un correo electrónico válido.";
        }

        if (!form.motivo) {
            nuevosErrores.motivo = "Debes seleccionar un motivo.";
        }

        return nuevosErrores;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevosErrores = validarCampos();
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            toast.error("Corrige los errores antes de enviar.");
            return;
        }

        setErrores({});

        try {
            await postSolicitudEliminacion(form);
            toast.success("✅ Solicitud enviada correctamente.");
            setEnviado(true);
        } catch (error) {
            toast.error(`Error al enviar la solicitud: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-formulario flex flex-col">
            <header className="fixed top-0 left-0 w-full bg-[#0033A0] text-white p-4 flex justify-between items-center shadow-md z-50">
                <div className="flex items-center gap-4">
                    <a
                        href="https://www.joyco.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90 transition"
                    >
                        <img src={joycoLogo} alt="Logo Joyco" className="h-16 w-auto object-contain" />
                    </a>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="bg-white text-[#0033A0] px-4 py-2 rounded font-medium hover:bg-gray-200 transition"
                >
                    Volver al Inicio
                </button>
            </header>

            <div className="flex flex-col justify-center items-center flex-grow px-4 py-10 lg:py-20 mt-24">
                <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 mb-10">
                    <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
                        Solicitud de Eliminación / Actualización de Datos
                    </h2>

                    {enviado ? (
                        <div className="text-center">
                            <p className="text-green-600 font-semibold mb-4">
                                Tu solicitud fue enviada. El equipo de Talento Humano la revisará.
                            </p>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Volver al inicio
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputField
                                label="Nombre completo"
                                name="nombre_completo"
                                type="text"
                                value={form.nombre_completo}
                                onChange={handleChange}
                                error={errores.nombre_completo}
                            />
                            <InputField
                                label="Cédula"
                                name="cc"
                                type="text"
                                value={form.cc}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,10}$/.test(value)) {
                                        setForm((prev) => ({ ...prev, cc: value }));
                                    }
                                }}
                                error={errores.cc}
                            />
                            <InputField
                                label="Correo electrónico"
                                name="correo"
                                type="email"
                                value={form.correo}
                                onChange={handleChange}
                                error={errores.correo}
                            />

                            <div>
                                <label className="block mb-1 font-medium">Motivo de la solicitud</label>
                                <select
                                    name="motivo"
                                    value={form.motivo}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${errores.motivo ? "border-red-500" : ""}`}
                                >
                                    <option value="">Selecciona un motivo</option>
                                    <option value="Actualizar datos">Actualizar datos</option>
                                    <option value="Eliminar candidatura">Eliminar candidatura</option>
                                </select>
                                {errores.motivo && <p className="text-red-500 text-sm mt-1">{errores.motivo}</p>}
                            </div>

                            <InputField
                                label="Descripción del motivo"
                                name="descripcion_motivo"
                                type="textarea"
                                value={form.descripcion_motivo}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                onClick={() => setMostrarModalConfirmacion(true)}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Enviar Solicitud
                            </button>
                        </form>
                    )}

                    {/* 🔔 Modal informativo al ingresar */}
                    {mostrarModalInfo && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
                                <h2 className="text-lg font-semibold text-blue-800 mb-2">🔔 Información importante</h2>
                                <p className="text-gray-700 mb-4">
                                    Para que podamos procesar tu solicitud correctamente, asegúrate de ingresar
                                    <span className="font-semibold"> exactamente los mismos datos</span> que usaste al registrarte:
                                    nombre completo, cédula y correo electrónico.
                                    <br />Si los datos no coinciden, será difícil localizar tu información y no podrá cumplirse con tu solicitud.
                                </p>
                                <button
                                    onClick={() => setMostrarModalInfo(false)}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    )}

                    {mostrarModalConfirmacion && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Deseas enviar esta solicitud?</h3>
                                <p className="text-gray-600 mb-4">
                                    Ten en cuenta que Talento Humano no actualizará tu información.
                                    Si se aprueba tu solicitud, se eliminarán tus datos actuales y deberás registrarte nuevamente.
                                </p>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={() => setMostrarModalConfirmacion(false)}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            setMostrarModalConfirmacion(false);
                                            handleSubmit(e);
                                        }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SolicitudEliminacion;
