import {
  MoveRight,
  Handshake,
  ShieldCheck,
  Crown,
  BarChart4,
} from "lucide-react";

const valores = [
  {
    icono: <MoveRight className="w-8 h-8 text-orange-500" />,
    titulo: "Agilidad",
    descripcion:
      "Entregamos soluciones de valor con enfoque sostenible al adaptarnos a nuestros agentes relacionados al adaptarnos y reinventarnos conforme a las exigencias del mercado.",
  },
  {
    icono: <Handshake className="w-8 h-8 text-green-600" />,
    titulo: "Humanidad",
    descripcion:
      "Construimos alianzas estratégicas de la mano de nuestros equipos de trabajo y aliados con los que compartimos metas y valores a través de una comunicación fluida y abierta.",
  },
  {
    icono: <ShieldCheck className="w-8 h-8 text-blue-700" />,
    titulo: "Confianza",
    descripcion:
      "Generamos una relación cercana y segura con nuestros agentes relacionados al regirnos con la verdad y actuar de manera íntegra tanto en el ámbito laboral como personal. ",
  },
  {
    icono: <Crown className="w-8 h-8 text-blue-700" />,
    titulo: "Liderazgo",
    descripcion:
      "Lideramos con el ejemplo y trabajo en equipo para impactar positivamente a nuestros colaboradores y clientes.",
  },
  {
    icono: <BarChart4 className="w-8 h-8 text-orange-500" />,
    titulo: "Maestría",
    descripcion:
      "Garantizamos la excelencia en todas nuestras intervenciones al enfocarnos en el mejoramiento continuo, desarrollo y crecimiento profesional de nuestros equipos de trabajo.",
  },
];

const ValoresCorporativos = () => {
  return (
    <section className="py-20 bg-white text-center px-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">
        Nuestros valores corporativos
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
        Los pilares que definen nuestra cultura, guían nuestras decisiones y construyen la empresa que somos.
      </p>

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {valores.slice(0, 3).map((valor, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{valor.icono}</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {valor.titulo}
              </h3>
              <p className="text-gray-700 text-sm">{valor.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3">
          {valores.slice(3).map((valor, index) => (
            <div
              key={index + 3}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{valor.icono}</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {valor.titulo}
              </h3>
              <p className="text-gray-700 text-sm">{valor.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ValoresCorporativos;
