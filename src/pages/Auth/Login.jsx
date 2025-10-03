import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginRequest, setToken, getCurrentUser, isAdmin } from '../../lib/api';
import { Meteors } from '../../components/ui/meteors';

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const from = params.get('from') || '/courses';
	const notice = params.get('notice');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [info, setInfo] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (notice) setInfo(notice);
	}, [notice]);

	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const data = await loginRequest({ email, password });
			setToken(data.access_token);
			
			// Check if user is admin after setting token
			const userIsAdmin = isAdmin();
			const user = getCurrentUser();
			
			if (userIsAdmin) {
				// Redirect admin to dashboard
				navigate('/admin');
			} else {
				// Redirect regular user to requested page or courses
				const redirectTo = from === '/admin' ? '/courses' : from;
				navigate(redirectTo);
			}
		} catch (err) {
			setError(err.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-[70vh] flex items-center justify-center relative" style={{ padding: '4%' }}>
			<Meteors number={18} />
			<div className="relative w-full max-w-md">
				<div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl opacity-70 animate-gradient-xy" />
				<div className="relative bg-gray-900/80 rounded-xl border border-gray-800/50 p-6 backdrop-blur-xl">
					<h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
					{info && <div className="mb-3 text-blue-400">{info}</div>}
					{error && <div className="mb-3 text-red-400">{error}</div>}
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1 text-gray-300">Email</label>
							<input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" />
						</div>
						<div>
							<label className="block text-sm mb-1 text-gray-300">Password</label>
							<input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" />
						</div>
						<div className="flex items-center justify-between">
							<button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
								{loading ? 'Signing in...' : 'Login'}
							</button>
							<Link to="/signup" className="text-sm text-cyan-400 hover:text-cyan-300">Don’t have an account? Sign up</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
} 