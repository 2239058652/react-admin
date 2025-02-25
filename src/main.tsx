import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter >
    <App />
  </BrowserRouter>
);
