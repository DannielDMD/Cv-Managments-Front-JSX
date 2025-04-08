import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
        {/* Primera columna */}
        <div>
  <h3 className="font-bold text-base mb-1">Oficina Principal</h3>
  <div className="h-[1px] w-20 bg-white mb-2"></div>
  <a
    href="https://www.google.com/maps/search/Joyco/@4.6643561,-74.1081017,14z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQwNi4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:text-gray-300 transition block"
  >
    Av. Calle 26 # 69-76 Edificio Elemento<br />
    Torre Tierra Of 1503 Bogotá, Col.
  </a>
</div>


<div>
  <h3 className="font-bold text-base mb-1">Sucursal</h3>
  <div className="h-[1px] w-20 bg-white mb-2"></div>
  <a
    href="https://www.google.com/maps/place/Cl.+44b+%23+57A-49,+Bogot%C3%A1/@4.6482606,-74.095425,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9bb89488b1c9:0xb3ec10523c5c57b7!8m2!3d4.6482553!4d-74.0928447!16s%2Fg%2F11t7t4ffjj?entry=ttu&g_ep=EgoyMDI1MDQwNi4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:text-gray-300 transition block"
  >
    Calle 44b #57a – 49<br />
    Bogotá, Col.
  </a>
</div>


        <div>
          <h3 className="font-bold text-base mb-1">Denuncie aquí</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <a
            href="http://www.joyco.co/canal-etico/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-gray-300 transition"
          >
            Canal Ético
          </a>
        </div>

        {/* Segunda columna */}
        <div>
          <h3 className="font-bold text-base mb-1">Notificaciones Judiciales</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <a
            href="mailto:notificacionesjudiciales@joyco.com.co"
            className="hover:underline hover:text-gray-300 transition"
          >
            notificacionesjudiciales@joyco.com.co
          </a>
        </div>

        <div>
          <h3 className="font-bold text-base mb-1">Contacto</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <a
            href="mailto:contacto@joyco.com.co"
            className="hover:underline hover:text-gray-300 transition"
          >
            Móvil: (+57) 312 447 7972<br />e-mail: contacto@joyco.com.co
          </a>
        </div>

        <div>
          <h3 className="font-bold text-base mb-1">Legal</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <a
            href="https://www.joyco.co/legal/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-gray-300 transition"
          >
            Políticas y manuales
          </a>
        </div>

        {/* Redes sociales */}
        <div className="sm:col-span-2 lg:col-span-3 mt-6 flex justify-center gap-6">
          <a href="https://www.linkedin.com/company/joyco-s-a-s/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
            <FaLinkedin size={22} />
          </a>
          <a href="https://www.instagram.com/joyco_sas" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
            <FaInstagram size={22} />
          </a>
          <a href="https://www.youtube.com/@joycosas2380" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
            <FaYoutube size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
