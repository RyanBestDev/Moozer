import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Home from './pages/Home.tsx';
import { SignUp } from './pages/SignUp.tsx';
import { Login } from './pages/Login.tsx';
import { Recovery } from './pages/Recovery.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Cattle from './pages/Cattle.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path='/signup'
					element={<SignUp />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/recovery'
					element={<Recovery />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/dashboard/:cattleId'
					element={<Cattle />}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
