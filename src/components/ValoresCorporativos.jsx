import { HeartHandshake, Users, Lightbulb, ShieldCheck, Star } from "lucide-react";

const valores = [
    {
      icono: <HeartHandshake className="w-8 h-8 text-orange-500" />,
      titulo: "Compromiso",
      descripcion: "Trabajamos con pasión y entrega por el bienestar colectivo."
    },
    {
      icono: <Users className="w-8 h-8 text-blue-700" />,
      titulo: "Trabajo en equipo",
      descripcion: "Creemos en la colaboración y el respeto como motor de crecimiento."
    },
    {
      icono: <Lightbulb className="w-8 h-8 text-orange-500" />,
      titulo: "Innovación",
      descripcion: "Buscamos soluciones creativas que generen impacto positivo."
    },
    {
      icono: <ShieldCheck className="w-8 h-8 text-blue-700" />,
      titulo: "Responsabilidad",
      descripcion: "Actuamos con ética, compromiso social y transparencia."
    },
    {
      icono: <Star className="w-8 h-8 text-orange-500" />,
      titulo: "Excelencia",
      descripcion: "Nos esforzamos en brindar siempre lo mejor en cada proyecto."
    },
    {
      icono: <Users className="w-8 h-8 text-blue-700" />,
      titulo: "Colaboración",
      descripcion: "Fomentamos el trabajo en equipo, la escucha activa y la construcción conjunta de soluciones con todos nuestros grupos de interés."
    },
  ];
  

const ValoresCorporativos = () => {
  return (
    <section className="py-20 bg-white text-center px-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Nuestros valores corporativos</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
        Los pilares que definen nuestra cultura, guían nuestras decisiones y construyen la empresa que somos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {valores.map((valor, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{valor.icono}</div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{valor.titulo}</h3>
            <p className="text-gray-700 text-sm">{valor.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValoresCorporativos;
