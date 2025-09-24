import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../lib/api';
import { Meteors } from '../../components/ui/meteors';

export default function Signup() {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const res = await fetch(`${API_BASE_URL}/auth/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			});
			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || 'Signup failed');
			}
			navigate('/login?notice=Account created. Please login');
		} catch (err) {
			setError(err.message || 'Signup failed');
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
					<h1 className="text-2xl font-bold mb-4 text-white">Sign up</h1>
					{error && <div className="mb-3 text-red-400">{error}</div>}
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1 text-gray-300">Name</label>
							<input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" />
						</div>
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
								{loading ? 'Creating...' : 'Create account'}
							</button>
							<Link to="/login" className="text-sm text-cyan-400 hover:text-cyan-300">Already have an account? Login</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
} 