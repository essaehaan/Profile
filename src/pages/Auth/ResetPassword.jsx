import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../lib/api';
import { Meteors } from '../../components/ui/meteors';

export default function ResetPassword() {
	const navigate = useNavigate();
	const location = useLocation();
	const [token, setToken] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		setToken(params.get('token') || '');
	}, [location.search]);

	async function onSubmit(e) {
		e.preventDefault();
		if (!token) return setError('Invalid or missing token');
		if (password !== confirm) return setError('Passwords do not match');
		setLoading(true);
		setError('');
		setMessage('');
		try {
			await resetPassword({ token, password });
			setMessage('Password has been reset. You can now login.');
			setTimeout(() => navigate('/login?notice=Password updated. Please login'), 800);
		} catch (err) {
			setError(err.message || 'Failed to reset password');
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
					<h1 className="text-2xl font-bold mb-4 text-white">Reset Password</h1>
					{message && <div className="mb-3 text-green-400">{message}</div>}
					{error && <div className="mb-3 text-red-400">{error}</div>}
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1 text-gray-300">New password</label>
							<input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" />
						</div>
						<div>
							<label className="block text-sm mb-1 text-gray-300">Confirm password</label>
							<input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="w-full border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" />
						</div>
						<button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
							{loading ? 'Updating...' : 'Reset password'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
} 