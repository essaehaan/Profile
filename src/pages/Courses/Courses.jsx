import React, { useEffect, useMemo, useState } from 'react';
import './Courses.css';
import Webplanet from "../../assets/images/webplanet.png";
import MedicalAsth from "../../assets/images/madicalAusthetic.png";
import ScrabbleApp from "../../assets/images/scribbleapp.png";
import { Meteors } from '../../components/ui/meteors';
import EditCourseModal from '../../components/ui/EditCourseModal';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiFetch, getToken, formatPrice, API_BASE_URL } from '../../lib/api';

const CourseCard = ({ title, description, image, price, id, isAdmin, onEdit, onDelete }) => (
  <div className="group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
    <div className="absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg" />
    <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500" />
    <div className="relative bg-gray-900/90 rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl">
      <div className="relative mb-6">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />
        <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {price}
        </div>
        {isAdmin && (
          <div className="absolute top-2 left-2 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(id);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
              title="Edit Course"
            >
              ✏️
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(id);
              }}
              className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
              title="Delete Course"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      <Link to={`/course/${id}`} state={{ course: { title, description, image, price, id } }}>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-300 border-l-4 border-blue-500/50 pl-4 mt-4 leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
      <div className="absolute top-4 right-4 w-20 h-20">
        <div className="absolute top-0 right-0 w-6 h-[2px] bg-cyan-500/50" />
        <div className="absolute top-0 right-0 w-[2px] h-6 bg-cyan-500/50" />
      </div>
      <div className="absolute bottom-4 left-4 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-purple-500/50" />
        <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-purple-500/50" />
      </div>
    </div>
  </div>
);

const fallbackCourses = [
  { id: 1, title: 'React for Beginners', description: 'Learn the fundamentals of React and build your first web application.', image: Webplanet, price: '$49' },
  { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into advanced JavaScript concepts and techniques.', image: MedicalAsth, price: '$99' },
  { id: 3, title: 'UI/UX Design Principles', description: 'Learn the principles of UI/UX design and create beautiful and intuitive interfaces.', image: ScrabbleApp, price: '$79' },
];

function parseRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1] || ''));
    return payload?.role;
  } catch {
    return undefined;
  }
}

const Courses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '' });
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const token = getToken();
  const role = parseRoleFromToken(token);
  const isAdmin = role === 'admin';

  useEffect(() => {
    const t = getToken();
    if (!t) {
      const params = new URLSearchParams();
      params.set('from', '/courses');
      params.set('notice', 'Please login to view courses');
      navigate(`/login?${params.toString()}`);
      return;
    }

    async function load() {
      try {
        const data = await apiFetch('/courses');
        const mapped = data.map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          image: Webplanet,
          price: formatPrice(c.price),
        }));
        setItems(mapped);
      } catch (e) {
        if (e.message === 'Unauthorized') {
          const params = new URLSearchParams();
          params.set('from', '/courses');
          params.set('notice', 'Session expired. Please login again');
          navigate(`/login?${params.toString()}`);
          return;
        }
        setError('Failed to load courses');
        setItems(fallbackCourses);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [navigate, location.pathname]);

  async function createCourse(e) {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newCourse.title,
          description: newCourse.description,
          price: Number(newCourse.price || 0),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const created = await res.json();
      setItems([{ id: created.id, title: created.title, description: created.description, image: Webplanet, price: formatPrice(created.price) }, ...items]);
      setNewCourse({ title: '', description: '', price: '' });
    } catch (err) {
      setError(err.message || 'Create failed');
    } finally {
      setCreating(false);
    }
  }

  async function removeCourse(id) {
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      setItems(items.filter(i => i.id !== id));
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  }

  const handleEditCourse = async (courseId) => {
    try {
      console.log('Fetching course with ID:', courseId);
      console.log('API URL:', `${API_BASE_URL}/courses/${courseId}`);
      console.log('Token exists:', !!token);
      
      const res = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', errorText);
        throw new Error(errorText);
      }
      
      const course = await res.json();
      console.log('Course data:', course);
      setEditingCourse(course);
      setShowEditModal(true);
    } catch (err) {
      console.error('Edit course error:', err);
      setError(err.message || 'Failed to load course details');
    }
  };

  const handleCourseUpdated = (updatedCourse) => {
    setItems(items.map(item => 
      item.id === updatedCourse.id 
        ? { 
            ...item, 
            title: updatedCourse.title, 
            description: updatedCourse.description, 
            price: formatPrice(updatedCourse.price),
            image: updatedCourse.picture ? `${API_BASE_URL}${updatedCourse.picture}` : item.image
          }
        : item
    ));
    setShowEditModal(false);
    setEditingCourse(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingCourse(null);
  };

  return (
    <div className="skills-container" style={{ padding: "4%", }}>
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2rem' }}>
        <Meteors number={20} />
      </div>

      {isAdmin && (
        <div className="bg-gray-900/80 rounded-lg border border-gray-800/50 p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Admin: Create Course</h2>
          {error && <div className="mb-3 text-red-400">{error}</div>}
          <form onSubmit={createCourse} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Title" className="border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
            <input placeholder="Price" className="border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100" value={newCourse.price} onChange={e => setNewCourse({ ...newCourse, price: e.target.value })} />
            <input placeholder="Description" className="border border-gray-700 rounded px-3 py-2 bg-transparent text-gray-100 md:col-span-3" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} />
            <div className="md:col-span-3 flex gap-2">
              <button disabled={creating} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">{creating ? 'Creating...' : 'Create'}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-300">Loading courses...</div>
      ) : (
        <div className="skills-grid">
          {items.map((course, index) => (
            <CourseCard 
              key={index}
              {...course} 
              isAdmin={isAdmin}
              onEdit={handleEditCourse}
              onDelete={removeCourse}
            />
          ))}
        </div>
      )}

      {showEditModal && editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={handleCloseEditModal}
          onCourseUpdated={handleCourseUpdated}
        />
      )}
    </div>
  );
};

export default Courses;
