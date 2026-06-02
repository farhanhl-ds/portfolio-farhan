import { Database, Binary, GitBranch, TableProperties, LayoutDashboard, Cpu, LineChart } from "lucide-react";
import type { ComponentType } from "react";

import staywiseThumb from "@/assets/images/projects/staywise-thumb.webp";
import ecommerceEtlThumb from "@/assets/images/projects/ecommerce-etl-thumb.webp";
import earthquakeMlThumb from "@/assets/images/projects/earthquake-ml-thumb.webp";

const COMING_SOON_THUMBNAIL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230a0a0a'/%3E%3Cstop offset='1' stop-color='%23141414'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  uid: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  thumbnail: string;
  fullDescription: string;
  techStack: string[];
  metrics: ProjectMetric[];
  challenge: string;
  solution: string;
  githubUrl: string;
}

export const baseProjects: ProjectItem[] = [
  {
    id: "01",
    uid: "p1",
    label: "MLOPS PLATFORM",
    icon: Database,
    title: "StayWise — E-Commerce MLOps Platform",
    description:
      "Production-grade churn prediction platform with Airflow pipelines, MLflow tracking, and Next.js + FastAPI dashboard for retention analytics.",
    thumbnail: staywiseThumb,
    fullDescription:
      "End-to-end MLOps stack architected from scratch: PostgreSQL data warehouse, Airflow DAG for RFM feature engineering, MLflow for experiment tracking, and a Next.js + FastAPI dashboard with choropleth maps and AI-powered analytics via Ollama streaming SSE.",
    techStack: [
      "Apache Airflow",
      "MLflow",
      "PostgreSQL",
      "FastAPI",
      "Next.js",
      "Docker",
      "Kafka",
      "Redis",
      "AWS S3",
    ],
    metrics: [
      { value: "9+", label: "DW Tables" },
      { value: "Star", label: "Schema Design" },
      { value: "Full", label: "Docker Compose" },
    ],
    challenge:
      "Orchestrating the full ML lifecycle — from raw e-commerce transactions to churn predictions — with reproducible pipelines and real-time dashboard updates.",
    solution:
      "Built modular Airflow DAGs for ingestion and feature engineering, integrated MLflow for model versioning, and exposed results via FastAPI with streaming SSE for live AI analytics.",
    githubUrl: "https://github.com/farhanhl-ds/staywise-ml-churn-platform",
  },
  {
    id: "02",
    uid: "p2",
    label: "DATA ENGINEERING",
    icon: GitBranch,
    title: "E-Commerce Batch ETL Pipeline",
    description:
      "End-to-end Airflow batch pipeline processing 128K+ Amazon India transactions with Great Expectations validation and Elasticsearch analytics.",
    thumbnail: ecommerceEtlThumb,
    fullDescription:
      "Batch ETL pipeline orchestrated with Apache Airflow, ingesting from PostgreSQL, validated with Great Expectations for schema drift and null violations, and loaded into Elasticsearch for downstream Kibana dashboards tracking sales KPIs.",
    techStack: [
      "Apache Airflow",
      "PostgreSQL",
      "Great Expectations",
      "Elasticsearch",
      "Kibana",
      "Docker",
    ],
    metrics: [
      { value: "128K+", label: "Transactions" },
      { value: "100%", label: "Data Validated" },
      { value: "0", label: "Schema Breaches" },
    ],
    challenge:
      "Ensuring data quality across heterogeneous transaction records before loading into analytics layer, without manual intervention.",
    solution:
      "Implemented Great Expectations data quality gates catching schema drift and null violations automatically, with Airflow orchestrating the full pipeline end-to-end.",
    githubUrl: "https://github.com/farhanhl-ds/amazon-india-sales-analytics-pipeline",
  },
  {
    id: "03",
    uid: "p3",
    label: "MACHINE LEARNING",
    icon: Binary,
    title: "Earthquake Building Damage Prediction",
    description:
      "Deployed multiclass classification service on 762K building records from 2015 Nepal earthquake, live on HuggingFace Spaces.",
    thumbnail: earthquakeMlThumb,
    fullDescription:
      "Multiclass classification pipeline (Random Forest) trained on 762K records from the 2015 Nepal earthquake dataset. Handled class imbalance and prevented data leakage, deployed as a production-ready Streamlit app on HuggingFace Spaces supporting single and batch CSV inference.",
    techStack: [
      "Scikit-learn",
      "imbalanced-learn",
      "Streamlit",
      "HuggingFace Spaces",
      "Python",
      "Pandas",
    ],
    metrics: [
      { value: "762K", label: "Records" },
      { value: "3", label: "Damage Classes" },
      { value: "Live", label: "HuggingFace Deploy" },
    ],
    challenge:
      "Severe class imbalance across damage categories and risk of data leakage when engineering features from post-disaster survey data.",
    solution:
      "Applied SMOTE for class balancing and enforced strict train-test split discipline to prevent leakage, resulting in a reliable deployed inference service.",
    githubUrl: "https://github.com/farhanhl-ds/earthquake-building-damage-predictor",
  },
  {
    id: "04",
    uid: "p4",
    label: "COMING SOON",
    icon: GitBranch,
    title: "RockVision",
    description: "Auto classfication rock samples using computer vision. Coming soon.",
    thumbnail: COMING_SOON_THUMBNAIL,
    fullDescription:
      "This project is currently in development. Details will be updated upon completion.",
    techStack: ["Python", "PyTorch", "FastAPI", "OpenCV", "HuggingFace", "Docker"],
    metrics: [
      { value: "—", label: "Coming Soon" },
      { value: "—", label: "—" },
      { value: "—", label: "—" },
    ],
    challenge: "To be documented upon completion.",
    solution: "To be documented upon completion.",
    githubUrl: "",
  },
  {
    id: "05",
    uid: "p5",
    label: "COMING SOON",
    icon: TableProperties,
    title: "Xpense365",
    description:
      "Cloud daily household expense service and automation. Coming soon.",
    thumbnail: COMING_SOON_THUMBNAIL,
    fullDescription:
      "This project is currently in development. Details will be updated upon completion.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "Telegram Bot API", "n8n"],
    metrics: [
      { value: "—", label: "Coming Soon" },
      { value: "—", label: "—" },
      { value: "—", label: "—" },
    ],
    challenge: "To be documented upon completion.",
    solution: "To be documented upon completion.",
    githubUrl: "",
  },
  {
    id: "06",
    uid: "p6",
    label: "COMING SOON",
    icon: LayoutDashboard,
    title: "ApplyIQ",
    description:
      "AI-powered SaaS that auto-applies to jobs and tailors your CV for each listing using LLM. Coming soon.",
    thumbnail: COMING_SOON_THUMBNAIL,
    fullDescription:
      "This project is currently in development. Details will be updated upon completion.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Claude API", "Docker", "Puppeteer"],
    metrics: [
      { value: "—", label: "Coming Soon" },
      { value: "—", label: "—" },
      { value: "—", label: "—" },
    ],
    challenge: "To be documented upon completion.",
    solution: "To be documented upon completion.",
    githubUrl: "",
  },
  {
    id: "07",
    uid: "p7",
    label: "COMING SOON",
    icon: Cpu,
    title: "RMT52",
    description:
      "ML-powered Automated Valuation Model and property recommender system for the Bandung housing market. Coming soon.",
    thumbnail: COMING_SOON_THUMBNAIL,
    fullDescription:
      "This project is currently in development. Details will be updated upon completion.",
    techStack: ["Python", "XGBoost", "FastAPI", "PostgreSQL", "Scikit-learn", "Streamlit"],
    metrics: [
      { value: "—", label: "Coming Soon" },
      { value: "—", label: "—" },
      { value: "—", label: "—" },
    ],
    challenge: "To be documented upon completion.",
    solution: "To be documented upon completion.",
    githubUrl: "",
  },
];
