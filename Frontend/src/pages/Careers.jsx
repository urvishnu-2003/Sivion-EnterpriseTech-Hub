import React, { useEffect, useRef, useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Rocket, Zap, Heart, Globe, ArrowRight, CheckCircle2, ShieldCheck, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    jobId: '',
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ success: '', error: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log('Fetching jobs...');
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs`);
        const data = await response.json();
        console.log('API response:', data);
        if (response.ok && Array.isArray(data.data)) {
          setJobs(data.data);
          console.log('Jobs loaded:', data.data);
          if (data.data.length > 0) {
            setFormData((prev) => ({ ...prev, jobId: data.data[0]._id }));
          }
        }
      } catch (error) {
        console.warn('Unable to load jobs:', error.message);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    
    const id = 'recaptcha-script';
    if (document.getElementById(id)) {
      if (window.grecaptcha) {
        setRecaptchaReady(true);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = `https://www.google.com/recaptcha/api.js`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setTimeout(() => {
        if (window.grecaptcha) {
          window.grecaptcha.render('g-recaptcha', {
            sitekey: RECAPTCHA_SITE_KEY,
            theme: 'dark',
          });
          setRecaptchaReady(true);
        }
      }, 100);
    };
    document.body.appendChild(script);
  }, [RECAPTCHA_SITE_KEY]);

  const selectedJob = jobs.find((job) => job._id === formData.jobId || job.id === formData.jobId) || (jobs.length > 0 ? jobs[0] : null);

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Your full name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Your email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.phone.trim()) nextErrors.phone = 'Your phone number is required.';
    if (!formData.experience.trim()) nextErrors.experience = 'Tell us about your experience.';
    if (!formData.resume) nextErrors.resume = 'Please attach your resume.';
    if (!formData.jobId) nextErrors.jobId = 'Please choose a role to apply for.';
    return nextErrors;
  };

  const getRecaptchaToken = () => {
    if (!window.grecaptcha) {
      return Promise.reject(new Error('reCAPTCHA is not loaded yet.'));
    }
    const token = window.grecaptcha.getResponse();
    if (!token) {
      return Promise.reject(new Error('Please complete the reCAPTCHA verification.'));
    }
    return Promise.resolve(token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ success: '', error: '' });
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      setStatus({ error: 'reCAPTCHA is not configured. Set VITE_RECAPTCHA_SITE_KEY in your Frontend environment.' });
      return;
    }

    if (!recaptchaReady) {
      setStatus({ error: 'Waiting for reCAPTCHA to load. Please try again in a moment.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken();
      const payload = new FormData();

      payload.append('jobId', formData.jobId);
      payload.append('fullName', formData.fullName.trim());
      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('experience', formData.experience.trim());
      payload.append('skills', formData.skills.trim());
      payload.append('resume', formData.resume);
      payload.append('recaptchaToken', recaptchaToken);

      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Application submission failed.');
      }

      setStatus({ success: result.message || 'Application submitted successfully.' });
      setErrors({});
      setFormData((prev) => ({
        ...prev,
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        skills: '',
        resume: null,
      }));
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (error) {
      setStatus({ error: error.message || 'Unable to submit application at this time.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInput = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleRoleApply = (jobId) => {
    setFormData((prev) => ({ ...prev, jobId }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageWrapper className="careers-page">
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-navy to-navy-light">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan-light text-sm font-bold tracking-wide">
              Life at Sivion
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl mt-4 mb-3 text-white">
              Soliable, Secure, High-Performance solutions & <span className="bg-gradient-to-r from-cyan-light to-purple-400 bg-clip-text text-transparent">IT realisations</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-2xl text-gray-mid text-sm md:text-base leading-relaxed">
              Build systems that move fast, scale far, and stay secure at every layer. Our careers page brings the same precision and velocity to talent acquisition.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 mt-8">
              <button type="button" className="bg-cyan-light hover:bg-cyan text-navy px-6 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleRoleApply(jobs[0]?._id || jobs[0]?.id)} disabled={jobs.length === 0}>
                {jobs.length > 0 ? 'Apply Now' : 'No Openings'}
              </button>
              <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-cyan/20 text-gray-light bg-navy-light/80 hover:bg-navy-light transition-all duration-300">
                Book Consultation
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="rounded-3xl p-6 bg-navy-light/80 border border-cyan/10 shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-black/30 text-cyan-light font-bold">
                <span>Open Roles</span>
                <span>{jobs.length}</span>
              </div>
              <div className="text-white text-lg leading-relaxed">
                High-performance engineering for enterprise systems, built with clarity and scale.
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-gray-light">
                  <span className="block text-xl font-bold">80%</span>
                  <p className="text-sm">Remote roles</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-gray-light">
                  <span className="block text-xl font-bold">24/7</span>
                  <p className="text-sm">Global hiring support</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-gray-light">
                  <span className="block text-xl font-bold">100%</span>
                  <p className="text-sm">Growth-focused culture</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Company Culture', description: 'Developer-first structure, fresh tooling and low friction decision-making.' },
              { title: 'Company Presentation', description: 'Clean narratives, polished delivery, and cohesive brand impact.' },
              { title: 'Open Roles', description: 'Flexible work styles combined with enterprise-grade accountability.' },
              { title: 'FAQ', description: 'Fast answers on benefits, equity, and growth expectations.' },
            ].map((item) => (
              <motion.div key={item.title} whileHover={{ y: -6 }} className="p-6 rounded-3xl bg-navy-light/95 border border-cyan/16 shadow-xl min-h-[190px] careers-highlight-card">
                <h3 className="text-gray-light mb-4">{item.title}</h3>
                <p className="text-gray-mid leading-relaxed mb-6">{item.description}</p>
                <span className="text-cyan-light font-bold cursor-pointer">Read More</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-light">Open <span className="bg-gradient-to-r from-cyan-light to-purple-400 bg-clip-text text-transparent">Roles</span></h2>
            <p className="text-gray-mid max-w-2xl text-base md:text-lg">Apply to roles designed for high-impact technical teams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <motion.div key={job._id || job.id} whileHover={{ y: -8 }} className="flex flex-col justify-between min-h-[250px] p-6 rounded-3xl bg-navy-light/96 border border-cyan/16 shadow-2xl careers-job-card">
                  <div>
                    <h3 className="text-gray-light mb-3">{job.title}</h3>
                    <p className="text-cyan-light mb-4">{job.department || job.dept} • {job.type}</p>
                    <p className="text-gray-mid leading-relaxed mb-6">{job.description}</p>
                  </div>
                  <button type="button" className="self-start bg-cyan-light hover:bg-cyan text-navy px-4 py-2 rounded-full font-semibold transition-all duration-300 apply-btn" onClick={() => handleRoleApply(job._id || job.id)}>
                    Apply Now
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 px-6 text-gray-mid bg-navy-light/95 border border-cyan/16 rounded-3xl">
                <p className="text-lg">No open positions available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4" ref={formRef}>
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 lg:p-8 rounded-3xl bg-navy-light/96 border border-cyan/14 text-gray-light">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan-light font-bold">
              <ShieldCheck size={18} />
              <span>Secure Application</span>
            </div>
            <h2 className="text-3xl lg:text-4xl mb-4 text-white">Submit your application</h2>
            <p className="text-gray-mid leading-relaxed mb-8">Complete the form below to share your profile and resume with our hiring team. Submissions are protected by Google reCAPTCHA.</p>
            <div className="space-y-4 p-5 rounded-2xl bg-navy/80 border border-cyan/10">
              <div>
                <h4 className="text-sm text-gray-dark mb-1">Selected role</h4>
                <p className="text-gray-light">{selectedJob?.title || 'Choose a role'}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-dark mb-1">Response time</h4>
                <p className="text-gray-light">We review applications within 48 hours.</p>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-5 p-6 lg:p-8 rounded-3xl bg-navy/95 border border-cyan/10 shadow-2xl" onSubmit={handleSubmit}>
            {status.success && <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">{status.success}</div>}
            {status.error && <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{status.error}</div>}

                 <div className="flex flex-col gap-3 md:grid-cols-2 gap-5">
              <label className="text-gray-dark text-sm font-semibold">Open Role</label>
              <select value={formData.jobId} className="w-full min-h-12 px-4 py-3 rounded-2xl border border-white/8 bg-navy/95 text-white outline-none disabled:opacity-50 appearance-none" onChange={(e) => handleInput('jobId', e.target.value)} disabled={jobs.length === 0}>
                <option value="" disabled className="text-gray-mid">{jobs.length > 0 ? 'Select a role' : 'No roles available'}</option>
                {jobs.map((job) => (
                  <option key={job._id || job.id} className="bg-navy text-white" value={job._id || job.id}>{job.title}</option>
                ))}
              </select>
              {errors.jobId && <span className="text-red-400 text-sm">{errors.jobId}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <label className="text-gray-dark text-sm font-semibold">Full Name</label>
                <input className="w-full min-h-12 px-4 py-3 rounded-2xl border border-white/8 bg-white/3 text-gray-light outline-none" type="text" value={formData.fullName} onChange={(e) => handleInput('fullName', e.target.value)} placeholder="Enter full name" />
                {errors.fullName && <span className="text-red-400 text-sm">{errors.fullName}</span>}
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-gray-dark text-sm font-semibold">Email</label>
                <input className="w-full min-h-12 px-4 py-3 rounded-2xl border border-white/8 bg-white/3 text-gray-light outline-none" type="email" value={formData.email} onChange={(e) => handleInput('email', e.target.value)} placeholder="Enter email" />
                {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <label className="text-gray-dark text-sm font-semibold">Phone</label>
                <input className="w-full min-h-12 px-4 py-3 rounded-2xl border border-white/8 bg-white/3 text-gray-light outline-none" type="tel" value={formData.phone} onChange={(e) => handleInput('phone', e.target.value)} placeholder="XXXXXXXXXX" />
                {errors.phone && <span className="text-red-400 text-sm">{errors.phone}</span>}
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-gray-dark text-sm font-semibold">Experience</label>
                <input className="w-full min-h-12 px-4 py-3 rounded-2xl border border-white/8 bg-white/3 text-gray-light outline-none" type="text" value={formData.experience} onChange={(e) => handleInput('experience', e.target.value)} placeholder="" />
                {errors.experience && <span className="text-red-400 text-sm">{errors.experience}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-gray-dark text-sm font-semibold">Key Skills</label>
              <input className="w-full min-h-12 px-4 py-3 rounded-2xl border border-white/8 bg-white/3 text-gray-light outline-none" type="text" value={formData.skills} onChange={(e) => handleInput('skills', e.target.value)} placeholder="Technical skills" />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-gray-dark text-sm font-semibold">Upload Resume</label>
              <label className="flex items-center justify-between gap-3 w-full min-h-12 px-4 py-3 rounded-2xl bg-white/3 border border-white/8 text-gray-light cursor-pointer">
                <UploadCloud size={18} />
                <span>{formData.resume ? formData.resume.name : 'Select PDF or DOCX'}</span>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleInput('resume', e.target.files?.[0] || null)} />
              </label>
              {errors.resume && <span className="text-red-400 text-sm">{errors.resume}</span>}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-gray-dark text-sm font-semibold">Verify reCAPTCHA</label>
              <div id="g-recaptcha" className="flex justify-center"></div>
              {errors.recaptcha && <span className="text-red-400 text-sm text-center">{errors.recaptcha}</span>}
            </div>

            <button type="submit" className="w-full justify-center px-6 py-3 bg-cyan-light hover:bg-cyan text-navy rounded-full font-semibold transition-all duration-300 disabled:opacity-50" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </motion.form>
        </div>
      </section>
    </PageWrapper>
  );
};

const styles = {
  heroSection: {
    padding: '6rem 0 4rem',
    background: 'linear-gradient(135deg, #031025 0%, #081d3f 100%)',
  },
  heroContent: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: '3rem',
    alignItems: 'center',
  },
  heroBadge: {
    display: 'inline-flex',
    padding: '0.85rem 1rem',
    borderRadius: '999px',
    background: 'rgba(0, 216, 255, 0.14)',
    color: '#d8f8ff',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
  },
  heroTitle: {
    fontSize: '3.6rem',
    lineHeight: 1.02,
    maxWidth: '760px',
    margin: '1.4rem 0 1rem',
    color: '#ffffff',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #2ce4ff, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    maxWidth: '680px',
    color: '#d9e8ff',
    fontSize: '1.05rem',
    lineHeight: 1.8,
  },
  heroActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  heroButton: {
    minWidth: '160px',
    background: '#22d7ff',
    borderColor: 'transparent',
    color: '#031025',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '160px',
    padding: '1rem 1.25rem',
    borderRadius: '999px',
    border: '1px solid rgba(34, 215, 255, 0.24)',
    color: '#dbeafe',
    textDecoration: 'none',
    background: 'rgba(7, 23, 46, 0.9)',
    transition: 'all 0.3s ease',
  },
  heroPanel: {
    borderRadius: '32px',
    padding: '2rem',
    background: 'rgba(4, 15, 35, 0.95)',
    border: '1px solid rgba(34, 215, 255, 0.14)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.32)',
  },
  heroPanelInner: {
    display: 'grid',
    gap: '1.5rem',
  },
  roleTag: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.85rem 1rem',
    borderRadius: '18px',
    background: 'rgba(0,0,0,0.32)',
    color: '#9dfdff',
    fontWeight: 700,
  },
  heroMetric: {
    color: '#f8fafc',
    fontSize: '1.15rem',
    lineHeight: 1.7,
  },
  heroStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '1rem',
  },
  statCard: {
    padding: '1.25rem',
    borderRadius: '22px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.07)',
    color: '#dbeafe',
  },
  highlightSection: {
    padding: '4rem 0',
  },
  highlightGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '1.5rem',
  },
  highlightCard: {
    padding: '2rem',
    borderRadius: '24px',
    background: 'rgba(6, 18, 50, 0.95)',
    border: '1px solid rgba(0, 216, 255, 0.16)',
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.22)',
    minHeight: '190px',
  },
  highlightTitle: {
    color: '#e8f7ff',
    marginBottom: '1rem',
  },
  highlightText: {
    color: '#b8d6ff',
    lineHeight: 1.85,
    marginBottom: '1.5rem',
  },
  highlightLink: {
    color: '#5ef0ff',
    fontWeight: 700,
    cursor: 'pointer',
  },
  jobsSection: {
    padding: '4rem 0',
  },
  sectionHeader: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '2.8rem',
    lineHeight: 1.05,
    marginBottom: '0.75rem',
    color: '#f8fbff',
  },
  sectionSubtitle: {
    color: '#b8d6ff',
    maxWidth: '620px',
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '1.5rem',
  },
  jobCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '250px',
    padding: '2rem',
    borderRadius: '28px',
    background: 'rgba(3, 18, 45, 0.96)',
    border: '1px solid rgba(0, 216, 255, 0.16)',
    boxShadow: '0 22px 60px rgba(0, 0, 0, 0.28)',
  },
  jobTitle: {
    marginBottom: '0.85rem',
    color: '#f8fbff',
  },
  jobMeta: {
    color: '#8ce8ff',
    marginBottom: '1rem',
  },
  jobDesc: {
    color: '#c7d9f8',
    lineHeight: 1.8,
    marginBottom: '1.8rem',
  },
  applyBtn: {
    alignSelf: 'flex-start',
    background: '#00e0ff',
    borderColor: 'transparent',
    color: '#031025',
  },
  applicationSection: {
    padding: '4rem 0 6rem',
  },
  applicationGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '2rem',
  },
  formIntro: {
    padding: '2.5rem',
    borderRadius: '28px',
    background: 'rgba(5, 20, 50, 0.96)',
    border: '1px solid rgba(0, 216, 255, 0.14)',
    color: '#eef2ff',
  },
  smallBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    padding: '0.9rem 1rem',
    borderRadius: '999px',
    background: 'rgba(0, 216, 255, 0.14)',
    border: '1px solid rgba(0, 216, 255, 0.24)',
    color: '#d1f7ff',
    fontWeight: 700,
  },
  applicationHeading: {
    fontSize: '2.4rem',
    marginBottom: '1rem',
    color: '#ffffff',
  },
  applicationText: {
    color: '#c7d9f8',
    lineHeight: 1.85,
    marginBottom: '2rem',
  },
  infoCard: {
    display: 'grid',
    gap: '1rem',
    padding: '1.5rem',
    borderRadius: '22px',
    background: 'rgba(5, 20, 45, 0.9)',
    border: '1px solid rgba(0, 216, 255, 0.12)',
  },
  infoHeading: {
    fontSize: '0.95rem',
    color: '#94a3b8',
    marginBottom: '0.35rem',
  },
  infoText: {
    color: '#eef2ff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    padding: '2.5rem',
    borderRadius: '28px',
    background: 'rgba(6, 14, 32, 0.98)',
    border: '1px solid rgba(34, 215, 255, 0.12)',
    boxShadow: '0 24px 70px rgba(0, 0, 0, 0.28)',
  },
  rowGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.25rem',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    minHeight: '52px',
    padding: '1rem 1rem',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    color: '#eef2ff',
    outline: 'none',
    fontSize: '1rem',
  },
  fileLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    width: '100%',
    minHeight: '52px',
    padding: '1rem 1rem',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#eef2ff',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  fileInput: {
    display: 'none',
  },
  recaptchaBadge: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem 1.2rem',
    borderRadius: '20px',
    background: 'rgba(0, 216, 255, 0.12)',
    border: '1px solid rgba(0, 216, 255, 0.22)',
    color: '#c6efff',
  },
  recaptchaText: {
    margin: 0,
    color: '#dbeafe',
    fontSize: '0.92rem',
    lineHeight: 1.5,
  },
  statusBox: {
    padding: '1rem 1.2rem',
    borderRadius: '18px',
    fontSize: '0.95rem',
  },
  successBox: {
    background: 'rgba(0, 225, 160, 0.12)',
    border: '1px solid rgba(0, 225, 160, 0.18)',
    color: '#d4ffe5',
  },
  errorBox: {
    background: 'rgba(255, 98, 136, 0.12)',
    border: '1px solid rgba(255, 98, 136, 0.16)',
    color: '#ffd6de',
  },
  errorText: {
    color: '#ff9fb5',
    fontSize: '0.88rem',
  },
  submitButton: {
    width: '100%',
    justifyContent: 'center',
    padding: '1rem 1.2rem',
    background: '#22d7ff',
    color: '#031025',
    borderColor: 'transparent',
  },
};

export default Careers;
