import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import infraestructura from "../assets/infraestructura.svg";
import supervision from "../assets/supervision-tecnica.svg";
import comunidad from "../assets/impacto-comunitario.svg";

const CarruselLanding = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    interval={5000}
    transitionTime={800}
    swipeable
    emulateTouch
  >
    <div>
      <img
        src={infraestructura}
        alt="Infraestructura vial y urbana"
        className="rounded-xl max-h-[400px] mx-auto object-contain"
      />
      <p className="legend">Desarrollamos infraestructura que conecta y transforma regiones</p>
    </div>
    <div>
      <img
        src={supervision}
        alt="Supervisión técnica en campo"
        className="rounded-xl max-h-[400px] mx-auto object-contain"
      />
      <p className="legend">Controlamos, supervisamos y garantizamos la calidad de cada proyecto</p>
    </div>
    <div>
      <img
        src={comunidad}
        alt="Impacto social y comunitario"
        className="rounded-xl max-h-[400px] mx-auto object-contain"
      />
      <p className="legend">Trabajamos con las comunidades para construir un mejor país</p>
    </div>
  </Carousel>
</div>

  );
};

export default CarruselLanding;
