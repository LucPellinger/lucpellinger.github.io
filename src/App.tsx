import MyHeader from './components/header/MyHeader';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import MyModal from './components/modal/MyModal';
import { useState } from 'react';
import Footer from './components/footer/Footer';
import ScrollBackground from './components/background/ScrollBackground';

function App() {
	const [showCVModal, setShowCVModal] = useState(false);

	return (
		<div className='app'>
			<ThemeProvider>
				<ScrollBackground />
				{showCVModal && <MyModal onClose={() => setShowCVModal(false)} />}
				<MyHeader />
				<Home onResumeClick={() => setShowCVModal(true)} />
				<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;
