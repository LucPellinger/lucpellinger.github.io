///import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyHeader from './components/header/MyHeader';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import MyModal from './components/modal/MyModal';
import { useState } from 'react';
import { experiences } from './utils/experienceData.js';
import MyExperienceModal from './components/modal/MyExperienceModal'; 
import Footer from './components/footer/Footer';

function App() {
	const [showCVModal, setShowCVModal] = useState(false);
	const [selectedExperience, setSelectedExperience] = useState(null);


	return (
		<div className='app'>
			<ThemeProvider>
				{showCVModal && <MyModal onClose={() => setShowCVModal(false)} />}
				{selectedExperience && (
					<MyExperienceModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
				)}
				<MyHeader onResumeClick={() => setShowCVModal(true)} />
				<Home 	
					onResumeClick={() => setShowCVModal(true)}
					onExperienceClick={(experience) => setSelectedExperience(experience)}
				/>
				<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;
