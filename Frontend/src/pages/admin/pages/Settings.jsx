import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Toast from "../components/Toast";
import "../style/Settings.css";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Lock
} from "lucide-react";

const Settings = () => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    setToast({
      message: "Configurations updated successfully",
      type: "success"
    });
  };

  const tabs = [
    { id: "general", label: "General", icon: <SettingsIcon size={18} /> },
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <AdminLayout>
      <Toast toast={toast} onClose={() => setToast({ message: "", type: "" })} />
      
      <div className="settings-header">
        <h2>System Configurations</h2>
        <p className="muted-text">Manage your enterprise platform settings and security preferences.</p>
      </div>

      <div className="settings-container">
        <aside className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>

        <div className="settings-content glass">
          {activeTab === "general" && (
            <div className="tab-pane platform-settings">
              <h3>
                <Globe size={20} className="text-cyan" /> Platform Settings
              </h3>
              <div className="settings-form-list">
                <div className="input-group">
                  <label>Enterprise Name</label>
                  <input type="text" defaultValue="Sivion Tech Hub" />
                </div>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button 
              onClick={handleSave}
              className="admin-btn admin-btn-primary"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
