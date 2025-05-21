import construccion1 from "../../assets/decoracion-formulario/Under-construction-rafiki.svg";
import construccion2 from "../../assets/decoracion-formulario/Bricklayer-rafiki.svg";
import construccion3 from "../../assets/decoracion-formulario/Construction-worker-rafiki.svg";
import ingeniero from "../../assets/decoracion-formulario/Software-engineer-rafiki.svg";
import business from "../../assets/decoracion-formulario/Business-solution-rafiki.svg";
import blocks from "../../assets/decoracion-formulario/Construction-rafiki.svg";
import truck from "../../assets/decoracion-formulario/Construction-truck-rafiki.svg";
import hat from "../../assets/decoracion-formulario/Construction-hat-rafiki.svg";

const DecoracionFormulario = ({ tipo = "principal" }) => {
  const clasesBase = "hidden lg:block absolute opacity-20 pointer-events-none";
  const tamano = tipo === "principal" ? "w-52" : "w-40 opacity-10";

  return (
    <>
      {/* IZQUIERDA */}
      <img src={construccion1} alt="Izquierda 1" className={`${clasesBase} left-0 top-[8%] ${tamano}`} />
      <img src={truck}         alt="Izquierda 2" className={`${clasesBase} left-0 top-[28%] ${tamano}`} />
      <img src={construccion2} alt="Izquierda 3" className={`${clasesBase} left-0 top-[48%] ${tamano}`} />
      <img src={construccion3} alt="Izquierda 4" className={`${clasesBase} left-0 top-[68%] ${tamano}`} />

      {/* DERECHA */}
      <img src={ingeniero} alt="Derecha 1" className={`${clasesBase} right-0 top-[8%] ${tamano}`} />
      <img src={hat}       alt="Derecha 2" className={`${clasesBase} right-0 top-[28%] ${tamano}`} />
      <img src={business}  alt="Derecha 3" className={`${clasesBase} right-0 top-[48%] ${tamano}`} />
      <img src={blocks}    alt="Derecha 4" className={`${clasesBase} right-0 top-[68%] ${tamano}`} />
    </>
  );
};

export default DecoracionFormulario;
