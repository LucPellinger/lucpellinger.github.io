import { RiStackLine } from 'react-icons/ri';
import { FaCode } from 'react-icons/fa';

// portfolio section images
import FlightDataAnalysis from '../assets/Portfolio/FlightDataAnalysis.webp';
import PersonalWebsite from '../assets/Portfolio/PersonalWebsite.webp';
import BitCoinPrice from '../assets/Portfolio/BitCoinPrice.webp';
import WineDataAnalysis from '../assets/Portfolio/WineDataAnalysis.webp';
import compTSC from '../assets/Portfolio/thesis_time_series.webp';
import BloodCells from '../assets/Portfolio/BloodCells.webp';
import RAGTest from '../assets/Portfolio/RAGTest.webp';
import DataEngineeringChallenge from '../assets/Portfolio/DataEngineeringChallenge_v2.webp';
import IiRDS from '../assets/Portfolio/iiRDS.webp';

// experience section images
import PorscheImage_v1 from '../assets/Experience/porsche_v1.webp';
import PorscheImage_v2 from '../assets/Experience/porsche_v2.webp';
import DeloitteImage from '../assets/Experience/deloitte.webp';
import ConceitoImage from '../assets/Experience/conceito.webp';

// academics section images
import OstImg from '../assets/Academics/ost.webp';
import NovaImg from '../assets/Academics/novasbe.webp';
import HkaImg from '../assets/Academics/hka.webp';

import type { IconType } from 'react-icons';

/* ---------- typed data models ---------- */

export interface SkillCard {
	icon: IconType;
	title: string;
	features: string[];
}

export interface Language {
	label: string;
	percent: number;
}

export interface Slide {
	id: number;
	title: string;
	company: string;
	description: string;
	imgSrc: string;
	imgAlt: string;
	location: string;
	date_from: string;
	date_to: string;
	total_months: number;
	details: string;
	categories: string[];
	/* Experience modal content (optional — shown when present) */
	logo?: string;
	skills?: string[];
	companyDescription?: string;
	projectDescription?: string;
	impact?: string;
}

/** Role tabs in the portfolio filter are derived from these values. */
export type RoleType =
	| 'ML Engineering'
	| 'Data Engineering'
	| 'Analytics Engineering'
	| 'Data Science'
	| 'AI Engineering'
	| 'Strategic Advisory'
	| 'Web Development';

export interface PortfolioItem {
	id: number;
	src: string;
	alt: string;
	title: string;
	url: string;
	categories: string[];
	roleTypes: RoleType[];
	stack: string[];
}

export interface AcademicItem {
	id: number;
	title: string;
	subtitle: string;
	location: string;
	size: 'large' | 'medium' | 'small';
	image: string;
	link: string;
	date_from: string;
	date_to: string;
}

export interface JourneyStop {
	id: number;
	place: string;
	region: string;
	country: string;
	note?: string;
	current?: boolean;
	/** Coordinates for the globe (decimal degrees). */
	lat: number;
	lon: number;
	/** Story text shown in the globe tooltip and the timeline. */
	chapter?: string;
	/** Period lived there, as "YYYY-MM" (rendered as MM-YYYY). */
	date_from?: string;
	date_to?: string;
}

export interface Badge {
	id: number;
	title: string;
	issuer: string;
	/** "YYYY-MM" (rendered as MM-YYYY). */
	date?: string;
	/** Credential / verification link (Accredible, Snowflake, ...). */
	url?: string;
	/** Hosted badge image URL; a themed award icon is shown when absent. */
	image?: string;
}

/* ---------- data ---------- */

export const cards: SkillCard[] = [
	{
		icon: RiStackLine,
		title: 'Programming, Scripting and Data Management',
		features: [
			'Python incl. Pandas, NumPy & Scikit-learn',
			'JavaScript, HTML & CSS',
			'LaTeX',
			'SQL',
			'NoSQL',
		],
	},
	{
		icon: FaCode,
		title: 'Data Science & Machine Learning',
		features: [
			'PyTorch Lightning & TensorFlow',
			'Polars & PySpark',
			'Scikit-learn',
			'HuggingFace Smolagents',
		],
	},
	{
		icon: FaCode,
		title: 'Frontend & Data Visualization',
		features: [
			'Streamlit',
			'Gradio',
			'Tableau',
			'React.js',
		],
	},
	{
		icon: RiStackLine,
		title: 'Development & Project Management',
		features: [
			'VSCode, Jupyter Lab & Jupyter Notebook',
			'GitHub & HuggingFace Spaces',
			'GCP & Cloudera',
			'Jira & Confluence',
		],
	},
];

export const languages: Language[] = [
	{ label: 'German [native]', percent: 100 },
	{ label: 'English [fluent]', percent: 95 },
	{ label: 'French [basic]', percent: 15 },
	{ label: 'Portuguese [basic]', percent: 5 },
];

export const slidesData: Slide[] = [
	{
		id: 1,
		title: "Summer Internship AI Engineering",
		company: "Dr. Ing. h.c. F. Porsche AG",
		description: 
			"Worked on AI engineering tasks focused on improving automated machine learning workflows and model evaluation. Contributed to the development of tools supporting robust and efficient ML experimentation.",
		imgSrc: PorscheImage_v2,
		imgAlt: "Porsche Logo",
		location: "Stuttgart, Germany",
		date_from: "2024-07-01",
		date_to: "2024-08-31",
		total_months: 2,
		details:
			"...",
		categories: ["Data Science", "AI Engineering", "Automotive"],
		logo: PorscheImage_v2,
		skills: ["Python", "AutoML", "Model Evaluation", "ML Experimentation"],
		companyDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		impact: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
	},
	{
		id: 2,
		title: "Research Assistant",
		company: "Dr. Ing. h.c. F. Porsche AG",
		description: 
			"Conducted research on advanced machine learning solutions and supported technology projects within the automotive sector. Gained experience analyzing data-driven systems and advising on pipeline design.",
		imgSrc: PorscheImage_v1,
		imgAlt: "Porsche Banner",
		location: "Stuttgart, Germany",
		date_from: "2022-11-01",
		date_to: "2023-07-30",
		total_months: 9,
		details: 
			"...",
		categories: ["Research", "AI Engineering", "Automotive"],
		logo: PorscheImage_v1,
		skills: ["Python", "ML Research", "Data Pipelines", "Advisory"],
		companyDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		impact: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
	},
	{
		id: 3,
		title: "Consulting Intern at Center for Process Bionics",
		company: "Deloitte Consulting GmbH",
		description: 
			"Contributed to process mining projects and consulting service delivery by developing analytical solutions and dashboards. Assisted in analyzing business processes and identifying optimization opportunities for clients.",
		imgSrc: DeloitteImage,
		imgAlt: "Deloitte Banner",
		location: "Munich, Germany",
		date_from: "2023-03-01",
		date_to: "2023-08-31",
		total_months: 6,
		details: 
			"...",
		categories: ["Data Analytics", "Consulting", "Process Mining"],
		logo: DeloitteImage,
		skills: ["Process Mining", "Dashboards", "Analytics", "Consulting"],
		companyDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		impact: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
	},
	{
		id: 4,
		title: "Automotive Consulting Intern & Working Student",
		company: "conceito GmbH",
		description: 
			"Supported customer and data management activities for automotive clients in an international setting. Provided assistance with compliance tasks and client communications across various markets.",
		imgSrc: ConceitoImage,
		imgAlt: "conceito Banner",
		location: "Stuttgart, Germany",
		date_from: "2021-06-16",
		date_to: "2022-02-28",
		total_months: 8,
		details: 
			"...",
		categories: ["Data Analytics", "Consulting", "Compliance Analysis"],
		logo: ConceitoImage,
		skills: ["Data Management", "Compliance", "Client Communication"],
		companyDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
		impact: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — placeholder, replace with the real text.",
	},
];


export const portfolioItems: PortfolioItem[] = [
	{
		id: 1, 
		src: FlightDataAnalysis, 
		alt: 'flight data analysis', 
		title: 'Flight Data Analysis',
		url: 'https://github.com/LucPellinger/Flight-Data-Analysis',
		categories: ["Streamlit", "Folium & Pandas", "OpenAI API"],
		roleTypes: ["Analytics Engineering", "AI Engineering"],
		stack: ["Python", "Pandas", "OpenAI API"],
	},
	{ 	
		id: 2,
		src: PersonalWebsite, 
		alt: 'personal website', 
		title: 'Personal Website',
		url: 'https://github.com/LucPellinger/lucpellinger.github.io',
		categories: ["React.js", "CSS", "Java Script"],
		roleTypes: ["Web Development"],
		stack: ["JavaScript", "React"],
	},
	{ 	
		id: 3,
		src: BloodCells, 
		alt: 'Blood Cells', 
		title: 'Blood Cell Image Classification',
		url: 'https://github.com/LucPellinger/BloodCell_Image_Classification',
		categories: ["Tensorflow", "Gradio", "HuggingFace Spaces", "GCP"],
		roleTypes: ["ML Engineering", "Data Science"],
		stack: ["Python", "TensorFlow", "GCP"],
	},
	{ 	
		id: 4,
		src: WineDataAnalysis, 
		alt: 'portfolio 4', 
		title: 'Wine Quality Prediction', 
		url: 'https://github.com/LucPellinger/WineQuality_tabular_Classification/blob/main/VinifyTech.ipynb',
		categories: ["Scikit-learn", "Pandas & Matplotlib", "Jupyter Notebook"],
		roleTypes: ["Data Science"],
		stack: ["Python", "Scikit-learn", "Pandas"],
	},
	{ 
		id: 5,
		src: compTSC, 
		alt: 'TSC portfolio', 
		title: 'Time Series Classification', 
		url: 'https://github.com/LucPellinger/Time-Series-Classification',
		categories: ["PyTorch Lightning", "Polars", "Optuna"],
		roleTypes: ["ML Engineering", "Data Science"],
		stack: ["Python", "PyTorch"],
	},
	{ 
		id: 6,
		src: BitCoinPrice, 
		alt: 'portfolio 6', 
		title: 'Bitcoin Price Prediction', 
		url: 'https://github.com/novatechclub/BTC-Price-Prediction',
		categories: ["Pandas", "Scikit-Learn", "PyTorch Lightning"],
		roleTypes: ["Data Science"],
		stack: ["Python", "PyTorch", "Scikit-learn", "Pandas"],
	},
	{
		id: 7,
		src: DataEngineeringChallenge,
		alt: 'Data-Engineering-Challenge',
		title: 'Data-Engineering-Challenge',
		url: 'https://github.com/LucPellinger/data-engineering-challenge',
		categories: ["Polars", "Docker", "PostgreSQL"],
		roleTypes: ["Data Engineering"],
		stack: ["Python", "SQL", "Docker"],
	},
	{
		id: 8,
		src: IiRDS,
		alt: 'Sovereign-AI-Assistant',
		title: 'Agentic AI for iiRDS Processing',
		url: 'https://github.com/LucPellinger/sovereign-ai-assistant',
		categories: ["LangChain", "Docker", "Ollama", "iiRDS-Standard"],
		roleTypes: ["AI Engineering"],
		stack: ["Python", "LangChain", "Docker"],
	},
	//{ 
	//	id: 8,
	//	src: RAGTest, 
	//	alt: 'Local Rag test 7', 
	//	title: 'Local RAG Test', 
	//	url: 'https://huggingface.co/spaces/LucMarcelPellinger/Ollama_RAG_Agent/tree/main',
	//	categories: ["Ollama", "LangChain", "smolagents"],
	//},
];


export const academicData: AcademicItem[] = [
  {
    id: 1,
    title: "M.Sc. Business Analytics",
    subtitle: "Nova School of Business and Economics",
    location: "Lisbon, Portugal",
    size: "large",
    image: NovaImg,
    link: "https://www.novasbe.unl.pt/en/",
	date_from: "2023-08-31",
	date_to: "2025-01-17",
  },
  {
    id: 2,
    title: "B.Sc. International IT Business",
    subtitle: "Hochschule Karlsruhe – University of Applied Sciences (HKA)",
    location: "Karlsruhe, Germany",
    size: "medium",
    image: HkaImg,
    link: "https://www.h-ka.de/en/",
	date_from: "2018-09-01",
	date_to: "2023-08-31",
  },
  {
    id: 3,
    title: "Exchange Semester",
    subtitle: "OST – Eastern Switzerland University of Applied Sciences",
    location: "Rapperswil-Jona, Switzerland",
    size: "small",
    image: OstImg,
    link: "https://www.ost.ch/en/",
	date_from: "2021-09-01",
	date_to: "2022-02-01",
  },
];
export const journeyStops: JourneyStop[] = [
  {
    id: 1,
    place: "Mittelhaardt",
    region: "Weinstraße, Rhineland-Palatinate",
    country: "DE",
    note: "Where it all started",
    lat: 49.35,
    lon: 8.14,
    chapter:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Growing up between vineyards — placeholder text, replace with the real chapter.",
  },
  {
    id: 2,
    place: "Karlsruhe",
    region: "Baden-Württemberg",
    country: "DE",
    note: "B.Sc. at HKA",
    date_from: "2018-09",
    date_to: "2023-08",
    lat: 49.01,
    lon: 8.4,
    chapter:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. B.Sc. International IT Business at HKA — placeholder text, replace with the real chapter.",
  },
  {
    id: 3,
    place: "Rapperswil-Jona",
    region: "St. Gallen",
    country: "CH",
    note: "Exchange semester at OST",
    date_from: "2021-09",
    date_to: "2022-02",
    lat: 47.23,
    lon: 8.82,
    chapter:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Exchange semester at OST — placeholder text, replace with the real chapter.",
  },
  {
    id: 4,
    place: "Munich",
    region: "Bavaria",
    country: "DE",
    lat: 48.14,
    lon: 11.58,
    chapter:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Munich chapter (e.g. Deloitte) — placeholder text, replace with the real chapter.",
  },
  {
    id: 5,
    place: "Lisbon",
    region: "Portugal",
    country: "PT",
    note: "M.Sc. at Nova SBE",
    date_from: "2023-08",
    date_to: "2025-01",
    lat: 38.72,
    lon: -9.14,
    chapter:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. M.Sc. Business Analytics at Nova SBE — placeholder text, replace with the real chapter.",
  },
  {
    id: 6,
    place: "Porto",
    region: "Portugal",
    country: "PT",
    lat: 41.15,
    lon: -8.61,
    chapter:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porto chapter — placeholder text, replace with the real chapter.",
  },
  {
    id: 7,
    place: "Hamburg",
    region: "Germany",
    country: "DE",
    note: "Current home base",
    current: true,
    lat: 53.55,
    lon: 9.99,
    chapter:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hamburg, the current home base — placeholder text, replace with the real chapter.",
  },
];

export const badges: Badge[] = [
  {
    id: 1,
    title: "Accredible Badge 1 — replace with the real badge name",
    issuer: "Accredible",
    date: "2025-01",
    url: "https://www.credential.net/",
    // image: "https://... (Accredible hosted badge image URL)",
  },
  {
    id: 2,
    title: "Accredible Badge 2 — replace with the real badge name",
    issuer: "Accredible",
    date: "2025-06",
    url: "https://www.credential.net/",
  },
  {
    id: 3,
    title: "Snowflake Badge — replace with the real badge name",
    issuer: "Snowflake",
    date: "2026-01",
    url: "https://achieve.snowflake.com/",
  },
];
