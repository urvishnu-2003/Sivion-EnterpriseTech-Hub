import React, { useEffect, useState } from "react";
import "../style/AdminDashboard.css";
import {
  FileText,
  Cpu,
  CreditCard,
  Briefcase,
  Users,
  Mail,
  HelpCircle,
  Contact,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import SummaryCard from "../components/SummaryCard";
import SkeletonTable from "../components/SkeletonTable";

import { getBlogs } from "../services/blogService";
import { getProjects } from "../services/projectService";
import { getQuotes } from "../services/quoteService";
import { getJobs } from "../services/jobService";
import { getApplications } from "../services/applicationService";
import { getSubscribers } from "../services/newsletterService";
import { getInquiries } from "../services/inquiryService";
import { getContacts } from "../services/contactService";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadCounts = async () => {
      setLoading(true);

      try {
        // Load in batches to avoid resource exhaustion (4 requests at a time)
        const [batch1, batch2] = await Promise.all([
          Promise.all([
            getBlogs().catch(() => ({ data: { data: [] } })),
            getProjects().catch(() => ({ data: { data: [] } })),
            getQuotes().catch(() => ({ data: { data: [] } })),
            getJobs().catch(() => ({ data: { data: [] } })),
          ]),
          Promise.all([
            getApplications().catch(() => ({ data: { data: [] } })),
            getSubscribers().catch(() => ({ data: { data: [] } })),
            getInquiries().catch(() => ({ data: { data: [] } })),
            getContacts().catch(() => ({ data: { data: [] } })),
          ]),
        ]);

        const [blogs, projects, quotes, jobs] = batch1;
        const [applications, subscribers, inquiries, contacts] = batch2;

        setCounts({
          blogs: blogs.data?.data?.length || blogs.data?.length || 0,
          projects: projects.data?.data?.length || projects.data?.length || 0,
          quotes: quotes.data?.data?.length || quotes.data?.length || 0,
          jobs: jobs.data?.data?.length || jobs.data?.length || 0,
          applications:
            applications.data?.data?.length ||
            applications.data?.length ||
            0,
          subscribers:
            subscribers.data?.data?.length ||
            subscribers.data?.length ||
            0,
          inquiries:
            inquiries.data?.data?.length || inquiries.data?.length || 0,
          contacts:
            contacts.data?.data?.length || contacts.data?.length || 0,
        });
      } catch (error) {
        console.error("Dashboard load error:", error);
        // Set default empty counts on error
        setCounts({
          blogs: 0,
          projects: 0,
          quotes: 0,
          jobs: 0,
          applications: 0,
          subscribers: 0,
          inquiries: 0,
          contacts: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Track platform activity and manage all enterprise modules from one place."
    >
      {/* Welcome Section */}
      <div className="dashboard-section">
        <div className="dashboard-welcome-card">
          <h3>📊 Admin Overview</h3>
          <p>
            Welcome to your admin dashboard! Use the left navigation to manage
            blogs, projects, quotes, jobs, applications, newsletter
            subscribers, inquiries, and contact requests.
          </p>
        </div>
      </div>

      {/* Summary Cards ONLY */}
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="summary-grid">
          <SummaryCard icon={<FileText />} label="Blogs" count={counts.blogs} />
          <SummaryCard icon={<Cpu />} label="Projects" count={counts.projects} />
          <SummaryCard icon={<CreditCard />} label="Quotes" count={counts.quotes} />
          <SummaryCard icon={<Briefcase />} label="Jobs" count={counts.jobs} />
          <SummaryCard icon={<Users />} label="Applications" count={counts.applications} />
          <SummaryCard icon={<Mail />} label="Newsletter" count={counts.subscribers} />
          <SummaryCard icon={<HelpCircle />} label="Inquiry" count={counts.inquiries} />
          <SummaryCard icon={<Contact />} label="Contact" count={counts.contacts} />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;