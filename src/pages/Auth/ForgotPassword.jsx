import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../lib/api';
import { Meteors } from '../../components/ui/meteors';

export default function ForgotPassword() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');
		try {
			await requestPasswordReset(email);
			setMessage('If an account exists for this email, a reset link has been sent.');
		} catch (err) {
			setError(err.message || 'Failed to send reset email');
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
					<h1 className="text-2xl font-bold mb-4 text-white">Forgot Password</h1>
					{message && <div className="mb-3 text-green-400">{message}</div>}
					{error && <div className="mb-3 text-red-400">{error}</div>}
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label className="block text-sm mb-1 text-gray-300">Email</label>
							<input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" />
						</div>
						<button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
							{loading ? 'Sending...' : 'Send reset link'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
} 