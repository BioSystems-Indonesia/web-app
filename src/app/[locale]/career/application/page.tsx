import Header from "@/presentation/components/header/header"
import WorkExperienceSection from "./WorkExperienceSection"
import "./page.css"
import { notFound } from "next/navigation"

type Position = {
    id: string
    title: string
    location: string
    description: string
    specializations: Array<{
        value: string
        label: string
    }>
}

type PageProps = {
    searchParams: { id?: string }
}

async function getPositionData(id: string): Promise<Position | null> {
    try {
        // Fetch data dari API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/positions/${id}`, {
            cache: 'no-store'
        })

        if (!response.ok) {
            return null
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching position:', error)
        return null
    }
}

export default async function ApplicationForm({ searchParams }: PageProps) {
    const positionId = searchParams.id || 'POSMO001'
    const position = await getPositionData(positionId)

    if (!position) {
        notFound()
    }
    return (

        <section className="application-form-container">
            <Header backgroundColor="#ee2737" />

            <div className="form-header">
                <h1>Job Application Form</h1>
                <div className="position-details">
                    <h2 className="position-info">{position.title}</h2>
                    <p className="position-info" style={{ fontSize: 24 }}>PT Elga Tama</p>
                    <p className="position-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 8 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {position.location}
                    </p>
                </div>
            </div>

            <form className="application-form">
                {/* Hidden field for position ID */}
                <input type="hidden" name="positionId" value={position.id} />

                {/* Personal Information */}
                <div className="form-section">
                    <h2>Personal Information</h2>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality</label>
                            <input type="text" id="nationality" name="nationality" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Complete Address</label>
                        <textarea id="address" name="address" rows={3} required />
                    </div>
                </div>

                {/* Education */}
                <div className="form-section">
                    <h2>Education Background</h2>
                    <div className="form-group">
                        <label htmlFor="degree">Highest Degree</label>
                        <select id="degree" name="degree" required>
                            <option value="">Select Degree</option>
                            <option value="highschool">High School</option>
                            <option value="diploma">Diploma</option>
                            <option value="bachelor">Bachelor's Degree</option>
                            <option value="master">Master's Degree</option>
                            <option value="phd">PhD</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="major">Major/Field of Study</label>
                            <input type="text" id="major" name="major" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="university">University/Institution</label>
                            <input type="text" id="university" name="university" required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="graduationYear">Graduation Year</label>
                            <select id="graduationYear" name="graduationYear" required>
                                <option value="">Select Year</option>
                                {Array.from({ length: 40 }, (_, i) => 2025 - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gpa">GPA</label>
                            <input type="text" id="gpa" name="gpa" />
                        </div>
                    </div>
                </div>

                {/* Work Experience */}
                <WorkExperienceSection />

                {/* Skills & Competencies */}
                <div className="form-section">
                    <h2>Skills & Competencies</h2>
                    <div className="form-group">
                        <label htmlFor="technicalSkills">Technical Skills (Marketing Tools, Software, etc.)</label>
                        <textarea
                            id="technicalSkills"
                            name="technicalSkills"
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="languages">Languages (specify proficiency level)</label>
                        <input type="text" id="languages" name="languages" />
                    </div>

                    <div className="form-group">
                        <label>Relevant Specializations for this Position</label>
                        <div className="checkbox-group">
                            {position.specializations.map((spec) => (
                                <label key={spec.value}>
                                    <input type="checkbox" name="specialization" value={spec.value} />
                                    {spec.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Documents */}
                <div className="form-section">
                    <h2>Documents</h2>
                    <div className="form-group">
                        <label htmlFor="cv">Upload CV/Resume</label>
                        <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">Upload Self Potrait</label>
                        <input type="file" id="photo" name="photo" accept=".jpg,.jpeg,.png" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="portfolio">Portfolio URL (Optional)</label>
                        <input type="url" id="portfolio" name="portfolio" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="coverLetter">Cover Letter/Motivation</label>
                        <textarea
                            id="coverLetter"
                            name="coverLetter"
                            rows={6}
                            required
                        />
                    </div>
                </div>

                {/* Additional Information */}
                <div className="form-section">
                    <h2>Additional Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="expectedSalary">Expected Salary (IDR)</label>
                            <input type="text" id="expectedSalary" name="expectedSalary" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="availability">Availability to Start</label>
                            <input type="text" id="availability" name="availability" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reference">Professional Reference</label>
                        <textarea
                            id="reference"
                            name="reference"
                            rows={3}
                            placeholder="Name, Position, Company, Contact Information"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="howDidYouHear">How did you hear about this position?</label>
                        <select id="howDidYouHear" name="howDidYouHear">
                            <option value="">Select Option</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="company-website">Company Website</option>
                            <option value="job-board">Job Board</option>
                            <option value="referral">Referral</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="form-section">
                    <div className="form-group checkbox-terms">
                        <label>
                            <input type="checkbox" name="terms" required />
                            I confirm that all information provided is accurate and truthful *
                        </label>
                    </div>
                    <div className="form-group checkbox-terms">
                        <label>
                            <input type="checkbox" name="privacy" required />
                            I agree to the privacy policy and terms of service *
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <button type="submit" className="btn-submit">Submit Application</button>
                    <button type="reset" className="btn-reset">Reset Form</button>
                </div>
            </form>
        </section>
    )
}