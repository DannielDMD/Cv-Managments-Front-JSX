// src/utils/pdf/crearHojaDeVida.js

export function crearHojaDeVidaPDF(candidato, logoBase64) {
  return {
    content: [
      {
        image: logoBase64,
        width: 100,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },

      { text: "Hoja de Vida", style: "header", alignment: "center" },

      { text: "Información Personal", style: "subheader" },
      {
        table: {
          widths: ["50%", "50%"],
          body: [
            ["Nombre", candidato.nombre_completo],
            ["Correo", candidato.correo_electronico],
            ["CC", candidato.cc],
            ["Teléfono", candidato.telefono],
            ["Departamento", candidato.departamento],
            ["Ciudad", candidato.ciudad],
            ["Fecha de Nacimiento", new Date(candidato.fecha_nacimiento).toLocaleDateString()],
            ["Cargo de Interés", candidato.nombre_cargo_otro || candidato.cargo || "—"],
            ["Perfil", candidato.descripcion_perfil || "—"],
            ["Estado", candidato.estado || "—"],
            ["¿Trabaja en Joyco actualmente?", candidato.trabaja_actualmente_joyco ? "Sí" : "No"],
            ...(candidato.trabaja_actualmente_joyco
              ? [["Centro de Costos", candidato.nombre_centro_costos_otro || candidato.centro_costos || "—"]]
              : []),
            ["¿Ha trabajado antes en Joyco?", candidato.ha_trabajado_joyco ? "Sí" : "No"],
            ...(candidato.motivo_salida
              ? [["Motivo de salida", candidato.motivo_salida]]
              : []),
            ["¿Tiene Referido?", candidato.tiene_referido ? "Sí" : "No"],
            ...(candidato.tiene_referido
              ? [["Nombre del Referido", candidato.nombre_referido || "—"]]
              : []),
            ["Fecha de Registro", new Date(candidato.fecha_registro).toLocaleDateString()],
          ],
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 10],
      },

      { text: "Formación Académica", style: "subheader" },
      {
        table: {
          widths: ["50%", "50%"],
          body: [
            ["Nivel", candidato.nivel_educacion],
            ["Título", candidato.nombre_titulo_otro || candidato.titulo],
            ["Institución", candidato.nombre_institucion_otro || candidato.institucion],
            ["Año de Graduación", candidato.anio_graduacion || "—"],
            ["Nivel de Inglés", candidato.nivel_ingles],
          ],
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 10],
      },

      { text: "Experiencia Laboral", style: "subheader" },
      {
        table: {
          widths: ["50%", "50%"],
          body: [
            ["Rango de Experiencia", candidato.rango_experiencia],
            ["Última Empresa", candidato.ultima_empresa],
            ["Último Cargo", candidato.ultimo_cargo],
            ["Desde", candidato.fecha_inicio],
            ["Hasta", candidato.fecha_fin || "Actual"],
            ["Funciones", candidato.funciones],
          ],
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 10],
      },

      { text: "Conocimientos", style: "subheader" },
      {
        columns: [
          {
            width: "33%",
            stack: [
              { text: "Habilidades Blandas", bold: true },
              {
                ul:
                  candidato.habilidades_blandas?.length > 0
                    ? candidato.habilidades_blandas
                    : ["—"],
              },
            ],
          },
          {
            width: "33%",
            stack: [
              { text: "Habilidades Técnicas", bold: true },
              {
                ul:
                  candidato.habilidades_tecnicas?.length > 0
                    ? candidato.habilidades_tecnicas
                    : ["—"],
              },
            ],
          },
          {
            width: "33%",
            stack: [
              { text: "Herramientas", bold: true },
              {
                ul:
                  candidato.herramientas?.length > 0
                    ? candidato.herramientas
                    : ["—"],
              },
            ],
          },
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10],
      },

      { text: "Preferencias y Disponibilidad", style: "subheader" },
      {
        table: {
          widths: ["50%", "50%"],
          body: [
            ["Disponibilidad para viajar", candidato.disponibilidad_viajar ? "Sí" : "No"],
            ["Disponibilidad de inicio", candidato.disponibilidad_inicio],
            ["Pretensión salarial", candidato.rango_salarial],
            ["¿Trabaja actualmente?", candidato.trabaja_actualmente ? "Sí" : "No"],
            ["Motivo de salida", candidato.otro_motivo_salida_preferencia || candidato.motivo_salida_laboral || "—"],
            ["Razón para trabajar en Joyco", candidato.razon_trabajar_joyco || "—"],
          ],
        },
        layout: "lightHorizontalLines",
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 12, 0, 6],
      },
    },
    defaultStyle: {
      fontSize: 11,
    },
  };
}

