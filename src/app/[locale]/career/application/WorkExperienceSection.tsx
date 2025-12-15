"use client"

import { useState } from "react"

type WorkExperience = {
    id: number
    company: string
    position: string
    startDate: string
    endDate: string
    years: string
    isCurrent?: boolean
    description: string
}

export default function WorkExperienceSection() {
    const [experiences, setExperiences] = useState<WorkExperience[]>([
        { id: 1, company: '', position: '', startDate: '', endDate: '', years: '', description: '', }
    ])

    const addExperience = () => {
        const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1
        setExperiences([...experiences, { id: newId, company: '', position: '', startDate: '', endDate: '', years: '', description: '' }])
    }

    const removeExperience = (id: number) => {
        if (experiences.length > 1) {
            setExperiences(experiences.filter(exp => exp.id !== id))
        }
    }

    const calculateYears = (startDate: string, endDate: string): string => {
        if (!startDate) return '0.0'

        const start = new Date(startDate)
        // if endDate is empty or invalid, use current date
        const end = endDate ? new Date(endDate) : new Date()

        // Calculate difference in months for better stability
        let months = (end.getFullYear() - start.getFullYear()) * 12
        months += end.getMonth() - start.getMonth()
        // if day of month of end is less than start, subtract one month
        if (end.getDate() < start.getDate()) months -= 1

        const years = months / 12
        return years > 0 ? years.toFixed(1) : '0.0'
    }

    const handleCurrentToggle = (id: number, checked: boolean) => {
        setExperiences(experiences.map(exp => {
            if (exp.id === id) {
                const updated = { ...exp } as any
                // if checked (currently working), clear endDate (use present for calc)
                if (checked) {
                    updated.endDate = ''
                    updated.years = calculateYears(updated.startDate, '')
                } else {
                    // when unchecking, leave endDate empty for user to fill
                    updated.years = exp.years || '0.0'
                }
                updated.isCurrent = checked
                return updated
            }
            return exp
        }))
    }

    const handleDateChange = (id: number, field: 'startDate' | 'endDate', value: string) => {
        // sanitize year part to max 4 digits if user pastes unusual values
        if (value) {
            const parts = value.split('-')
            if (parts.length >= 1) {
                const year = parts[0]
                if (year && year.length > 4) {
                    // trim to first 4 digits
                    parts[0] = year.slice(0, 4)
                    // if month/day present, keep them, otherwise set to Jan 01
                    if (!parts[1]) parts[1] = '01'
                    if (!parts[2]) parts[2] = '01'
                    value = parts.join('-')
                }
            }
        }

        setExperiences(experiences.map(exp => {
            if (exp.id === id) {
                const updated: any = { ...exp, [field]: value }
                // if this experience is marked as current, endDate should remain empty and years use present
                const isCurrent = !!updated.isCurrent
                if (isCurrent) {
                    updated.endDate = ''
                    updated.years = calculateYears(updated.startDate, '')
                } else {
                    if (updated.startDate) {
                        updated.years = calculateYears(updated.startDate, updated.endDate)
                    }
                }
                return updated as WorkExperience
            }
            return exp
        }))
    }

    return (
        <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: "2px solid #ee273720" }}>
                <h2 style={{ margin: 0, borderBottom: "none" }}>Work Experience</h2>
                <button
                    type="button"
                    onClick={addExperience}
                    className="btn-add-experience"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ee2737',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#d11f2f'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ee2737'
                        e.currentTarget.style.transform = 'translateY(0)'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Add Experience
                </button>
            </div>

            {experiences.map((experience, index) => (
                <div key={experience.id} style={{
                    marginBottom: '40px',
                    borderBottom: index < experiences.length - 1 ? '2px dashed #e9ecef' : 'none',
                    position: 'relative'
                }}>
                    {experiences.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeExperience(experience.id)}
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                padding: '8px 16px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#c82333'
                                e.currentTarget.style.transform = 'scale(1.05)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#dc3545'
                                e.currentTarget.style.transform = 'scale(1)'
                            }}
                        >
                            Remove
                        </button>
                    )}

                    <h3 style={{
                        fontSize: '18px',
                        color: '#ee2737',
                        marginBottom: '20px',
                        marginTop: index === 0 ? '0' : '10px'
                    }}>
                        Experience #{index + 1}
                    </h3>

                    <div className="form-group">
                        <label htmlFor={`currentCompany-${experience.id}`}>Current/Latest Company</label>
                        <input
                            type="text"
                            id={`currentCompany-${experience.id}`}
                            name={`experiences[${index}][company]`}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`currentPosition-${experience.id}`}>Current/Latest Position</label>
                        <input
                            type="text"
                            id={`currentPosition-${experience.id}`}
                            name={`experiences[${index}][position]`}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor={`startDate-${experience.id}`}>Start Date</label>
                            <input
                                type="date"
                                id={`startDate-${experience.id}`}
                                name={`experiences[${index}][startDate]`}
                                value={experience.startDate}
                                onChange={(e) => handleDateChange(experience.id, 'startDate', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`endDate-${experience.id}`}>End Date</label>
                            <input
                                type="date"
                                id={`endDate-${experience.id}`}
                                name={`experiences[${index}][endDate]`}
                                value={experience.endDate}
                                onChange={(e) => handleDateChange(experience.id, 'endDate', e.target.value)}
                                disabled={!!(experience as any).isCurrent}
                                required={!((experience as any).isCurrent)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="checkbox-terms" style={{ display: 'inline-flex', alignItems: 'center', cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={!!(experience as any).isCurrent}
                                onChange={(e) => handleCurrentToggle(experience.id, e.target.checked)}
                            />
                            Currently working here
                        </label>
                    </div>

                    {experience.startDate && ((experience.endDate) || (experience as any).isCurrent) && (
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <div style={{
                                padding: '12px 18px',
                                backgroundColor: '#f0f9ff',
                                border: '2px solid #bae6fd',
                                borderRadius: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#0c4a6e'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                Total Experience: {experience.years} years
                            </div>
                            <input type="hidden" name={`experiences[${index}][years]`} value={experience.years} />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor={`jobDescription-${experience.id}`}>Brief Job Description</label>
                        <textarea
                            id={`jobDescription-${experience.id}`}
                            name={`experiences[${index}][description]`}
                            rows={4}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
