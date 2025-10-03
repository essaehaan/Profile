export const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:4000';

export function getToken() {
	return localStorage.getItem('access_token') || '';
}

export function setToken(token) {
	localStorage.setItem('access_token', token);
}

export function clearToken() {
	localStorage.removeItem('access_token');
}

export async function apiFetch(path, options = {}) {
	const token = getToken();
	const headers = {
		'Content-Type': 'application/json',
		...(options.headers || {}),
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
	const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
	if (res.status === 401) {
		throw new Error('Unauthorized');
	}
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || 'Request failed');
	}
	return res.json();
}

export async function loginRequest({ email, password }) {
	const res = await fetch(`${API_BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || 'Login failed');
	}
	return res.json();
}

export async function requestPasswordReset(email) {
	const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || 'Request failed');
	}
	return res.json();
}

export async function resetPassword({ token, password }) {
	const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token, password }),
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || 'Reset failed');
	}
	return res.json();
}

export function logout() {
	clearToken();
	// Optionally navigate to login page
	if (typeof window !== 'undefined') {
		window.location.href = '/login';
	}
}

export function getCurrentUser() {
	const token = getToken();
	if (!token) return null;
	
	try {
		const payload = JSON.parse(atob(token.split('.')[1] || ''));
		return {
			id: payload.id,
			email: payload.email,
			role: payload.role,
			name: payload.name || payload.email
		};
	} catch {
		return null;
	}
}

export function isAuthenticated() {
	const token = getToken();
	if (!token) return false;
	
	try {
		const payload = JSON.parse(atob(token.split('.')[1] || ''));
		// Check if token is expired
		if (payload.exp && payload.exp * 1000 < Date.now()) {
			clearToken();
			return false;
		}
		return true;
	} catch {
		clearToken();
		return false;
	}
}

export function isAdmin() {
	const user = getCurrentUser();
	return user?.role === 'admin';
}

export function formatPrice(value) {
	if (value == null) return '';
	const num = typeof value === 'string' ? Number(value) : value;
	if (Number.isNaN(num)) return '';
	return `$${num.toFixed(2)}`;
}
