import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import IndexPage from "./app/IndexPage";
import Layout from "./app/Layout";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <IndexPage />
    </Layout>
  </React.StrictMode>,
)
