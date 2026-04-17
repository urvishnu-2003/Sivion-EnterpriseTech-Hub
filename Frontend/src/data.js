import bankingImg from './assets/casestudies/banking.png';
import cloudImg from './assets/casestudies/cloud.png';
import logisticsImg from './assets/casestudies/logistics.png';
import erpImg from './assets/casestudies/erp.png';

export const projects = [
  {
    id: 1,
    title: "The Sentient Bank",
    category: "AI",
    desc: "Fraud detection system",
    stats: "99.4% Accuracy",
    image: bankingImg,

    details: {
      problem: "Bank was facing fraud detection issues in r in real-time Bank wore",
      solution: "Built AI-based fraud detection system using ML models.",
      result: "Achieved 99.4% accuracy and reduced fraud significantly.",
      tech: ["Python", "TensorFlow", "AWS"]
    }
  },
  {
    id: 2,
    title: "Cloud Migration",
    category: "Cloud",
    desc: "Multi-cloud system",
    stats: "0% Downtime",
    image: cloudImg,

    details: {
      problem: "Legacy systems were slow and expensive.",
      solution: "Migrated infrastructure to AWS cloud.",
      result: "Reduced downtime and improved scalability.",
      tech: ["AWS", "Docker", "Kubernetes"]
    }
  },
  {
    id: 3,
    title: "Logistics AI",
    category: "Strategy",
    desc: "Supply chain optimization",
    stats: "30% Efficiency",
    image: logisticsImg,

    details: {
      problem: "Inefficient logistics planning.",
      solution: "AI-driven route optimization.",
      result: "Improved delivery efficiency by 30%.",
      tech: ["Python", "AI", "Optimization"]
    }
  },
  {
    id: 4,
    title: "ERP System",
    category: "Software",
    desc: "Enterprise platform",
    stats: "High performance",
    image: erpImg,

    details: {
      problem: "Disconnected business systems.",
      solution: "Built centralized ERP system.",
      result: "Improved productivity and workflow.",
      tech: ["React", "Node.js", "MySQL"]
    }
  },
];