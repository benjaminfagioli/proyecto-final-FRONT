import React from "react";
import PersonaCard from "../components/quienesSomosCards";
import AvatarBruno from "../assets/AvatarBruno.jpg";
import avatar from "../assets/pngwing.com (1).png";
import "../styles/sobreNosotros.css";

const SobreNosotros = () => {
  const peopleData = [
    {
      name: "Bruno",
      role: "Desarrollador",
      image: avatar,
      text: "Durante mi tiempo en Rolling Code, he tenido que enfrentar desafíos emocionantes y aprender de experiencias inolvidables. Como el proyecto final de mi cursado, reflexiono sobre el viaje que he recorrido hasta ahora. Ha sido un trayecto lleno de aprendizaje, crecimiento personal y momentos que siempre recordaré con cariño El proyecto final representa el esfuerzo y dedicación invertidos a lo largo de la cursada. Es más arduo y complejo que los proyectos anteriores, desafiándome a superar mis límites y a aplicar todo lo que he aprendido hasta ahora. Sin embargo, a medida que avanzo y veo los resultados de mi trabajo, siento una profunda satisfacción y orgullo. Cada línea de código escrita, cada error corregido y cada obstáculo superado me acerca un paso más a la meta final.Durante de la cursada, he disfrutado cada momento, incluso cuando los desafíos parecían abrumadores. La comunidad me ha brindado un entorno de apoyo que ha hecho que cada paso del camino sea más llevadero. No puedo pasar por alto el invaluable papel de los mentores y tutores que han guiado mi camino durante este curso. Su dedicación, experiencia y apoyo fueron fundamentales para mi crecimiento y desarrollo como desarrollador. Siempre estaré agradecido por su paciencia y sabiduría, que han hecho posible que alcance mis metas y supere mis desafíos. Tengo gratitud por todas las experiencias vividas y las lecciones aprendidas. Este proyecto final no solo representa el cierre de una etapa, sino también el comienzo de nuevas oportunidades y desafíos emocionantes que espero con ansias abrazar. Estoy emocionado por el futuro y me llevaré   lo aprendido en Rolling Code durante mi carrera profesional ",
    },
    {
      name: "Benja",
      role: "Desarrollador",
      image: avatar,
      text: "¡Saludos! Mi nombre es Benjamín, y me complace presentarles mi proyecto final para este curso. En este proyecto, he combinado mi pasión por la programación con la creatividad para crear una solución integral que aborde las problemáticas que puedan surgir a la hora de encontrar una habitacion adecuada y hacer la experiencia del usuario lo mas simple posible. Desde el principio me propuse aprender las posibilidades que ofrece el stack aprendido en estos meses de clases para en este caso aplicarlas de manera efectiva para construir una aplicación robusta y eficiente. Este proyecto es solo el comienzo de mi viaje en el desarrollo como full-stack. Planeo seguir mejorando y expandiendo esta plataforma, incorporando nuevas características y optimizando el código para asegurar su evolución continua. Gracias por darme la oportunidad de presentar mi proyecto final. Estoy emocionado por compartir más detalles y espero que disfruten explorando la aplicación tanto como yo disfruté desarrollándola!",
    },
  ];

  return (
    <div className="card-container">
      {peopleData.map((person, index) => (
        <PersonaCard
          key={index}
          name={person.name}
          role={person.role}
          image={person.image}
          text={person.text}
        />
      ))}
    </div>
  );
};

export default SobreNosotros;
