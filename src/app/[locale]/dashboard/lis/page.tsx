"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import "./page.css"

type License = {
    id: number
    code: string
    issued_to: string
    used: boolean
    bound_to: string
    expires_at: string
    created_at: string
}

type DeviceItem = {
    id: number
    machine_id: string
    license_code: string
    license_payload: any
    activated_at?: string
    last_heartbeat?: string
    revoked: boolean
}

export default function LISPage() {
    const [licenses, setLicenses] = useState<License[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [generating, setGenerating] = useState(false)
    const [issuedToInput, setIssuedToInput] = useState("Local Testing")
    const [expiresInInput, setExpiresInInput] = useState<number>(365)
    const [formError, setFormError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    // edit modal state
    const [editingLicenseId, setEditingLicenseId] = useState<number | null>(null)
    const [editIssuedToInput, setEditIssuedToInput] = useState("")
    const [editShowModal, setEditShowModal] = useState(false)
    const [editIsClosing, setEditIsClosing] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    // confirmation modal state
    const [confirmShow, setConfirmShow] = useState(false)
    const [confirmIsClosing, setConfirmIsClosing] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState("")
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [confirmAction, setConfirmAction] = useState<(() => Promise<void>) | null>(null)

    const closeModal = () => {
        // play closing animation then unmount
        setIsClosing(true)
        window.setTimeout(() => {
            setShowModal(false)
            setIsClosing(false)
        }, 250)
    }

    const openEditModal = (lic: License) => {
        setEditingLicenseId(lic.id)
        setEditIssuedToInput(lic.issued_to || "")
        setEditShowModal(true)
    }

    const closeEditModal = () => {
        setEditIsClosing(true)
        window.setTimeout(() => {
            setEditShowModal(false)
            setEditIsClosing(false)
            setEditingLicenseId(null)
        }, 250)
    }

    const formatDate = (iso?: string | null) => {
        if (!iso) return '-'
        const d = new Date(iso)
        if (isNaN(d.getTime())) return '-'
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        const seconds = String(d.getSeconds()).padStart(2, '0')
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }


    const handleUpdate = async () => {
        if (!editIssuedToInput || editIssuedToInput.trim().length === 0) {
            setFormError("'Issued To' field is required")
            return
        }
        // show confirmation modal instead of browser confirm
        setConfirmMessage('Are you sure you want to update this license?')
        setConfirmAction(async () => {
            try {
                setUpdateLoading(true)
                await axios.patch(
                    `${API_BASE}/license/${editingLicenseId}`,
                    { issued_to: editIssuedToInput },
                    { headers: { "x-api-key": API_KEY, "Content-Type": "application/json" } }
                )
                await fetchLicenses()
                closeEditModal()
            } catch (err: any) {
                // alert(`Failed to update license: ${err.message}`)
            } finally {
                setUpdateLoading(false)
            }
        })
        setConfirmShow(true)
    }

    const handleDelete = async (id: number) => {
        setConfirmMessage('Are you sure you want to delete this license? This action cannot be undone.')
        setConfirmAction(async () => {
            try {
                setDeletingId(id)
                await axios.delete(`${API_BASE}/license/${id}`, { headers: { "x-api-key": API_KEY } })
                await fetchLicenses()
            } catch (err: any) {
                // alert(`Failed to delete license: ${err.message}`)
            } finally {
                setDeletingId(null)
            }
        })
        setConfirmShow(true)
    }

    const closeConfirm = () => {
        setConfirmIsClosing(true)
        window.setTimeout(() => {
            setConfirmShow(false)
            setConfirmIsClosing(false)
            setConfirmAction(null)
            setConfirmMessage("")
            setConfirmLoading(false)
        }, 250)
    }

    // devices state
    const [devices, setDevices] = useState<DeviceItem[]>([])
    const [devicesLoading, setDevicesLoading] = useState(true)
    const [devicesError, setDevicesError] = useState<string | null>(null)
    const [revokingId, setRevokingId] = useState<number | null>(null)

    const fetchDevices = async () => {
        try {
            setDevicesLoading(true)
            const res = await axios.get(`${API_BASE}/devices`, { headers: { "x-api-key": API_KEY } })
            const data: DeviceItem[] = res.data.data || []
            // sort by last_heartbeat (newest first). fallback to activated_at
            data.sort((a, b) => {
                const aTime = new Date(a.last_heartbeat || a.activated_at || 0).getTime()
                const bTime = new Date(b.last_heartbeat || b.activated_at || 0).getTime()
                return bTime - aTime
            })
            setDevices(data)
        } catch (err: any) {
            setDevicesError(err.message || 'Failed to load devices')
        } finally {
            setDevicesLoading(false)
        }
    }

    const runConfirmAction = async () => {
        if (!confirmAction) return
        try {
            setConfirmLoading(true)
            await confirmAction()
        } finally {
            setConfirmLoading(false)
            closeConfirm()
        }
    }

    const API_BASE = "http://localhost:8080"
    const API_KEY = "KJKDANCJSANIUWYR6243UJFOISJFJKVOMV72487YEHFHFHSDVOHF9AMDC9AN9SDN98YE98YEHDIU2Y897873YYY68686487WGDUDUAGYTE8QTEYADIUHADUYW8E8BWTNC8N8NAMDOAIMDAUDUWYAD87NYW7Y7CBT87EY8142164B36248732M87MCIFH8NYRWCM8MYCMUOIDOIADOIDOIUR83YR983Y98328N32C83NYC8732NYC8732Y87Y32NCNSAIHJAOJFOIJFOIQFIUIUNCNHCIUHWV8NRYNV8Y989N9198298YOIJOI090103021313JKJDHAHDJAJASHHAH"

    const handleGenerate = async () => {
        // basic validation
        if (!issuedToInput || issuedToInput.trim().length === 0) {
            setFormError("'Issued To' field is required")
            return
        }
        if (!expiresInInput || expiresInInput <= 0) {
            setFormError("'Expires in days' must be greater than 0")
            return
        }

        setFormError(null)
        try {
            setGenerating(true)
            await axios.post(
                `${API_BASE}/generate`,
                {
                    issued_to: issuedToInput,
                    expires_in_days: expiresInInput,
                },
                {
                    headers: {
                        "x-api-key": API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            )
            await fetchLicenses()
            // clear form (optional)
            setIssuedToInput("")
            setExpiresInInput(365)
            // close modal on success
            setShowModal(false)
        } catch (err: any) {
            setError(`Failed to generate license: ${err.message}`)
        } finally {
            setGenerating(false)
        }
    }

    const fetchLicenses = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${API_BASE}/license`, {
                headers: {
                    "x-api-key": API_KEY
                }
            })
            setLicenses(res.data.data || [])
        } catch (err: any) {
            setError(err.message || "Failed to load license data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLicenses()
        fetchDevices()
    }, [])

    if (loading) return <p className="lis-info">Loading licenses...</p>
    if (error) return <p className="lis-error">Error: {error}</p>

    return (
        <div className="lis-container">
            <div className="lis-header">
                <h1 className="lis-title">License List</h1>
            </div>


            <div className="controls-area">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <button
                        className="generate-button"
                        onClick={() => setShowModal(true)}
                    >
                        Create License
                    </button>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="lis-table">
                    <thead className="lis-thead">
                        <tr>
                            <th className="lis-th" style={{ textAlign: "center" }}>No</th>
                            <th className="lis-th" style={{ textAlign: "center" }}>ID</th>
                            <th className="lis-th">License Code</th>
                            <th className="lis-th">Issued To</th>
                            <th className="lis-th">Bound To</th>
                            <th className="lis-th" style={{ textAlign: "center" }}>Used</th>
                            <th className="lis-th">Created At</th>
                            <th className="lis-th">Expires At</th>
                            <th className="lis-th" style={{ textAlign: "center" }}>Days Left</th>
                            <th className="lis-th" style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licenses.map((lic, index) => (
                            <tr
                                key={lic.id}
                                className={index % 2 === 0 ? "row-even" : "row-odd"}
                            >
                                <td className="lis-td text-center">{index + 1}</td>
                                <td className="lis-td text-center">{lic.id}</td>
                                <td className="lis-td code">{lic.code}</td>
                                <td className="lis-td">{lic.issued_to}</td>
                                <td className="lis-td">{lic.bound_to}</td>
                                <td className="lis-td text-center">
                                    {lic.used ? (
                                        <span className="badge-yes">Yes</span>
                                    ) : (
                                        <span className="badge-no">No</span>
                                    )}
                                </td>
                                <td className="lis-td">{formatDate(lic.created_at)}</td>
                                <td className="lis-td">{formatDate(lic.expires_at)}</td>
                                <td className="lis-td text-center">
                                    {(() => {
                                        try {
                                            const now = new Date()
                                            const exp = new Date(lic.expires_at)
                                            const diff = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                                            return diff > 0 ? `${diff} day${diff === 1 ? '' : 's'}` : 'Expired'
                                        } catch (e) {
                                            return '-'
                                        }
                                    })()}
                                </td>
                                <td className="lis-td text-center">
                                    <button className="action-btn edit" onClick={() => openEditModal(lic)}>Edit</button>
                                    <button className="action-btn delete" onClick={() => handleDelete(lic.id)} disabled={deletingId === lic.id}>{deletingId === lic.id ? 'Deleting...' : 'Delete'}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Devices table */}
            <div className="section-separator" />
            <div className="lis-header">
                <h2 className="lis-title">Device List</h2>
            </div>

            {devicesLoading ? (
                <p className="lis-info">Loading devices...</p>
            ) : devicesError ? (
                <p className="lis-error">Error: {devicesError}</p>
            ) : (
                <div className="table-wrapper">
                    <table className="lis-table">
                        <thead className="lis-thead">
                            <tr>
                                <th className="lis-th" style={{ textAlign: 'center' }}>No</th>
                                <th className="lis-th" style={{ textAlign: 'center' }}>ID</th>
                                <th className="lis-th">Machine ID</th>
                                <th className="lis-th">Hostname</th>
                                <th className="lis-th">OS</th>
                                <th className="lis-th">Activated At</th>
                                <th className="lis-th">Last Heartbeat</th>
                                <th className="lis-th" style={{ textAlign: 'center' }}>Revoked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((d, i) => (
                                <tr key={d.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                                    <td className="lis-td text-center">{i + 1}</td>
                                    <td className="lis-td text-center">{d.id}</td>
                                    <td className="lis-td code">{d.machine_id}</td>
                                    <td className="lis-td">{d.license_payload?.device_meta?.hostname || '-'}</td>
                                    <td className="lis-td">{d.license_payload?.device_meta?.os || '-'}</td>
                                    <td className="lis-td">{d.activated_at ? formatDate(d.activated_at) : '-'}</td>
                                    <td className="lis-td">{d.last_heartbeat ? formatDate(d.last_heartbeat) : '-'}</td>
                                    <td className="lis-td text-center">{d.revoked ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}



            {showModal && (
                <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={() => closeModal()}>
                    <div className={`modal ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div className="modal-header">
                            <h2>Create License</h2>
                            <button className="modal-close" onClick={() => closeModal()}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="controls">
                                <label className="control-group">
                                    <span className="control-label">Issued To</span>
                                    <input
                                        type="text"
                                        value={issuedToInput}
                                        onChange={(e) => setIssuedToInput(e.target.value)}
                                        className="control-input"
                                        placeholder="Name or recipient email"
                                    />
                                </label>

                                <label className="control-group">
                                    <span className="control-label">Expires (days)</span>
                                    <input
                                        type="number"
                                        value={expiresInInput}
                                        onChange={(e) => setExpiresInInput(Number(e.target.value))}
                                        className="control-input"
                                        min={1}
                                    />
                                </label>
                            </div>

                            {formError && <div className="form-error">{formError}</div>}
                        </div>

                        <div className="modal-footer">
                            <button
                                onClick={handleGenerate}
                                disabled={generating}
                                className={`generate-button ${generating ? 'is-loading' : ''}`}
                            >
                                {generating ? 'Generating...' : 'Generate License'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editShowModal && (
                <div className={`modal-overlay ${editIsClosing ? 'closing' : ''}`} onClick={() => closeEditModal()}>
                    <div className={`modal ${editIsClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div className="modal-header">
                            <h2>Edit License</h2>
                            <button className="modal-close" onClick={() => closeEditModal()}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="controls">
                                <label className="control-group">
                                    <span className="control-label">Issued To</span>
                                    <input
                                        type="text"
                                        value={editIssuedToInput}
                                        onChange={(e) => setEditIssuedToInput(e.target.value)}
                                        className="control-input"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="generate-button" onClick={closeEditModal}>Cancel</button>
                            <button onClick={handleUpdate} disabled={updateLoading} className="generate-button">
                                {updateLoading ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmShow && (
                <div className={`modal-overlay ${confirmIsClosing ? 'closing' : ''}`} onClick={() => closeConfirm()}>
                    <div className={`modal ${confirmIsClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div className="modal-header">
                            <h2>Confirm</h2>
                            <button className="modal-close" onClick={() => closeConfirm()}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>{confirmMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="generate-button" onClick={closeConfirm} disabled={confirmLoading}>Cancel</button>
                            <button className="generate-button" onClick={runConfirmAction} disabled={confirmLoading}>{confirmLoading ? 'Processing...' : 'Confirm'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
