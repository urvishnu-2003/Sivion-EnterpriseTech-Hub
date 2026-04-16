import React, { useEffect, useState } from "react";
import {
  BookOpen,
  FolderKanban,
  Receipt,
  Briefcase,
  Users,
  MailOpen,
  HelpCircle,
  BookUser,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import SummaryCard from "../components/SummaryCard";
import SkeletonTable from "../components/SkeletonTable";
import Toast from "../components/Toast";
import axiosInstance from "../../../api/axiosInstance";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    blogs: 0,
    projects: 0,
    quotes: 0,
    jobs: 0,
    applications: 0,
    subscribers: 0,
    inquiries: 0,
    contacts: 0,
  });

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });

  const loadDashboardCounts = async () => {
    try {
      setLoading(true);

      const [
        blogsResponse,
        projectsResponse,
        quotesResponse,
        jobsResponse,
        applicationsResponse,
        subscribersResponse,
        inquiriesResponse,
        contactsResponse,
      ] = await Promise.all([
        axiosInstance.get("/blogs"),
        axiosInstance.get("/projects/admin/all"),
        axiosInstance.get("/quotes"),
        axiosInstance.get("/jobs/admin/all"),
        axiosInstance.get("/applications"),
        axiosInstance.get("/subscribers"),
        axiosInstance.get("/inquiries"),
        axiosInstance.get("/contact"),
      ]);

      setCounts({
        blogs: blogsResponse.data?.data?.length || 0,
        projects: projectsResponse.data?.data?.length || 0,
        quotes: quotesResponse.data?.data?.length || 0,
        jobs: jobsResponse.data?.data?.length || 0,
        applications: applicationsResponse.data?.data?.length || 0,
        subscribers: subscribersResponse.data?.data?.length || 0,
        inquiries: inquiriesResponse.data?.data?.length || 0,
        contacts: contactsResponse.data?.data?.length || 0,
      });
    } catch (error) {
      setToast({
        message: "Failed to load dashboard data",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardCounts();
  }, []);

  return (
    <AdminLayout>
      <Toast toast={toast} onClose={() => setToast({ message: "", type: "" })} />

      {loading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="summary-grid">
            <SummaryCard icon={<BookOpen />} label="Blogs" count={counts.blogs} />
            <SummaryCard
              icon={<FolderKanban />}
              label="Projects"
              count={counts.projects}
            />
            <SummaryCard
              icon={<Receipt />}
              label="Quotes"
              count={counts.quotes}
            />
            <SummaryCard icon={<Briefcase />} label="Jobs" count={counts.jobs} />
            <SummaryCard
              icon={<Users />}
              label="Applications"
              count={counts.applications}
            />
            <SummaryCard
              icon={<MailOpen />}
              label="Newsletter"
              count={counts.subscribers}
            />
            <SummaryCard
              icon={<HelpCircle />}
              label="Inquiry"
              count={counts.inquiries}
            />
            <SummaryCard
              icon={<BookUser />}
              label="Contact"
              count={counts.contacts}
            />
          </div>

          <div className="panel-card" style={{ padding: "20px" }}>
            <h3>Recent Activity</h3>
            <p className="muted-text">
              Recent admin actions, submissions, and updates can be shown here.
            </p>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard;