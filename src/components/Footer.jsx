import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
        {/* Primera columna */}
        <div>
          <h3 className="font-bold text-base mb-1">Oficina Principal</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <p>Av. Calle 26 # 69-76 Edificio Elemento<br />Torre Tierra Of 1503 Bogotá, Col.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-1">Sucursal</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <p>Calle 44b #57a – 49<br />Bogotá, Col.</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-1">Denuncie aquí</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <p>Canal Ético</p>
        </div>

        {/* Segunda columna */}
        <div>
          <h3 className="font-bold text-base mb-1">Notificaciones Judiciales</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <p>notificacionesjudiciales@joyco.com.co</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-1">Contacto</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <p>Móvil: (+57) 312 447 7972<br />e-mail: contacto@joyco.com.co</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-1">Legal</h3>
          <div className="h-[1px] w-20 bg-white mb-2"></div>
          <p>Políticas y manuales</p>
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
