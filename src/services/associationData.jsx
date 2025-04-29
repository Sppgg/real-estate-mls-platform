/* Preguntas : tema id de cada asociación
tema ObjectId de propiedades y valores --> relacionado con el ObjectId 
que lo pongamos*/

const associations = [
    {
      _id: "assoc1",
      name: "Asociación Alpha",
      cif: "A0000001A",
      email: "info@asociacion-alpha.com",
      web: "www.asociacion-alpha.com",
      phone: "+34 900 111 111",
      mobile: "+34 600 111 111",
      address: {
        street: "Calle Alfa, 100",
        area: "Zona Alfa",
        unit: "1A",
        city: "Ciudad Alfa",
        region: "Provincia Alfa",
        country: "España",
        zipcode: "11111"
      },
      bio: "Asociación Alpha es líder en el sector inmobiliario, comprometida con la excelencia y la transparencia en el servicio.",
      business_name: "Asociación Alpha",
      image: "https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg?t=st=1745856271~exp=1745859871~hmac=a188cb6e4b8f341c447491345a21377ec7e8bfbc9719d5e010351dceb76a67c3&w=740"
    },
    {
      _id: "assoc2",
      name: "Asociación Beta",
      cif: "B0000002B",
      email: "info@asociacion-beta.com",
      web: "www.asociacion-beta.com",
      phone: "+34 900 222 222",
      mobile: "+34 600 222 222",
      address: {
        street: "Calle Beta, 200",
        area: "Zona Beta",
        unit: "2B",
        city: "Ciudad Beta",
        region: "Provincia Beta",
        country: "España",
        zipcode: "22222"
      },
      bio: "Asociación Beta agrupa a varias agencias para potenciar el acceso a un amplio catálogo de propiedades de calidad.",
      business_name: "Asociación Beta",
      image: "https://img.freepik.com/vector-gratis/diseno-logotipo-ac-diseno-plano_23-2149482027.jpg?t=st=1745856343~exp=1745859943~hmac=7a0adf46f8c7d2021356ecfb55d81e65ebacf5aec5357a0a6d8ce9a91e27da20&w=740"
    },
    {
      _id: "assoc3",
      name: "Asociación Gamma",
      cif: "C0000003C",
      email: "info@asociacion-gamma.com",
      web: "www.asociacion-gamma.com",
      phone: "+34 900 333 333",
      mobile: "+34 600 333 333",
      address: {
        street: "Calle Gamma, 300",
        area: "Zona Gamma",
        unit: "3C",
        city: "Ciudad Gamma",
        region: "Provincia Gamma",
        country: "España",
        zipcode: "33333"
      },
      bio: "Asociación Gamma se distingue por su innovación y compromiso con las mejores prácticas inmobiliarias.",
      business_name: "Asociación Gamma",
      image: "https://img.freepik.com/vector-gratis/logotipo-abstracto-entrenador-personal-thanos_23-2149572489.jpg?t=st=1745856426~exp=1745860026~hmac=2d852fa48667e81f5c3945b61ba47789d0de0bd0a6528c7cd40d8e8494432457&w=740"
    }
]


export const GetAllAssocs = () => {
    return associations;
}