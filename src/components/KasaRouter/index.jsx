
import { Routes, Route } from 'react-router-dom';

// Import pages components
import Home from '../../pages/Home';
import About from '../../pages/About';
import Overview from '../../pages/Overview';
import Error404 from '../../pages/404';

function KasaRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/location/:idLocation" element={<Overview />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default KasaRouter;