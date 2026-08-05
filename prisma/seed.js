const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const blogs = [
    {
      id: "blog-1",
      title: "Understanding Chemical Earthing Systems: Installation and Key Advantages",
      slug: "understanding-chemical-earthing-systems",
      excerpt: "Discover why chemical earthing systems outperform traditional pipe or plate earthing in modern electrical infrastructure and surge protection.",
      content: `Earthing, also known as grounding, is fundamental to protecting electrical equipment and human lives from dangerous fault currents. Among modern grounding techniques, **Chemical Earthing** has emerged as the premier standard for critical infrastructure, data centers, and heavy industrial installations.

### What is Chemical Earthing?

Unlike conventional pipe or plate grounding that relies solely on natural surrounding soil, chemical earthing utilizes a specialized **Backfill Compound (BFC)**—typically composed of conductive graphite, bentonite clay, and moisture-retaining minerals surrounding a robust copper or GI electrode.

#### Key Components:
1. **Electrode**: High-conductivity copper bonded rod or pipe designed for rapid fault current dissipation.
2. **Backfill Compound**: A hygroscopic compound that expands when hydrated, absorbing ground moisture and maintaining ultra-low soil resistivity.
3. **Earthing Pit Cover**: Heavy-duty inspection chamber ensuring easy access for annual resistance testing.

### Top Benefits of Chemical Earthing Systems

- **Ultra-Low Earth Resistance**: Maintains stable grounding resistance (under 1 Ohm) even in dry, rocky, or sandy soil conditions.
- **Maintenance-Free Longevity**: Does not require periodic watering or salt replenishment like traditional earth pits.
- **Corrosion Resistance**: High-grade copper bonding resists soil corrosion for 15+ years.
- **Surge Current Capacity**: Safely channels high lightning impulses and heavy short-circuit currents directly into the earth mass.

> Proper earthing installation is non-negotiable when dealing with high-voltage machinery or sensitive electronic equipment.

### Installation Best Practices

When installing a chemical earthing pit:
1. Drill a vertical bore hole of appropriate diameter (usually 100mm to 150mm) to a depth of 2 to 3 meters.
2. Position the electrode in the center of the bore.
3. Mix the conductive backfill compound with clean water into a slurry and pour thoroughly around the electrode.
4. Allow 24 to 48 hours for full curing before taking earth resistance measurements using a 3-pole Earth Resistance Tester.`,
      coverImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
      category: "Installation & Safety",
      tags: "Chemical Earthing, Electrical Safety, Grounding, Electrodes",
      seoTitle: "Guide to Chemical Earthing Systems: Benefits & Installation",
      seoDescription: "Comprehensive guide to chemical earthing systems, backfill compounds, installation steps, and safety advantages for industrial electrical installations.",
      published: true,
    },
    {
      id: "blog-2",
      title: "Lightning Protection and Grounding: Designing Safe Industrial Buildings",
      slug: "lightning-protection-and-grounding-industrial",
      excerpt: "Learn how integrated lightning protection systems (LPS) work in harmony with earth grids to prevent catastrophic structural damage and power outages.",
      content: `Lightning strikes deliver immense peak currents exceeding 100,000 Amperes in fractions of a millisecond. Without an effective air termination system connected to low-impedance earthing, direct strikes cause explosive structural damage, fires, and ruined electronics.

### The Three Pillars of Lightning Protection

A comprehensive Lightning Protection System (LPS) engineered according to **IEC 62305** standards consists of three core layers:

1. **Air Termination Network**: Early Streamer Emission (ESE) or conventional Faraday rods positioned at high elevation points.
2. **Down Conductors**: Heavy copper tape or insulated down conductors routing surge energy vertically without flashover risks.
3. **Earthing Termination System**: A low-impedance ground grid designed to disperse lightning energy into earth mass instantaneously.

### Critical Considerations for Industrial Facilities

- **Equipotential Bonding**: Interconnecting all metallic pipes, structural steel, and electrical ground buses to eliminate dangerous potential differences (step and touch voltages).
- **Surge Protective Devices (SPDs)**: Installing Type 1 and Type 2 SPDs at main switchboards to clamp transient overvoltages.
- **Grid Mesh Density**: Utilizing ring earth electrodes interconnected with radial conductors beneath main building foundations.

> Never rely on single point grounding for large facilities; a distributed earthing grid reduces total impedance significantly.`,
      coverImage: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1200&auto=format&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1200&auto=format&fit=crop",
      category: "Standards & Compliance",
      tags: "Lightning Protection, IEC 62305, Industrial Safety, Surge Protection",
      seoTitle: "Lightning Protection & Grounding for Industrial Buildings",
      seoDescription: "Learn how to design low-impedance lightning protection and earthing grids according to IEC 62305 standards for commercial facilities.",
      published: true,
    },
    {
      id: "blog-3",
      title: "Earth Resistance Testing Methods: Fall-of-Potential vs Clamp-On Testing",
      slug: "earth-resistance-testing-methods-guide",
      excerpt: "A step-by-step breakdown of how to accurately measure earth pit resistance using 3-point fall-of-potential and clamp meter techniques.",
      content: `Regular maintenance testing of grounding electrodes is essential to ensure life safety and compliance with IEEE 81 and IS 3043 earthing codes. Over time, soil drying, corrosion, or ground settling can degrade ground resistance.

### Method 1: The 3-Point Fall-of-Potential Method

The 3-point fall-of-potential test is the gold standard for measuring individual earth electrode resistance.

#### Setup Procedure:
1. Disconnect the test electrode from the main building grounding grid.
2. Drive Auxiliary Current Stake (C) at a distance of at least 30 to 50 meters in a straight line from the test pit.
3. Drive Auxiliary Potential Stake (P) at 62% of the total distance to C (e.g., at 31 meters if C is 50 meters away).
4. Connect the 3-terminal earth resistance tester (E, P, C) and trigger the resistance test reading.

### Method 2: Stakeless Clamp-On Testing

Clamp-on earth testers measure resistance without disconnecting the ground rod or driving auxiliary stakes, using dual current and potential transformers.

#### Advantages:
- Fast, non-intrusive measurement on interconnected grounding loops.
- Ideal for urban environments with paved surfaces where driving stakes is impossible.

#### Limitations:
- Requires a continuous loop ground path. Cannot measure isolated, disconnected earth pits.

### Recommended Testing Schedule

- **Commercial / Residential**: Annual inspection before summer dry seasons.
- **Substations & Power Utilities**: Bi-annual comprehensive testing including step and touch voltage mapping.`,
      coverImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
      category: "Maintenance & Testing",
      tags: "Earth Resistance, Testing, Maintenance, Fall of Potential",
      seoTitle: "Earth Resistance Testing Methods: 3-Point vs Clamp Meter",
      seoDescription: "Step-by-step technical guide to testing ground pit resistance using 3-pole fall of potential method and clamp-on testers.",
      published: true,
    },
    {
      id: "blog-4",
      title: "Copper vs Maintenance-Free GI Electrodes: Which Is Right for Your Project?",
      slug: "copper-vs-maintenance-free-gi-electrodes",
      excerpt: "Compare longevity, electrical conductivity, cost, and soil compatibility between pure copper bonded and galvanized iron earthing electrodes.",
      content: `Choosing the right electrode material is a pivotal decision during project design. Both copper-bonded steel rods and Galvanized Iron (GI) pipes have distinct performance profiles and cost structures.

### Copper-Bonded Steel Electrodes

Copper-bonded electrodes are manufactured by molecularly bonding high-purity electrolytic copper (min. 254 microns thick) over a high-tensile steel core.

- **Conductivity**: Superior surface conductivity for high frequency surge dissipation.
- **Lifespan**: 20–25 years in high humidity or acidic soil conditions.
- **Corrosion Rating**: Excellent resistance to soil oxidation and electrolytic corrosion.

### Galvanized Iron (GI) Electrodes

Galvanized iron pipes are coated with zinc through hot-dip galvanization to delay rusting.

- **Cost**: 30% to 50% cheaper upfront investment compared to copper bonding.
- **Mechanical Strength**: Ideal for hard driving conditions in rocky terrain.
- **Lifespan**: 7–10 years depending on soil pH and moisture levels.

### Recommendation Summary

For critical data centers, hospitals, and high-voltage substations, **copper-bonded electrodes** provide superior reliability and peace of mind. For standard residential or temporary sites, **GI electrodes** offer a budget-friendly alternative.`,
      coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      category: "Equipment & Tech",
      tags: "Copper Electrodes, GI Pipes, Grounding Materials, Equipment Selection",
      seoTitle: "Copper vs GI Earthing Electrodes Comparison Guide",
      seoDescription: "Detailed comparison of copper bonded steel rods versus GI pipes for earthing installations, evaluating durability, cost, and conductivity.",
      published: true,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
