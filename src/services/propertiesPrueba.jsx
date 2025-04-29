const properties = [];
const associations = [
  { id: 'assoc1', label: 'A1' },
  { id: 'assoc2', label: 'B1' },
  { id: 'assoc3', label: 'C1' }
];

for (const { id, label } of associations) {
  for (let i = 1; i <= 60; i++) {
    // Formatear el número a 3 dígitos: "001", "002", ...
    const num = ("000" + i).slice(-3);
    properties.push({
      _id: `prop-${id}-${num}`,
      company_id: `comp-${id}`,
      extref: `REF-${label}-${num}`,
      active: true,
      app: "external_feed_xxx",
      baths: 2 + (i % 3),        // Número: 2, 3 o 4
      beds: 3 + (i % 3),         // Número: 3, 4 o 5
      built: 200 + i,            // Número
      creation_date: new Date(2024, 0, i).toISOString(),
      description: {
        en: `Example description in English for property ${label}-${num}.`,
        es: `Ejemplo de descripción en español para property ${label}-${num}.`,
        de: `Beispielbeschreibung auf Deutsch für Objekt ${label}-${num}.`,
        fr: `Exemple de description en français pour la propriété ${label}-${num}.`,
        sv: `Exempelbeskrivning på svenska för fastigheten ${label}-${num}.`
      },
      features: [(i % 2 === 0) ? "feat1" : "feat2", (i % 2 === 0) ? "feat3" : "feat4"],
      is_partner: true,
      partner_id: id,
      internal_ref: `INT-REF-${label}-${num}`,
      last_update: new Date(2025, 0, i).toISOString(),
      listing_status: "status" + ((i % 3) + 1),
      new_build: (i % 2 === 0),
      pics: [
        `https://example.com/pics/property${label}-${num}-1.jpg`,
        `https://example.com/pics/property${label}-${num}-2.jpg`
      ],
      plot: 400 + i,
      price: {
        sale: 300000 + (5000 * i),
        comm_amount: 15000 + (250 * i),
        comm_amount_pct: 5,
        net_price: 285000 + (4750 * i),
        net_margin: 15000 + (250 * i),
        comm_capturing: 7500 + (125 * i),
        comm_capturing_pct: 50,
        comm_selling: 7500 + (125 * i),
        comm_selling_pct: 50,
        notes: `Example notes ${label}-${num}`,
        comm_type: "%",
        comm_total: 5,
        comm_listing_type: "%",
        comm_listing_total: 0,
        comm_listing: 0,
        comm_listing_pct: 0,
        comm_selling_type: "%",
        comm_selling_total: 50
      },
      reference: `EX-${label}-${num}`,
      terrace: 20 + (i % 10),
      title: `Mock Property Title ${label}-${num}`,
      titles: {
        en: `Mock Title EN ${label}-${num}`,
        es: `Mock Título ES ${label}-${num}`
      },
      type: ["residential"],
      address: {
        street: `Mock Street ${100 + i}`,
        area: `Mock Area ${label}`,
        unit: `Unit ${i}`,
        city: `Mock City ${label}`,
        region: `Mock Region ${label}`,
        country: "Mockland",
        zipcode: i < 10 ? `0000${i}` : `000${i}`
      },
      area: `area${label.slice(-1)}`,
      subarea: `subarea${label.slice(-1)}`,
      co2_emissions: "",
      co2_emissions_letter: "A",
      community_fees: 1000 + (10 * i),
      consumoEnergia: "",
      consumoEnergia_letter: "A",
      garbage_tax: 150 + (i % 50),
      ibi_tax: 1200 + (i % 100),
      map: {
        lat: `36.${100000 + i}`,
        lng: `-4.${100000 + i}`
      },
      public_view_disabled: false,
      toilets: 1 + (i % 2),
      year: { construction: 2010 + (i % 10) },
      allow_commercial_uses: { commercial_uses: false, selected_companies: [] },
      is_exclusive: false,
      cadastral: `123456789ABC-${label}-${num}`
    });
  }
}

console.log(properties);

export const GetAllPropertiesPrueba = () => {
    return properties;
}