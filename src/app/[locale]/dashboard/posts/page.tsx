import { BsFileEarmarkPost } from "react-icons/bs";
import "./page.css";

export default function PostsPage() {
  const posts = [
    {
      id: 1,
      name: "Microscope Optical BX53",
      description:
        "High-resolution optical microscope for cell and tissue observation, with brightfield and fluorescence capabilities.",
      category: "Microscope",
      status: "Available",
      location: "Lab A - Biochemistry",
      tags: ["Microscope", "Cell Study", "Fluorescence"],
      addedBy: "John Doe",
      addedAt: "2025-01-10T09:30:00Z",
      updatedAt: "2025-07-15T11:00:00Z",
    },
    {
      id: 2,
      name: "Centrifuge Eppendorf 5424",
      description:
        "Microcentrifuge capable of spinning samples up to 14,000 rpm for protein and DNA extraction.",
      category: "Centrifuge",
      status: "In Repair",
      location: "Lab B - Molecular Biology",
      tags: ["Centrifuge", "DNA", "Protein"],
      addedBy: "Jane Smith",
      addedAt: "2025-02-20T10:00:00Z",
      updatedAt: "2025-08-01T08:30:00Z",
    },
    {
      id: 3,
      name: "Spectrophotometer NanoDrop 2000",
      description:
        "UV-Vis spectrophotometer for measuring nucleic acid and protein concentrations.",
      category: "Spectrophotometer",
      status: "Available",
      location: "Lab C - Genomics",
      tags: ["Spectrophotometer", "DNA", "RNA", "Protein"],
      addedBy: "Michael Lee",
      addedAt: "2025-03-05T14:20:00Z",
      updatedAt: "2025-08-10T09:00:00Z",
    },
    {
      id: 4,
      name: "Autoclave Tuttnauer 3870",
      description: "Steam sterilizer for sterilizing glassware, media, and lab instruments.",
      category: "Sterilizer",
      status: "Available",
      location: "Lab D - Microbiology",
      tags: ["Autoclave", "Sterilization", "Safety"],
      addedBy: "Alice Johnson",
      addedAt: "2025-01-15T08:15:00Z",
      updatedAt: "2025-07-30T13:45:00Z",
    },
    {
      id: 5,
      name: "pH Meter Hanna HI 5221",
      description: "Digital pH meter for precise pH measurement in aqueous solutions.",
      category: "Meter",
      status: "Available",
      location: "Lab E - Chemistry",
      tags: ["pH Meter", "Chemistry", "Measurement"],
      addedBy: "David Kim",
      addedAt: "2025-04-10T11:00:00Z",
      updatedAt: "2025-08-12T10:30:00Z",
    },
    {
      id: 6,
      name: "Shaker Orbital KS 130",
      description: "Orbital shaker for mixing cell cultures or solutions in flasks and tubes.",
      category: "Shaker",
      status: "Maintenance",
      location: "Lab F - Biotech",
      tags: ["Shaker", "Cell Culture", "Mixing"],
      addedBy: "Sarah Wilson",
      addedAt: "2025-05-05T09:50:00Z",
      updatedAt: "2025-08-15T12:00:00Z",
    },
    {
      id: 7,
      name: "Fume Hood Labconco",
      description: "Safety cabinet for handling hazardous chemicals and fumes.",
      category: "Safety Equipment",
      status: "Available",
      location: "Lab G - Chemistry",
      tags: ["Fume Hood", "Safety", "Chemicals"],
      addedBy: "Chris Evans",
      addedAt: "2025-02-25T13:30:00Z",
      updatedAt: "2025-08-05T08:15:00Z",
    },
  ];

  return (
    <>
      <div className="header">
        <BsFileEarmarkPost size={20} />
        <h2>Posts</h2>
      </div>
      <div className="content">
        <h3>Article List</h3>
        <ul>
          {posts.map((post) => {
            const shortDesc =
              post.description.length > 100
                ? post.description.slice(0, 100) + " ..."
                : post.description;

            return (
              <li key={post.id} className="post-item">
                <div className="title">
                  <h4>{post.name}</h4>
                  <div className="meta">
                    <p className="category">{post.category}</p>
                  </div>
                </div>
                <p>{shortDesc}</p>
                <p className="tags">{"#" + post.tags.join(" #")}</p>
                <p className="added-by">By {post.addedBy}</p>
                <p className="date">{new Date(post.addedAt).toLocaleString()}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
