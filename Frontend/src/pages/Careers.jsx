import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/ui/PageWrapper";
import { motion } from "framer-motion";
import { 
  ChevronLeft,
  ChevronRight,
  Monitor,
  Settings,
  HelpCircle,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Globe,
  TrendingUp,
  MapPin,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    jobId: "",
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ success: "", error: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const formRef = useRef(null);
  const captchaRenderedRef = useRef(false);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log("Fetching jobs...");
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs`);
        const data = await response.json();
        console.log("API response:", data);

        if (response.ok && Array.isArray(data.data)) {
          setJobs(data.data);
          console.log("Jobs loaded:", data.data);

          if (data.data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              jobId: data.data[0]._id || data.data[0].id,
            }));
          }
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.warn("Unable to load jobs:", error.message);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    const renderCaptcha = () => {
      if (
        captchaRenderedRef.current ||
        !window.grecaptcha ||
        typeof window.grecaptcha.render !== "function"
      ) {
        return;
      }

      const container = document.getElementById("g-recaptcha");
      if (!container) return;

      try {
        window.grecaptcha.render("g-recaptcha", {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: "dark",
        });
        captchaRenderedRef.current = true;
        setRecaptchaReady(true);
      } catch (error) {
        console.error("reCAPTCHA render error:", error);
      }
    };

    const existingScript = document.getElementById("recaptcha-script");

    if (existingScript) {
      const interval = setInterval(() => {
        if (
          window.grecaptcha &&
          typeof window.grecaptcha.render === "function"
        ) {
          clearInterval(interval);
          renderCaptcha();
        }
      }, 300);

      return () => clearInterval(interval);
    }

    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const interval = setInterval(() => {
        if (
          window.grecaptcha &&
          typeof window.grecaptcha.render === "function"
        ) {
          clearInterval(interval);
          renderCaptcha();
        }
      }, 300);
    };

    document.body.appendChild(script);
  }, []);

  const selectedJob =
    jobs.find((job) => (job._id || job.id) === formData.jobId) ||
    (jobs.length > 0 ? jobs[0] : null);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.jobId) nextErrors.jobId = "Please choose a role to apply for.";
    if (!formData.fullName.trim())
      nextErrors.fullName = "Your full name is required.";

    if (!formData.email.trim()) {
      nextErrors.email = "Your email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim())
      nextErrors.phone = "Your phone number is required.";
    if (!formData.experience.trim())
      nextErrors.experience = "Tell us about your experience.";
    if (!formData.resume) nextErrors.resume = "Please attach your resume.";

    return nextErrors;
  };

  const getRecaptchaToken = () => {
    if (!window.grecaptcha) {
      return Promise.reject(new Error("reCAPTCHA is not loaded yet."));
    }

    const token = window.grecaptcha.getResponse();
    if (!token) {
      return Promise.reject(
        new Error("Please complete the reCAPTCHA verification.")
      );
    }

    return Promise.resolve(token);
  };

  const handleInput = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleRoleApply = (jobId) => {
    setFormData((prev) => ({ ...prev, jobId }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ success: "", error: "" });

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      setStatus({
        error:
          "reCAPTCHA is not configured. Set VITE_RECAPTCHA_SITE_KEY in your frontend .env file.",
      });
      return;
    }

    if (!recaptchaReady) {
      setStatus({
        error: "Waiting for reCAPTCHA to load. Please try again in a moment.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken();
      const payload = new FormData();

      payload.append("jobId", formData.jobId);
      payload.append("fullName", formData.fullName.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("experience", formData.experience.trim());
      payload.append("skills", formData.skills.trim());
      payload.append("resume", formData.resume);
      payload.append("recaptchaToken", recaptchaToken);

      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Application submission failed.");
      }

      setStatus({
        success: result.message || "Application submitted successfully.",
        error: "",
      });

      setErrors({});
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        skills: "",
        resume: null,
      }));

      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (error) {
      setStatus({
        success: "",
        error: error.message || "Unable to submit application at this time.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper className="min-h-screen text-white antialiased font-sans selection:bg-[#00d4ff]/30 selection:text-white overflow-hidden bg-gradient-to-b from-[#020c1b] via-[#031b34] to-[#0a2540]">
      
      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00d4ff]/10 via-transparent to-transparent pointer-events-none blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00c6ff]/10 via-transparent to-transparent pointer-events-none blur-[100px]"></div>
      </div>

      <div className="relative z-10 space-y-20 pb-24">
        
        {/* 1. HERO SECTION */}
        <section className="relative px-6 pt-32 pb-16 w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left relative z-10 w-full"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-4 py-1.5 text-xs font-mono font-medium text-[#00d4ff] backdrop-blur-md">
              JetBrains Mono/Life at Sivion
            </div>
            
            <h1 className="text-5xl lg:text-[64px] font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Life at Sivion
            </h1>
            
            <p className="text-[#9ca3af] text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed font-light">
              Soliable, Secure, High-Performance solutions & IT applications.
            </p>
            
            <button 
              onClick={() => {
                document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full bg-[#00d4ff] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#020c1b] transition-all hover:bg-[#00c6ff] shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] flex items-center gap-2 w-fit"
            >
              Apply Now
              <ArrowRight size={18} />
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative z-10 w-full flex justify-center lg:justify-end"
          >
            {/* Tech Illustration Placeholder */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-[#00d4ff]/10 blur-[120px] rounded-full pointer-events-none"></div>
              
              <img 
                src="/assets/hero-illustration.png" 
                alt="Technology Nodes" 
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(0,212,255,0.2)]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* CSS Fallback Illustration */}
              <div className="hidden absolute inset-0 z-10 flex-col items-center justify-center">
                <div className="relative w-72 h-72 border border-[#00d4ff]/30 rounded-3xl bg-white/[0.02] backdrop-blur-2xl shadow-[0_0_50px_rgba(0,212,255,0.15)] flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0 duration-700">
                  <div className="absolute w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent -rotate-45"></div>
                  <div className="absolute h-[150%] w-[1px] bg-gradient-to-b from-transparent via-[#00c6ff]/50 to-transparent -rotate-45"></div>
                  <Cpu size={90} className="text-[#00d4ff] drop-shadow-[0_0_20px_#00d4ff] animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. "LIFE AT SIVION" FEATURE CARDS */}
        <section className="relative w-full max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-[16px] font-bold text-white tracking-widest uppercase">Life at Sivion</h2>
            <div className="flex gap-2">
              <button className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Briefcase, title: "Company Culture", text: "Develop dynamic development and level and applications." },
              { icon: Monitor, title: "Custom Solutions", text: "Custom software solutions to current search and moment learning." },
              { icon: Settings, title: "Innovation", text: "We have a solid internal structure for core software and applications." },
              { icon: HelpCircle, title: "FAQ", text: "Development administration, solutions, and culture and careers." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-[#00d4ff]/50 hover:bg-white/[0.05] hover:shadow-[0_10px_40px_rgba(0,212,255,0.15)] min-h-[240px]"
              >
                <div>
                  <item.icon size={30} className="text-[#00d4ff] mb-6 opacity-90 group-hover:drop-shadow-[0_0_10px_#00d4ff] transition-all" strokeWidth={1.5} />
                  <h3 className="text-white font-semibold mb-3 text-lg">{item.title}</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed mb-6 font-light">{item.text}</p>
                </div>
                <button className="flex items-center gap-1.5 text-[#00d4ff] text-sm font-medium opacity-80 hover:opacity-100 hover:gap-2 transition-all self-start">
                  Read More <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. OPEN ROLES SECTION */}
        <section id="open-roles" className="relative w-full max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-[16px] font-bold text-white tracking-widest uppercase">Open Roles</h2>
            <div className="flex gap-2">
              <button className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <motion.div 
                  key={job._id || job.id} 
                  whileHover={{ y: -6 }}
                  className="flex flex-col justify-between p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-[#00d4ff]/40 hover:bg-white/[0.05] hover:shadow-[0_10px_40px_rgba(0,212,255,0.15)] min-h-[280px]"
                >
                  <div>
                    <h3 className="text-white font-bold text-xl mb-4 uppercase tracking-wide">{job.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9ca3af] bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        <MapPin size={12} className="text-[#00d4ff]" />
                        {job.location || "Remote"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9ca3af] bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        <Briefcase size={12} className="text-[#00d4ff]" />
                        {job.department || "Engineering"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9ca3af] bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        <Clock size={12} className="text-[#00d4ff]" />
                        {job.type || "Full Time"}
                      </span>
                    </div>

                    <p className="text-[#9ca3af] text-sm leading-relaxed mb-8 font-light line-clamp-3">
                      {job.description || "Develop dynamic development and level and applications."}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRoleApply(job._id || job.id)}
                      className="w-fit inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/50 bg-[#00d4ff]/10 px-6 py-2.5 text-xs font-bold text-[#00d4ff] transition-all hover:bg-[#00d4ff] hover:text-[#020c1b] shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] uppercase tracking-wider"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full border border-white/10 bg-white/[0.02] py-24 px-6 text-center rounded-2xl backdrop-blur-md">
                <Briefcase className="mx-auto h-12 w-12 text-[#9ca3af] mb-4" strokeWidth={1} />
                <h3 className="text-xl font-bold text-white mb-2">No Openings Right Now</h3>
                <p className="text-[#9ca3af] max-w-md mx-auto text-sm font-light">
                  We're continually growing. Stay tuned or submit a general application below.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 4. STATS / HIGHLIGHTS SECTION */}
        <section className="relative w-full max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#00d4ff]/30 hover:bg-white/[0.05] hover:shadow-[0_10px_40px_rgba(0,212,255,0.1)]">
              <span className="text-5xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">80%</span>
              <span className="text-[#00d4ff] text-sm font-semibold uppercase tracking-wider">Remote roles</span>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#00d4ff]/30 hover:bg-white/[0.05] hover:shadow-[0_10px_40px_rgba(0,212,255,0.1)] relative overflow-hidden">
               {/* Center highlight glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#00d4ff]/10 blur-[50px] rounded-full pointer-events-none"></div>
              <span className="text-5xl font-bold text-white mb-3 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">24/7</span>
              <span className="text-[#00d4ff] text-sm font-semibold uppercase tracking-wider relative z-10">Global hiring support</span>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#00d4ff]/30 hover:bg-white/[0.05] hover:shadow-[0_10px_40px_rgba(0,212,255,0.1)]">
              <span className="text-5xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">100%</span>
              <span className="text-[#00d4ff] text-sm font-semibold uppercase tracking-wider">Growth-focused culture</span>
            </div>
          </div>
        </section>

        {/* 5. COMPANY CULTURE SECTION */}
        <section className="relative w-full max-w-[1280px] mx-auto px-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 md:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Soft decorative glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00d4ff]/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex-1 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                Company Culture
              </h2>
              <p className="text-[#9ca3af] text-lg leading-relaxed mb-8 max-w-2xl font-light">
                We believe in low-friction decision-making and empowering developers. We cut through the red tape so you can focus on building high-performance enterprise solutions. Developer-first structure, fresh tooling, and a truly global asynchronous community.
              </p>
              <button className="flex items-center gap-2 text-[#00d4ff] text-sm font-bold uppercase tracking-wider border-b-2 border-transparent hover:border-[#00d4ff] transition-all pb-1 w-fit">
                Read More About Us <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="w-full md:w-auto relative z-10 hidden md:block">
               <div className="w-48 h-48 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative backdrop-blur-md">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#00d4ff]/20 to-transparent rounded-full animate-pulse blur-[10px]"></div>
                 <Globe size={64} className="text-[#00d4ff]/70" />
               </div>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION / APPLICATION FORM SECTION */}
        <section ref={formRef} className="relative w-full max-w-[1280px] mx-auto px-6 pt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Form Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00d4ff]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="h-full relative z-10 w-full max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-[16px] font-bold text-white tracking-widest uppercase mb-4">Start Your Journey</h2>
                <p className="text-[#9ca3af] text-[15px] font-light">
                  Submit your application below. Our hiring team will review your profile and get back to you within 48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {status.success && (
                  <div className="bg-[#102d20] border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-sm flex items-center gap-3 backdrop-blur-md">
                    <CheckCircle2 size={18} />
                    {status.success}
                  </div>
                )}

                {status.error && (
                  <div className="bg-[#3a151b] border border-red-500/30 rounded-xl p-4 text-red-400 text-sm backdrop-blur-md">
                    {status.error}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#9ca3af] tracking-widest uppercase">Select Role *</label>
                    <select
                      value={formData.jobId}
                      onChange={(e) => handleInput("jobId", e.target.value)}
                      disabled={jobs.length === 0}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-[#020c1b]/60 px-5 py-4 text-white outline-none transition-all focus:border-[#00d4ff] focus:bg-[#020c1b]/80 disabled:opacity-50 font-light text-sm"
                    >
                      <option value="" disabled className="bg-[#020c1b]">
                        {jobs.length > 0 ? "Choose a role..." : "No roles available"}
                      </option>
                      {jobs.map((job) => (
                        <option key={job._id || job.id} value={job._id || job.id} className="bg-[#020c1b]">
                          {job.title}
                        </option>
                      ))}
                    </select>
                    {errors.jobId && <span className="text-xs text-red-400">{errors.jobId}</span>}
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#9ca3af] tracking-widest uppercase">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInput("fullName", e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/10 bg-[#020c1b]/60 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-[#00d4ff] focus:bg-[#020c1b]/80 font-light text-sm"
                      />
                      {errors.fullName && <span className="text-xs text-red-400">{errors.fullName}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#9ca3af] tracking-widest uppercase">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInput("email", e.target.value)}
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-white/10 bg-[#020c1b]/60 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-[#00d4ff] focus:bg-[#020c1b]/80 font-light text-sm"
                      />
                      {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#9ca3af] tracking-widest uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInput("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-white/10 bg-[#020c1b]/60 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-[#00d4ff] focus:bg-[#020c1b]/80 font-light text-sm"
                      />
                      {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-[#9ca3af] tracking-widest uppercase">Experience *</label>
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => handleInput("experience", e.target.value)}
                        placeholder="e.g. 3 years"
                        className="w-full rounded-xl border border-white/10 bg-[#020c1b]/60 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-[#00d4ff] focus:bg-[#020c1b]/80 font-light text-sm"
                      />
                      {errors.experience && <span className="text-xs text-red-400">{errors.experience}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#9ca3af] tracking-widest uppercase">Key Skills & Tech</label>
                    <input
                      type="text"
                      value={formData.skills}
                      onChange={(e) => handleInput("skills", e.target.value)}
                      placeholder="React, Node.js, AWS, etc."
                      className="w-full rounded-xl border border-white/10 bg-[#020c1b]/60 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-[#00d4ff] focus:bg-[#020c1b]/80 font-light text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#9ca3af] tracking-widest uppercase">Upload Resume *</label>
                    <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-[#020c1b]/40 px-6 py-10 transition-all hover:border-[#00d4ff]/50 hover:bg-[#020c1b]/60">
                      <div className="rounded-full bg-[#00d4ff]/10 p-3 text-[#00d4ff]">
                        <UploadCloud size={24} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-white mb-1">
                          {formData.resume ? formData.resume.name : "Click to browse or drag and drop"}
                        </p>
                        <p className="text-xs text-[#9ca3af] font-light">PDF, DOC, or DOCX (Max 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) =>
                          handleInput("resume", e.target.files?.[0] || null)
                        }
                      />
                    </label>
                    {errors.resume && <span className="text-xs text-red-400">{errors.resume}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="inline-block mt-2">
                      <div id="g-recaptcha" className="min-h-[78px]" />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center gap-2 rounded-xl bg-[#00d4ff] px-6 py-4 text-sm font-bold tracking-wider uppercase text-[#020c1b] transition-all hover:bg-[#00c6ff] shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#020c1b] border-t-transparent"></div>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Careers;