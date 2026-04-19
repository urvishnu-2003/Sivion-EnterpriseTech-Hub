import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Building2, Mail, FileText, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import './BookTrial.css';

// ── Helpers ────────────────────────────────────────────────
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const SLOTS = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

const buildCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  // padding
  for (let i = 0; i < firstDay; i++) cells.push(null);
  // days
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
};

import { createQuote } from './admin/services/quoteService';

const BookTrial = () => {
  const navigate = useNavigate();
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState('14');
  const [form, setForm] = useState({ name: '', company: '', email: '', notes: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedSlot) {
      setStatus({ type: 'error', message: 'Please select a date and time slot.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });


    try {
      const payload = {
        requestType: 'consultation',
        fullName: form.name,
        email: form.email,
        company: form.company,
        serviceType: `${duration}-Day Trial Session`,
        preferredDate: `${MONTHS[currentMonth]} ${selectedDay}, ${currentYear}`,
        preferredTime: selectedSlot,
        projectDetails: form.notes || 'No additional notes provided.'
      };

      await createQuote(payload);

      setStatus({ type: 'success', message: 'Trial scheduled successfully!' });
      setTimeout(() => navigate('/thank-you'), 1500);
    } catch (error) {
      console.error("Booking error:", error);
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to schedule trial. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <PageWrapper>
      {/* Hero */}
      <section className="book-trial-hero">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="book-trial-badge">
          <Calendar size={14} /> Book a Trial Form
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="book-trial-title"
        >
          Book a{' '}
          <span className="gradient-text">
            Trial Session
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="book-trial-subtitle"
        >
          Choose a date and time for your complimentary enterprise consultation. Our architects are ready.
        </motion.p>
      </section>

      {/* Main booking panel */}
      <section style={{ padding: '0 5% 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="booking-panel"
        >
          {/* LEFT: CALENDAR */}
          <div className="booking-panel-left">
            <h2 className="booking-section-title">
              <Calendar size={18} color="#00F5FF" /> Select a Date
            </h2>

            {/* Month nav */}
            <div className="cal-nav">
              <button onClick={prevMonth} className="cal-nav-btn">
                <ChevronLeft size={18} />
              </button>
              <span className="cal-month-label">{MONTHS[currentMonth]} {currentYear}</span>
              <button onClick={nextMonth} className="cal-nav-btn">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day headers */}
            <div className="cal-grid-header">
              {DAYS.map(d => (
                <div key={d} className="cal-header-cell">{d}</div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="cal-grid">
              {cells.map((day, i) => {
                const isPast = isCurrentMonth && day !== null && day < today;
                const isSelected = day === selectedDay;
                return (
                  <div
                    key={i}
                    className={`cal-day${day ? '' : ' empty'}${isPast ? ' past' : ''}${isSelected ? ' selected' : ''}`}
                    onClick={() => { if (day && !isPast) { setSelectedDay(day); setSelectedSlot(null); } }}
                  >
                    {day || ''}
                  </div>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDay && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="slots-container">
                <h3 className="slots-title">
                  <Clock size={16} color="#00F5FF" /> Available Slots
                </h3>
                <div className="slots-grid">
                  {SLOTS.map(slot => (
                    <button
                      key={slot}
                      className={`slot-btn${selectedSlot === slot ? ' selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Duration selector */}
            <div className="duration-section">
              <h3>TRIAL DURATION</h3>
              <div className="duration-btns">
                {[{ val: '7', label: '7-DAY TRIAL', icon: '⚡' }, { val: '14', label: '14-DAY TRIAL', icon: '🚀' }].map(opt => (
                  <button
                    key={opt.val}
                    className={`duration-btn${duration === opt.val ? ' active' : ''}`}
                    onClick={() => setDuration(opt.val)}
                  >
                    <span className="duration-icon">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="booking-panel-divider" />

          {/* RIGHT: DETAILS FORM */}
          <div className="booking-panel-right">
            <h2 className="booking-section-title">
              <User size={18} color="#00F5FF" /> Your Details
            </h2>

            {/* Selected summary */}
            {selectedDay && selectedSlot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="booking-summary"
              >
                <CheckCircle2 size={20} color="#00F5FF" />
                <div>
                  <div className="booking-summary-text">
                    BOOKED: {MONTHS[currentMonth]} {selectedDay}, {currentYear} at {selectedSlot}
                  </div>
                  <div className="booking-summary-sub">{duration}-Day Trial Session Selected</div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="booking-form">
              {status.message && (
                <div className={`booking-status-msg ${status.type}`}>
                  {status.message}
                </div>
              )}
              <div className="float-field">
                <input
                  type="text" placeholder=" " required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <label>Full Name *</label>
              </div>

              <div className="float-field">
                <input
                  type="text" placeholder=" "
                  value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                />
                <label>Company Name</label>
              </div>

              <div className="float-field">
                <input
                  type="email" placeholder=" " required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <label>Work Email *</label>
              </div>

              <div className="float-field">
                <textarea
                  rows={4} placeholder=" "
                  value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                />
                <label>Notes / Agenda</label>
              </div>

              <button
                type="submit"
                className="schedule-btn"
              >


                Schedule Trial <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};


export default BookTrial;
