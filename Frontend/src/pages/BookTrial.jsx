import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Building2, Mail, FileText, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SLOTS = ['09:00 AM','10:00 AM','11:00 AM','02:00 PM','03:00 PM','04:00 PM'];

function buildCalendar(year, month) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const BookTrial = () => {
  const navigate = useNavigate();
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState('14');
  const [form, setForm] = useState({ name: '', company: '', email: '', notes: '' });
  const [step, setStep] = useState(1); // 1=calendar, 2=details, 3=confirm

  const cells = buildCalendar(currentYear, currentMonth);
  const today = now.getDate();
  const isCurrentMonth = currentMonth === now.getMonth() && currentYear === now.getFullYear();

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelectedDay(null); setSelectedSlot(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelectedDay(null); setSelectedSlot(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/thank-you');
  };

  return (
    <PageWrapper>
      <style>{`
        .cal-day { transition: all 0.2s ease; cursor: pointer; }
        .cal-day:hover:not(.past):not(.empty) { background: rgba(0,245,255,0.15); border-color: #00F5FF; color: #fff; }
        .cal-day.selected { background: #00F5FF !important; color: #0A192F !important; border-color: #00F5FF !important; font-weight:700; }
        .slot-btn { transition:all 0.2s ease; cursor:pointer; }
        .slot-btn:hover { background:rgba(0,245,255,0.15); border-color:#00F5FF; color:#fff; }
        .slot-btn.selected { background:#00F5FF; color:#0A192F; font-weight:700; border-color:#00F5FF; }
        .duration-btn { transition:all 0.2s ease; cursor:pointer; }
        .duration-btn:hover { border-color:#00F5FF; color:#fff; }
        .duration-btn.active { background:rgba(0,245,255,0.15); border-color:#00F5FF; color:#00F5FF; }
        .float-input { position:relative; margin-bottom:1.5rem; }
        .float-input input, .float-input textarea {
          width:100%; background:rgba(10,25,47,0.8); border:1px solid rgba(255,255,255,0.1);
          border-radius:10px; padding:1.25rem 1rem 0.6rem; color:#fff; font-size:0.95rem;
          transition:border 0.2s; outline:none; font-family:inherit;
        }
        .float-input input:focus, .float-input textarea:focus { border-color:#00F5FF; }
        .float-input label {
          position:absolute; top:0.75rem; left:1rem; color:#64748b; font-size:0.78rem;
          font-weight:600; letter-spacing:0.5px; pointer-events:none;
        }
        .float-input input:not(:placeholder-shown) + label,
        .float-input input:focus + label { color:#00F5FF; font-size:0.7rem; top:0.35rem; }
      `}</style>

      {/* Hero */}
      <section style={{ padding: '7rem 5% 3rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '3px', color: '#00F5FF', padding: '0.5rem 1.2rem',
          background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: 50, marginBottom: '1.5rem'
        }}>
          <Calendar size={14} /> Book a Trial Form
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}
        >
          Book a{' '}
          <span style={{ background: 'linear-gradient(135deg,#00F5FF,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Trial Session
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 2rem' }}
        >
          Choose a date and time for your complimentary enterprise consultation. Our architects are ready.
        </motion.p>
      </section>

      {/* Main booking panel */}
      <section style={{ padding: '0 5% 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{
            maxWidth: 1000, margin: '0 auto',
            background: 'rgba(17,34,64,0.7)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,245,255,0.15)', borderRadius: 24,
            overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1px 1fr'
          }}
        >
          {/* LEFT: CALENDAR */}
          <div style={{ padding: '3rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
              <Calendar size={18} color="#00F5FF" /> Select a Date
            </h2>

            {/* Month nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <button onClick={prevMonth} style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: 8, padding: '0.4rem 0.7rem', color: '#00F5FF', cursor: 'pointer' }}>
                <ChevronLeft size={18} />
              </button>
              <span style={{ color: '#fff', fontWeight: 700 }}>{MONTHS[currentMonth]} {currentYear}</span>
              <button onClick={nextMonth} style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: 8, padding: '0.4rem 0.7rem', color: '#00F5FF', cursor: 'pointer' }}>
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: '0.5rem' }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', color: '#64748b', fontSize: '0.72rem', fontWeight: 600, padding: '0.25rem' }}>{d}</div>
              ))}
            </div>

            {/* Calendar cells */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {cells.map((day, i) => {
                const isPast = isCurrentMonth && day !== null && day < today;
                const isSelected = day === selectedDay;
                return (
                  <div
                    key={i}
                    className={`cal-day${day ? '' : ' empty'}${isPast ? ' past' : ''}${isSelected ? ' selected' : ''}`}
                    onClick={() => { if (day && !isPast) { setSelectedDay(day); setSelectedSlot(null); } }}
                    style={{
                      textAlign: 'center', padding: '0.5rem 0.25rem',
                      borderRadius: 8, border: '1px solid transparent',
                      color: isPast ? '#2a3a52' : day ? '#cbd5e1' : 'transparent',
                      fontSize: '0.85rem',
                      cursor: day && !isPast ? 'pointer' : 'default',
                      background: isSelected ? '#00F5FF' : 'transparent',
                    }}
                  >
                    {day || ''}
                  </div>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDay && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={16} color="#00F5FF" /> Available Slots
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {SLOTS.map(slot => (
                    <button
                      key={slot}
                      className={`slot-btn${selectedSlot === slot ? ' selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '0.6rem 0.5rem', fontSize: '0.78rem', fontWeight: 600,
                        background: selectedSlot === slot ? '#00F5FF' : 'rgba(10,25,47,0.6)',
                        border: `1px solid ${selectedSlot === slot ? '#00F5FF' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 8, color: selectedSlot === slot ? '#0A192F' : '#94a3b8'
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Duration selector */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>TRIAL DURATION</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[{ val: '7', label: '7-DAY TRIAL', icon: '⚡' }, { val: '14', label: '14-DAY TRIAL', icon: '🚀' }].map(opt => (
                  <button
                    key={opt.val}
                    className={`duration-btn${duration === opt.val ? ' active' : ''}`}
                    onClick={() => setDuration(opt.val)}
                    style={{
                      flex: 1, padding: '0.875rem', fontSize: '0.82rem', fontWeight: 700,
                      background: duration === opt.val ? 'rgba(0,245,255,0.1)' : 'rgba(10,25,47,0.6)',
                      border: `1px solid ${duration === opt.val ? '#00F5FF' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 10, color: duration === opt.val ? '#00F5FF' : '#64748b',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ background: 'rgba(0,245,255,0.1)', width: 1 }} />

          {/* RIGHT: DETAILS FORM */}
          <div style={{ padding: '3rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
              <User size={18} color="#00F5FF" /> Your Details
            </h2>

            {/* Selected summary */}
            {selectedDay && selectedSlot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)',
                  borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '2rem',
                  display: 'flex', alignItems: 'center', gap: 12
                }}
              >
                <CheckCircle2 size={20} color="#00F5FF" />
                <div>
                  <div style={{ color: '#00F5FF', fontSize: '0.8rem', fontWeight: 700, fontFamily: '"JetBrains Mono",monospace' }}>
                    BOOKED: {MONTHS[currentMonth]} {selectedDay}, {currentYear} at {selectedSlot}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{duration}-Day Trial Session Selected</div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div className="float-input">
                <input
                  type="text" placeholder=" " required
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <label>Full Name *</label>
              </div>

              <div className="float-input">
                <input
                  type="text" placeholder=" "
                  value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                />
                <label>Company Name</label>
              </div>

              <div className="float-input">
                <input
                  type="email" placeholder=" " required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <label>Work Email *</label>
              </div>

              <div className="float-input">
                <textarea
                  rows={4} placeholder=" "
                  value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  style={{ resize: 'vertical', padding: '1.25rem 1rem 0.5rem' }}
                />
                <label>Notes / Agenda</label>
              </div>

              <button
                type="submit"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '1rem 2rem', width: '100%',
                  background: 'linear-gradient(135deg,#00F5FF,#0066FF)',
                  color: '#0A192F', borderRadius: 12, fontWeight: 800, fontSize: '1rem',
                  border: 'none', cursor: 'pointer', letterSpacing: '0.5px',
                  boxShadow: '0 8px 30px rgba(0,245,255,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s', marginTop: '0.5rem'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,245,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,245,255,0.35)'; }}
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
