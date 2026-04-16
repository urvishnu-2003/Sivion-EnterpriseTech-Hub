import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Search, Phone, Calendar } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './ThankYou.css';

const ThankYou = () => {
  const nextSteps = [
    {
      num: '01',
      icon: <Search size={22} />,
      title: 'AN EXPERT WILL REVIEW YOUR INQUIRY',
      desc: 'Our senior architects will analyze your requirements within the next business hour and assign the ideal specialist to your case.',
    },
    {
      num: '02',
      icon: <Phone size={22} />,
      title: 'WE WILL CONTACT YOU WITHIN 24 HOURS',
      desc: 'Expect a personalized response via your preferred contact channel — phone, email or video call — within 24 business hours.',
    },
    {
      num: '03',
      icon: <Calendar size={22} />,
      title: 'CONSULTATION WILL BE SCHEDULED',
      desc: 'A strategic consultation session will be booked, where we outline your custom solution roadmap and next steps.',
    },
  ];

  return (
    <PageWrapper>
      <section className="thank-you-section">
        {/* Background radial glow */}
        <div className="thank-you-glow" />

        <div className="thank-you-container">
          {/* Glowing Checkmark */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className="check-container"
          >
            <div className="check-ring">
              <CheckCircle2
                className="check-icon"
                size={52} color="#00F5FF"
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="thank-you-title"
          >
            Thank You!{' '}
            <span className="gradient-text">
              FORM SUBMITTED SUCCESSFULLY.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="thank-you-desc"
          >
            You submitted successfully! Your inquiry has been received and our team is already on it. We're committed to delivering excellence from the first interaction.
          </motion.p>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          >
            <h2 className="next-steps-title">
              Next Steps
            </h2>

            <div className="steps-grid">
              {nextSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.12 }}
                  className="step-card"
                >
                  {/* Step number watermark */}
                  <div className="step-watermark">
                    {step.num}
                  </div>
                  {/* Top accent */}
                  <div className="step-accent" />
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">
                    {step.title}
                  </h3>
                  <p className="step-desc">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          >
            <Link
              to="/"
              className="return-home-btn"
            >
              RETURN TO HOMEPAGE <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};


export default ThankYou;
