import "./global.css";

import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './app/store';
import { ThemeProvider } from './context/ThemeContext';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
