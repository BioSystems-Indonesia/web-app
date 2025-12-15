import "./opportunities.css"
import OPImg from "@/assets/img/career/op.png"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface OpportunitieCard {
    id: string
    title: string
    location: string
    description: string
    qualifications: string[]
}

export default function OpportunitiesSection() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [expandedSection, setExpandedSection] = useState<'description' | 'qualification' | null>(null)

    const opportunitieCard: OpportunitieCard[] = [
        {
            id: "POSMO001",
            title: "Marketing Officer",
            location: "Bandung, West Java",
            description: "We are looking for a dynamic Marketing Officer to join our team in Bandung. You will be responsible for developing and implementing marketing strategies to promote our products and services in the West Java region.",
            qualifications: [
                "Bachelor's degree in Marketing, Business, or related field",
                "Minimum 2 years of experience in marketing or sales",
                "Strong communication and interpersonal skills",
                "Proficient in digital marketing tools and social media platforms",
                "Ability to work independently and as part of a team"
            ]
        },
        {
            id: "POSMO002",
            title: "Marketing Officer",
            location: "Gambir, Jakarta",
            description: "Join our Jakarta team as a Marketing Officer. You will play a key role in expanding our market presence and building strong relationships with clients in the Jakarta area.",
            qualifications: [
                "Bachelor's degree in Marketing or related field",
                "Minimum 2 years experience in B2B marketing",
                "Excellent presentation and negotiation skills",
                "Knowledge of Jakarta market and business landscape",
                "Fluent in English and Bahasa Indonesia"
            ]
        },
        {
            id: "POSPS001",
            title: "Product Specialist",
            location: "Banjarmasin, South Borneo",
            description: "We are seeking a Product Specialist to provide expert knowledge and support for our laboratory products in South Borneo region. You will work closely with clients to understand their needs.",
            qualifications: [
                "Bachelor's degree in Science, Technology, or related field",
                "Technical knowledge of laboratory equipment and procedures",
                "Strong problem-solving and analytical skills",
                "Willingness to travel within South Borneo region",
                "Customer-oriented mindset"
            ]
        },
        {
            id: "POSMO003",
            title: "Marketing Officer",
            location: "Denpasar, Bali",
            description: "Exciting opportunity for a Marketing Officer in Bali. You will be responsible for driving sales growth and building brand awareness in the beautiful island of Bali.",
            qualifications: [
                "Bachelor's degree in Marketing or related field",
                "Minimum 2 years experience in marketing",
                "Strong networking and relationship building skills",
                "Understanding of Bali market dynamics",
                "Creative thinking and problem-solving abilities"
            ]
        },
    ]

    return <section className="opportunities" onClick={() => {
        setSelectedIndex(null)
        setExpandedSection(null)
    }}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
            <div className="content" onClick={(e) => {
                if (selectedIndex !== null) {
                    e.stopPropagation()
                    setSelectedIndex(null)
                    setExpandedSection(null)
                }
            }}>
                <h1>Opportunities</h1>
                <ul className="opportunities-list" onClick={(e) => e.stopPropagation()}>
                    {opportunitieCard.map((opportunitie, index) => (
                        <li
                            key={index}
                            className={selectedIndex === index ? 'active' : ''}
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedIndex(index)
                                setExpandedSection(null)
                            }}
                        >
                            <h2>{opportunitie.title}</h2>
                            <p>{opportunitie.location}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="img-card">
                <Image src={OPImg} alt="Opportunities Photo" width={976} />
            </div>
            <div className={`detail-card ${selectedIndex !== null ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                {selectedIndex !== null && (
                    <>
                        <div className={`detail-section description-section ${expandedSection === 'description' ? 'active' : ''}`} onClick={() => setExpandedSection(expandedSection === 'description' ? null : 'description')}>
                            <h2>
                                Description
                            </h2>
                            <div className="section-content">
                                <p>{opportunitieCard[selectedIndex].description}</p>
                            </div>
                        </div>
                        <div className={`detail-section qualification-section ${expandedSection === 'qualification' ? 'active' : ''}`} onClick={() => setExpandedSection(expandedSection === 'qualification' ? null : 'qualification')}>
                            <h2>
                                Qualification
                            </h2>
                            <div className="section-content">
                                <ul>
                                    {opportunitieCard[selectedIndex].qualifications.map((qual, idx) => (
                                        <li key={idx}>{qual}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="detail-section application-section">
                            <h2>Application Form</h2>
                            <Link href={`/career/application?id=${opportunitieCard[selectedIndex].id}`} className="apply-button">
                                Apply Now
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    </section>
}