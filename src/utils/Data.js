import { RiStackLine } from 'react-icons/ri';
import { FaCode } from 'react-icons/fa';

// portfolio section images
import FlightDataAnalysis from '../assets/Portfolio/FlightDataAnalysis.png';
import PersonalWebsite from '../assets/Portfolio/PersonalWebsite.png';
import BitCoinPrice from '../assets/Portfolio/BitCoinPrice.png';
import WineDataAnalysis from '../assets/Portfolio/WineDataAnalysis.png';
import compTSC from '../assets/Portfolio/compTSC.png';
import BloodCells from '../assets/Portfolio/BloodCells.png';
import RAGTest from '../assets/Portfolio/RAGTest.png';

// experience section images
import PorscheImage_v1 from '../assets/Experience/porsche_v1.png';
import PorscheImage_v2 from '../assets/Experience/porsche_v2.png';
import DeloitteImage from '../assets/Experience/deloitte.png';
import ConceitoImage from '../assets/Experience/conceito.png';

// academics section images
import OstImg from '../assets/Academics/ost.png';
import NovaImg from '../assets/Academics/novasbe.png';
import HkaImg from '../assets/Academics/hka_2.png';


export const cards = [
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

export const languages = [
  	  	{ label: 'German [native]', percent: 100 },
  	  	{ label: 'English [fluent]', percent: 95 },
  	  	{ label: 'French [basic]', percent: 15 },
  	  	{ label: 'Portuguese [basic]', percent: 5 },
  	];

export const slidesData = [
	{
		id: 1,
		title: "AI Engineering Working Student",
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
	},
];


export const portfolioItems = [
	{
		id: 1, 
		src: FlightDataAnalysis, 
		alt: 'flight data analysis', 
		title: 'Flight Data Analysis',
		url: 'https://github.com/LucPellinger/Flight-Data-Analysis',
		categories: ["Streamlit", "Folium & Pandas", "OpenAI API"],
	},
	{ 	
		id: 2,
		src: PersonalWebsite, 
		alt: 'personal website', 
		title: 'Personal Website',
		url: 'https://github.com/LucPellinger/lucpellinger.github.io',
		categories: ["React.js", "CSS", "Java Script"],
	},
	{ 	
		id: 3,
		src: BloodCells, 
		alt: 'Blood Cells', 
		title: 'Blood Cell Image Classification',
		url: 'https://github.com/LucPellinger/BloodCell_Image_Classification',
		categories: ["Tensorflow", "Gradio", "HuggingFace Spaces", "GCP"], 
	},
	{ 	
		id: 4,
		src: WineDataAnalysis, 
		alt: 'portfolio 4', 
		title: 'Wine Quality Prediction', 
		url: 'https://github.com/LucPellinger/WineQuality_tabular_Classification/blob/main/VinifyTech.ipynb',
		categories: ["Scikit-learn", "Pandas & Matplotlib", "Jupyter Notebook"],
	},
	{ 
		id: 5,
		src: compTSC, 
		alt: 'TSC portfolio', 
		title: 'Time Series Classification', 
		url: 'https://github.com/LucPellinger/Time-Series-Classification',
		categories: ["PyTorch Lightning", "Polars", "Optuna"],
	},
	{ 
		id: 6,
		src: BitCoinPrice, 
		alt: 'portfolio 6', 
		title: 'Bitcoin Price Prediction', 
		url: 'https://github.com/novatechclub/BTC-Price-Prediction',
		categories: ["Pandas", "Scikit-Learn", "PyTorch Lightning"],
	},
	{ 
		id: 7,
		src: RAGTest, 
		alt: 'Local Rag test 7', 
		title: 'Local RAG Test', 
		url: 'https://huggingface.co/spaces/LucMarcelPellinger/Ollama_RAG_Agent/tree/main',
		categories: ["Ollama", "LangChain", "smolagents"],
	},
];


export const academicData = [
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
    subtitle: "Hochschule Karlsruhe",
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
    subtitle: "OST - Eastern Switzerland University of Applied Sciences",
    location: "Rapperswil-Jona, Switzerland",
    size: "small",
    image: OstImg,
    link: "https://www.ost.ch/en/",
	date_from: "2021-09-01",
	date_to: "2022-02-01",
  },
];