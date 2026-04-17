import React, { useEffect, useRef, useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Rocket, Zap, Heart, Globe, ArrowRight, CheckCircle2, ShieldCheck, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Careers.css';


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
      <section className="careers-hero">
        <div className="careers-hero-grid">
          <div>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="role-badge">
              Life at Sivion
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="careers-hero-title">
              Soliable, Secure, High-Performance solutions & <span className="bg-gradient-to-r from-cyan-light to-purple-400 bg-clip-text text-transparent">IT realisations</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="careers-hero-subtitle">
              Build systems that move fast, scale far, and stay secure at every layer. Our careers page brings the same precision and velocity to talent acquisition.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-row flex-wrap items-center gap-4 mt-8">
              <button type="button" className="premium-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleRoleApply(jobs[0]?._id || jobs[0]?.id)} disabled={jobs.length === 0}>
                {jobs.length > 0 ? 'Apply Now' : 'No Openings'}
              </button>
              <Link to="/contact" className="outline-btn px-6 py-3 rounded-full">
                Book Consultation
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="hero-stats-panel">
            <div className="space-y-6">
              <div className="role-tag-box">
                <span>Open Roles</span>
                <span>{jobs.length}</span>
              </div>
              <div className="text-white text-lg leading-relaxed">
                High-performance engineering for enterprise systems, built with clarity and scale.
              </div>
              <div className="stats-grid-mini">
                <div className="stat-item-card">
                  <span className="stat-val">80%</span>
                  <p className="stat-desc">Remote roles</p>
                </div>
                <div className="stat-item-card">
                  <span className="stat-val">24/7</span>
                  <p className="stat-desc">Global hiring support</p>
                </div>
                <div className="stat-item-card">
                  <span className="stat-val">100%</span>
                  <p className="stat-desc">Growth-focused culture</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="careers-highlights-section">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Company Culture', description: 'Developer-first structure, fresh tooling and low friction decision-making.' },
              { title: 'Company Presentation', description: 'Clean narratives, polished delivery, and cohesive brand impact.' },
              { title: 'Open Roles', description: 'Flexible work styles combined with enterprise-grade accountability.' },
              { title: 'FAQ', description: 'Fast answers on benefits, equity, and growth expectations.' },
            ].map((item) => (
              <motion.div key={item.title} whileHover={{ y: -6 }} className="careers-highlight-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="read-more">Read More</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-jobs-section">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="job-section-title">Open <span className="bg-gradient-to-r from-cyan-light to-purple-400 bg-clip-text text-transparent">Roles</span></h2>
            <p className="job-section-subtitle">Apply to roles designed for high-impact technical teams.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <motion.div key={job._id || job.id} whileHover={{ y: -8 }} className="careers-job-card">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="job-meta">{job.department || job.dept} • {job.type}</p>
                    <p className="job-desc">{job.description}</p>
                  </div>
                  <button type="button" className="apply-btn bg-cyan-light hover:bg-cyan text-navy px-6 py-2.5 rounded-full font-bold transition-all duration-300" onClick={() => handleRoleApply(job._id || job.id)}>
                    Apply Now
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 px-6 text-gray-mid bg-navy-light/95 border border-cyan/16 rounded-3xl">
                <p className="text-lg">No open positions available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="careers-form-section" ref={formRef}>
        <div className="application-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="application-form-intro">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 text-cyan-light font-bold">
              <ShieldCheck size={18} />
              <span>Secure Application</span>
            </div>
            <h2 className="text-3xl lg:text-4xl mb-4 text-white">Submit your application</h2>
            <p className="text-[#c7d9f8] leading-relaxed mb-8">Complete the form below to share your profile and resume with our hiring team. Submissions are protected by Google reCAPTCHA.</p>
            <div className="role-info-card">
              <div>
                <h4>Selected role</h4>
                <p>{selectedJob?.title || 'Choose a role'}</p>
              </div>
              <div>
                <h4>Response time</h4>
                <p>We review applications within 48 hours.</p>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="application-form-box" onSubmit={handleSubmit}>
            {status.success && <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">{status.success}</div>}
            {status.error && <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{status.error}</div>}

            <div className="flex flex-col gap-1.5">
              <label className="careers-form-label">Open Role</label>
              <select value={formData.jobId} className="careers-input appearance-none" onChange={(e) => handleInput('jobId', e.target.value)} disabled={jobs.length === 0}>
                <option value="" disabled className="text-gray-mid">{jobs.length > 0 ? 'Select a role' : 'No roles available'}</option>
                {jobs.map((job) => (
                  <option key={job._id || job.id} className="bg-navy text-white" value={job._id || job.id}>{job.title}</option>
                ))}
              </select>
              {errors.jobId && <span className="text-red-400 text-sm">{errors.jobId}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="careers-form-label">Full Name</label>
                <input className="careers-input" type="text" value={formData.fullName} onChange={(e) => handleInput('fullName', e.target.value)} placeholder="Enter full name" />
                {errors.fullName && <span className="text-red-400 text-sm">{errors.fullName}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="careers-form-label">Email</label>
                <input className="careers-input" type="email" value={formData.email} onChange={(e) => handleInput('email', e.target.value)} placeholder="Enter email" />
                {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="careers-form-label">Phone</label>
                <input className="careers-input" type="tel" value={formData.phone} onChange={(e) => handleInput('phone', e.target.value)} placeholder="XXXXXXXXXX" />
                {errors.phone && <span className="text-red-400 text-sm">{errors.phone}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="careers-form-label">Experience</label>
                <input className="careers-input" type="text" value={formData.experience} onChange={(e) => handleInput('experience', e.target.value)} placeholder="Years of experience" />
                {errors.experience && <span className="text-red-400 text-sm">{errors.experience}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="careers-form-label">Key Skills</label>
              <input className="careers-input" type="text" value={formData.skills} onChange={(e) => handleInput('skills', e.target.value)} placeholder="Technical skills" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="careers-form-label">Upload Resume</label>
              <label className="resume-upload-label">
                <UploadCloud size={18} />
                <span>{formData.resume ? formData.resume.name : 'Select PDF or DOCX'}</span>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleInput('resume', e.target.files?.[0] || null)} />
              </label>
              {errors.resume && <span className="text-red-400 text-sm">{errors.resume}</span>}
            </div>

            <div className="flex flex-col gap-3 items-center">
              <label className="careers-form-label self-start">Verify reCAPTCHA</label>
              <div className="recaptcha-themed-badge">
                <div id="g-recaptcha"></div>
              </div>
              {errors.recaptcha && <span className="text-red-400 text-sm text-center">{errors.recaptcha}</span>}
            </div>

            <button type="submit" className="premium-btn w-full justify-center px-6 py-4 rounded-full font-bold transition-all duration-300 disabled:opacity-50" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </motion.form>
        </div>
      </section>
    </PageWrapper>
  );
};



export default Careers;