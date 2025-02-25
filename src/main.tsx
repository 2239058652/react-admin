import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter >
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
