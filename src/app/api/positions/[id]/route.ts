import { NextRequest, NextResponse } from "next/server";

// Data posisi (nanti bisa diganti dengan database query)
const positions = [
  {
    id: "POSMO001",
    title: "Marketing Officer",
    location: "Bandung, West Java",
    description:
      "We are looking for a dynamic Marketing Officer to join our team in Bandung. You will be responsible for developing and implementing marketing strategies to promote our products and services in the West Java region.",
    qualifications: [
      "Bachelor's degree in Marketing, Business, or related field",
      "Minimum 2 years of experience in marketing or sales",
      "Strong communication and interpersonal skills",
      "Proficient in digital marketing tools and social media platforms",
      "Ability to work independently and as part of a team",
    ],
    specializations: [
      { value: "digital", label: "Digital Marketing" },
      { value: "social", label: "Social Media Marketing" },
      { value: "content", label: "Content Marketing" },
      { value: "brand", label: "Brand Management" },
    ],
  },
  {
    id: "POSMO002",
    title: "Marketing Officer",
    location: "Gambir, Jakarta",
    description:
      "Join our Jakarta team as a Marketing Officer. You will play a key role in expanding our market presence and building strong relationships with clients in the Jakarta area.",
    qualifications: [
      "Bachelor's degree in Marketing or related field",
      "Minimum 2 years experience in B2B marketing",
      "Excellent presentation and negotiation skills",
      "Knowledge of Jakarta market and business landscape",
      "Fluent in English and Bahasa Indonesia",
    ],
    specializations: [
      { value: "b2b", label: "B2B Marketing" },
      { value: "digital", label: "Digital Marketing" },
      { value: "analytics", label: "Marketing Analytics" },
      { value: "sales", label: "Sales & Lead Generation" },
    ],
  },
  {
    id: "POSPS001",
    title: "Product Specialist",
    location: "Banjarmasin, South Borneo",
    description:
      "We are seeking a Product Specialist to provide expert knowledge and support for our laboratory products in South Borneo region. You will work closely with clients to understand their needs.",
    qualifications: [
      "Bachelor's degree in Science, Technology, or related field",
      "Technical knowledge of laboratory equipment and procedures",
      "Strong problem-solving and analytical skills",
      "Willingness to travel within South Borneo region",
      "Customer-oriented mindset",
    ],
    specializations: [
      { value: "technical", label: "Technical Product Knowledge" },
      { value: "clinical", label: "Clinical Analysis" },
      { value: "lab", label: "Laboratory Equipment" },
      { value: "training", label: "Product Training & Support" },
    ],
  },
  {
    id: "POSMO003",
    title: "Marketing Officer",
    location: "Denpasar, Bali",
    description:
      "Exciting opportunity for a Marketing Officer in Bali. You will be responsible for driving sales growth and building brand awareness in the beautiful island of Bali.",
    qualifications: [
      "Bachelor's degree in Marketing or related field",
      "Minimum 2 years experience in marketing",
      "Strong networking and relationship building skills",
      "Understanding of Bali market dynamics",
      "Creative thinking and problem-solving abilities",
    ],
    specializations: [
      { value: "digital", label: "Digital Marketing" },
      { value: "brand", label: "Brand Management" },
      { value: "events", label: "Event Marketing" },
      { value: "content", label: "Content Marketing" },
    ],
  },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Cari posisi berdasarkan id
    const position = positions.find((pos) => pos.id === id);

    if (!position) {
      return NextResponse.json({ error: "Position not found" }, { status: 404 });
    }

    return NextResponse.json(position, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
