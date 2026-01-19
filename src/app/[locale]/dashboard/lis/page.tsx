"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaKey, FaDesktop, FaCopy, FaCheck } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { SlChemistry } from "react-icons/sl";
import axios from "axios";
import "./page.css";

type License = {
  id: number;
  code: string;
  issued_to: string;
  used: boolean;
  bound_to: string;
  expires_at: string;
  created_at: string;
};

type DeviceItem = {
  id: number;
  machine_id: string;
  license_code: string;
  license_payload: {
    device_meta?: {
      hostname?: string;
      os?: string;
    };
  } | null;
  activated_at?: string;
  last_heartbeat?: string;
  revoked: boolean;
};

export default function LISPage() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [issuedToInput, setIssuedToInput] = useState("Local Testing");
  const [expiresInInput, setExpiresInInput] = useState<number>(365);
  const [formError, setFormError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  // edit modal state
  const [editingLicenseId, setEditingLicenseId] = useState<number | null>(null);
  const [editIssuedToInput, setEditIssuedToInput] = useState("");
  const [editShowModal, setEditShowModal] = useState(false);
  const [editIsClosing, setEditIsClosing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  // copied feedback state (store id of license recently copied)
  const [copiedId, setCopiedId] = useState<number | null>(null);
  // confirmation modal state
  const [confirmShow, setConfirmShow] = useState(false);
  const [confirmIsClosing, setConfirmIsClosing] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => Promise<void>) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState("Confirm");
  const [confirmPrimaryLabel, setConfirmPrimaryLabel] = useState("Confirm");
  const [pendingConfirm, setPendingConfirm] = useState<
    | { kind: "delete"; id: number }
    | { kind: "revoke"; device: DeviceItem }
    | { kind: "update"; id: number | null; issued_to: string }
    | null
  >(null);

  const API_BASE = "https://tamalabs.biosystems.id";
  const API_KEY =
    "KJKDANCJSANIUWYR6243UJFOISJFJKVOMV72487YEHFHFHSDVOHF9AMDC9AN9SDN98YE98YEHDIU2Y897873YYY68686487WGDUDUAGYTE8QTEYADIUHADUYW8E8BWTNC8N8NAMDOAIMDAUDUWYAD87NYW7Y7CBT87EY8142164B36248732M87MCIFH8NYRWCM8MYCMUOIDOIADOIDOIUR83YR983Y98328N32C83NYC8732NYC8732Y87Y32NCNSAIHJAOJFOIJFOIQFIUIUNCNHCIUHWV8NRYNV8Y989N9198298YOIJOI090103021313JKJDHAHDJAJASHHAH";

  const closeModal = () => {
    // play closing animation then unmount
    setIsClosing(true);
    window.setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 250);
  };

  const openEditModal = (lic: License) => {
    setEditingLicenseId(lic.id);
    setEditIssuedToInput(lic.issued_to || "");
    setEditShowModal(true);
  };

  const closeEditModal = () => {
    setEditIsClosing(true);
    window.setTimeout(() => {
      setEditShowModal(false);
      setEditIsClosing(false);
      setEditingLicenseId(null);
    }, 250);
  };

  const formatDate = (iso?: string | null) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "-";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback: try execCommand (older browsers), or ignore silently
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleUpdate = async () => {
    if (!editIssuedToInput || editIssuedToInput.trim().length === 0) {
      setFormError("'Issued To' field is required");
      return;
    }
    // show confirmation modal instead of browser confirm
    setConfirmTitle("Confirm");
    setConfirmPrimaryLabel("Save Changes");
    setConfirmMessage("Are you sure you want to update this license?");
    // prepare pending update; will only execute when Confirm is pressed
    setPendingConfirm({ kind: "update", id: editingLicenseId, issued_to: editIssuedToInput });
    setConfirmAction(null);
    setConfirmShow(true);
  };

  const handleDelete = async (id: number) => {
    // prepare a pending delete action, don't execute yet
    setPendingConfirm({ kind: "delete", id });
    setConfirmTitle("Confirm");
    setConfirmPrimaryLabel("Delete");
    setConfirmMessage(
      "Are you sure you want to delete this license? This action cannot be undone."
    );
    // clear any previous programmatic confirmAction to avoid accidental execution
    setConfirmAction(null);
    setConfirmShow(true);
  };

  const closeConfirm = () => {
    setConfirmIsClosing(true);
    window.setTimeout(() => {
      setConfirmShow(false);
      setConfirmIsClosing(false);
      setConfirmAction(null);
      setConfirmMessage("");
      setConfirmLoading(false);
    }, 250);
  };

  // devices state
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [devicesLoading, setDevicesLoading] = useState(true);
  const [devicesError, setDevicesError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<number | null>(null);

  const fetchDevices = async () => {
    try {
      setDevicesLoading(true);
      const res = await axios.get(`${API_BASE}/devices`, { headers: { "x-api-key": API_KEY } });
      const data: DeviceItem[] = res.data.data || [];
      // sort by last_heartbeat (newest first). fallback to activated_at
      data.sort((a, b) => {
        const aTime = new Date(a.last_heartbeat || a.activated_at || 0).getTime();
        const bTime = new Date(b.last_heartbeat || b.activated_at || 0).getTime();
        return bTime - aTime;
      });
      setDevices(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load devices";
      setDevicesError(errorMessage);
    } finally {
      setDevicesLoading(false);
    }
  };

  // Toggle revoke/unrevoke for a device (prepare pending confirm)
  const handleRevokeToggle = (device: DeviceItem) => {
    const message = device.revoked
      ? "Are you sure you want to unrevoke this device?"
      : "Are you sure you want to revoke this device?";
    setConfirmTitle("Confirm");
    setConfirmPrimaryLabel(device.revoked ? "Unrevoke" : "Revoke");
    setConfirmMessage(message);
    setPendingConfirm({ kind: "revoke", device });
    // clear any previous programmatic confirmAction to avoid accidental execution
    setConfirmAction(null);
    setConfirmShow(true);
  };

  const runConfirmAction = async () => {
    // Prefer an explicit confirmAction if set; otherwise handle known pendingConfirm kinds
    if (confirmAction) {
      try {
        setConfirmLoading(true);
        await confirmAction();
      } finally {
        setConfirmLoading(false);
        closeConfirm();
      }
      return;
    }

    if (!pendingConfirm) return;

    let success = false;
    setConfirmLoading(true);
    try {
      if (pendingConfirm.kind === "delete") {
        const id = pendingConfirm.id;
        setDeletingId(id);
        try {
          await axios.delete(`${API_BASE}/license/${id}`, { headers: { "x-api-key": API_KEY } });
          await fetchLicenses();
          await fetchDevices();
          success = true;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          setConfirmMessage(`Failed to delete license: ${errorMessage}`);
        } finally {
          setDeletingId(null);
        }
      } else if (pendingConfirm.kind === "revoke") {
        const device = pendingConfirm.device;
        setRevokingId(device.id);
        try {
          if (device.revoked) {
            await axios.put(`${API_BASE}/devices/${device.machine_id}/unrevoke`, null, {
              headers: { "x-api-key": API_KEY },
            });
          } else {
            await axios.put(`${API_BASE}/devices/${device.machine_id}/revoke`, null, {
              headers: { "x-api-key": API_KEY },
            });
          }
          await fetchDevices();
          success = true;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          setConfirmMessage(
            `Failed to ${device.revoked ? "unrevoke" : "revoke"} device: ${errorMessage}`
          );
        } finally {
          setRevokingId(null);
        }
      } else if (pendingConfirm.kind === "update") {
        const id = pendingConfirm.id;
        const issued_to = pendingConfirm.issued_to;
        try {
          setUpdateLoading(true);
          await axios.put(
            `${API_BASE}/license/${id}`,
            { issued_to },
            { headers: { "x-api-key": API_KEY, "Content-Type": "application/json" } }
          );
          await fetchLicenses();
          // close edit modal if open
          closeEditModal();
          success = true;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          setConfirmMessage(`Failed to update license: ${errorMessage}`);
        } finally {
          setUpdateLoading(false);
        }
      }
    } finally {
      setConfirmLoading(false);
      if (success) {
        setPendingConfirm(null);
        closeConfirm();
      }
      // if not success, keep modal open and show error message
    }
  };

  const handleGenerate = async () => {
    // basic validation
    if (!issuedToInput || issuedToInput.trim().length === 0) {
      setFormError("'Issued To' field is required");
      return;
    }
    if (!expiresInInput || expiresInInput <= 0) {
      setFormError("'Expires in days' must be greater than 0");
      return;
    }

    setFormError(null);
    try {
      setGenerating(true);
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
      );
      await fetchLicenses();
      // clear form (optional)
      setIssuedToInput("");
      setExpiresInInput(365);
      // close modal on success
      setShowModal(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to generate license: ${errorMessage}`);
    } finally {
      setGenerating(false);
    }
  };

  const fetchLicenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/license`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      setLicenses(res.data.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load license data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
    fetchDevices();
  }, []);

  if (loading) return <p className="lis-info">Loading licenses...</p>;
  if (error) return <p className="lis-error">Error: {error}</p>;

  return (
    <div className="lis-container">
      <h1>
        <SlChemistry /> LIS Dashboard
      </h1>
      <div className="lis-header">
        <h1 className="lis-title">
          <FaKey className="title-icon" /> Licenses
        </h1>
      </div>
      <div className="controls-area">
        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <button className="generate-button" onClick={() => setShowModal(true)}>
            Create License
          </button>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="lis-table">
          <thead className="lis-thead">
            <tr>
              <th className="lis-th" style={{ textAlign: "center" }}>
                No
              </th>
              <th className="lis-th">License Code</th>
              <th className="lis-th">Issued To</th>
              <th className="lis-th">Bound To</th>
              <th className="lis-th" style={{ textAlign: "center" }}>
                Used
              </th>
              <th className="lis-th">Created At</th>
              <th className="lis-th">Expires At</th>
              <th className="lis-th" style={{ textAlign: "center" }}>
                Days Left
              </th>
              <th className="lis-th" style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((lic, index) => (
              <tr key={lic.id} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                <td className="lis-td text-center">{index + 1}</td>
                <td className="lis-td code">
                  <span className="code-with-copy">
                    <span className="code-text">{lic.code}</span>
                    <button
                      type="button"
                      className="copy-btn"
                      onClick={() => copyToClipboard(lic.code, lic.id)}
                      aria-label={`Copy license ${lic.code}`}
                    >
                      {copiedId === lic.id ? <FaCheck /> : <FaCopy />}
                    </button>
                  </span>
                </td>
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
                      const now = new Date();
                      const exp = new Date(lic.expires_at);
                      const diff = Math.ceil(
                        (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
                      );
                      return diff > 0 ? `${diff} day${diff === 1 ? "" : "s"}` : "Expired";
                    } catch {
                      return "-";
                    }
                  })()}
                </td>
                <td className="lis-td text-center">
                  <button className="action-btn edit" onClick={() => openEditModal(lic)}>
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(lic.id)}
                    disabled={deletingId === lic.id}
                  >
                    <RiDeleteBin6Fill /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Devices table */}
      <div className="section-separator" />
      <div className="lis-header">
        <h2 className="lis-title">
          {" "}
          <FaDesktop className="title-icon" /> Devices
        </h2>
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
                <th className="lis-th" style={{ textAlign: "center" }}>
                  No
                </th>
                <th className="lis-th">Machine ID</th>
                <th className="lis-th">Hostname</th>
                <th className="lis-th">OS</th>
                <th className="lis-th">Activated At</th>
                <th className="lis-th">Last Heartbeat</th>
                <th className="lis-th" style={{ textAlign: "center" }}>
                  Revoked
                </th>
                <th className="lis-th" style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d, i) => (
                <tr key={d.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                  <td className="lis-td text-center">{i + 1}</td>
                  <td className="lis-td code">{d.machine_id}</td>
                  <td className="lis-td">{d.license_payload?.device_meta?.hostname || "-"}</td>
                  <td className="lis-td">{d.license_payload?.device_meta?.os || "-"}</td>
                  <td className="lis-td">{d.activated_at ? formatDate(d.activated_at) : "-"}</td>
                  <td className="lis-td">
                    {d.last_heartbeat ? formatDate(d.last_heartbeat) : "-"}
                  </td>
                  <td className="lis-td text-center">
                    {d.revoked ? (
                      <span className="badge-yes">Yes</span>
                    ) : (
                      <span className="badge-no">No</span>
                    )}
                  </td>
                  <td className="lis-td text-center">
                    <button
                      className="action-btn delete"
                      onClick={() => handleRevokeToggle(d)}
                      disabled={revokingId === d.id}
                    >
                      {d.revoked ? "Unrevoke" : "Revoke"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className={`modal-overlay ${isClosing ? "closing" : ""}`} onClick={() => closeModal()}>
          <div
            className={`modal ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <h2>Create License</h2>
              <button className="modal-close" onClick={() => closeModal()}>
                ×
              </button>
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
                className={`generate-button ${generating ? "is-loading" : ""}`}
              >
                {generating ? "Generating..." : "Generate License"}
              </button>
            </div>
          </div>
        </div>
      )}

      {editShowModal && (
        <div
          className={`modal-overlay ${editIsClosing ? "closing" : ""}`}
          onClick={() => closeEditModal()}
        >
          <div
            className={`modal ${editIsClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <h2>Edit License</h2>
              <button className="modal-close" onClick={() => closeEditModal()}>
                ×
              </button>
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
              <button className="generate-button" onClick={closeEditModal}>
                Cancel
              </button>
              <button onClick={handleUpdate} disabled={updateLoading} className="generate-button">
                {updateLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmShow && (
        <div
          className={`modal-overlay ${confirmIsClosing ? "closing" : ""}`}
          onClick={() => closeConfirm()}
        >
          <div
            className={`modal ${confirmIsClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <h2>{confirmTitle}</h2>
              <button className="modal-close" onClick={() => closeConfirm()}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>{confirmMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="generate-button" onClick={closeConfirm} disabled={confirmLoading}>
                Cancel
              </button>
              <button
                className="generate-button"
                onClick={runConfirmAction}
                disabled={confirmLoading}
              >
                {confirmLoading ? "Processing..." : confirmPrimaryLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
