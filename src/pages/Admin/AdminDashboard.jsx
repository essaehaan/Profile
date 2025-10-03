import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCurrentUser, 
  isAuthenticated, 
  isAdmin, 
  logout, 
  apiFetch, 
  API_BASE_URL,
  formatPrice 
} from '../../lib/api';
import { Meteors } from '../../components/ui/meteors';
import { 
  FaUsers, 
  FaBook, 
  FaChartBar, 
  FaCog, 
  FaPlus, 
  FaEdit, 
  FaTrash,
  FaSignOutAlt,
  FaUserShield,
  FaGraduationCap,
  FaClipboardList,
  FaChalkboardTeacher
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalEnrollments: 0,
    revenue: 0
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Check authentication and admin role
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login?notice=Please login to access admin dashboard');
      return;
    }

    if (!isAdmin()) {
      navigate('/courses?notice=Access denied. Admin privileges required.');
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);
    loadDashboardData();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setNewCourse({ ...newCourse, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError(''); // Clear any previous errors
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load courses
      const coursesData = await apiFetch('/courses');
      setCourses(coursesData);
      
      // Set basic stats (you can enhance this with real API endpoints)
      setStats({
        totalCourses: coursesData.length,
        totalUsers: 147, // Mock data - replace with real API call
        totalEnrollments: 89, // Mock data
        revenue: coursesData.reduce((sum, course) => sum + (course.price || 0), 0)
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    
    try {
      // Debug: Log current form state
      console.log('=== FORM SUBMISSION DEBUG ===');
      console.log('Form data state:', newCourse);
      console.log('Title value:', `"${newCourse.title}"`); 
      console.log('Title length:', newCourse.title?.length);
      console.log('Description value:', `"${newCourse.description}"`); 
      console.log('Description length:', newCourse.description?.length);
      console.log('Price value:', `"${newCourse.price}"`); 
      console.log('Price type:', typeof newCourse.price);
      
      // Validate form data first
      if (!newCourse.title || !newCourse.title.trim()) {
        console.error('Validation failed: title is empty');
        setError('Course title is required');
        return;
      }
      if (!newCourse.description || !newCourse.description.trim()) {
        console.error('Validation failed: description is empty');
        setError('Course description is required');
        return;
      }
      if (!newCourse.price || isNaN(Number(newCourse.price)) || Number(newCourse.price) < 0) {
        console.error('Validation failed: invalid price');
        setError('Valid price is required (must be 0 or greater)');
        return;
      }
      
      console.log('✅ All validations passed');

      // Debug: Log what we're sending
      const token = localStorage.getItem('access_token');
      console.log('API_BASE_URL:', API_BASE_URL);
      console.log('Token exists:', !!token);
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'null');
      
      console.log('Sending course data:');
      console.log('Title:', newCourse.title.trim());
      console.log('Description:', newCourse.description.trim());
      console.log('Price:', newCourse.price);
      console.log('Price as number:', Number(newCourse.price));
      console.log('Has image:', !!newCourse.image);
      if (newCourse.image) {
        console.log('Image file:', newCourse.image.name, newCourse.image.size, newCourse.image.type);
      }

      let response;
      
      if (newCourse.image) {
        // Use FormData for file upload
        console.log('📤 Using FormData approach (with image)');
        const formData = new FormData();
        formData.append('title', newCourse.title.trim());
        formData.append('description', newCourse.description.trim());
        const priceValue = Number(newCourse.price);
        console.log('Price before appending to FormData:', priceValue, typeof priceValue);
        formData.append('price', priceValue);
        formData.append('image', newCourse.image);
        
        // Log FormData entries
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
          console.log(`  ${pair[0]}: ${pair[1]} (type: ${typeof pair[1]})`);
        }
        
        response = await fetch(`${API_BASE_URL}/courses`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        // Use JSON for data without file
        console.log('📤 Using JSON approach (no image)');
        const requestBody = {
          title: newCourse.title.trim(),
          description: newCourse.description.trim(),
          price: Number(newCourse.price),
        };
        console.log('Request body:', JSON.stringify(requestBody, null, 2));
        
        response = await fetch(`${API_BASE_URL}/courses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
      }
      
      console.log('📡 API Response status:', response.status);
      console.log('📡 API Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.message && Array.isArray(errorData.message)) {
            throw new Error(errorData.message.join(', '));
          } else if (errorData.message) {
            throw new Error(errorData.message);
          } else {
            throw new Error(errorText || 'Failed to create course');
          }
        } catch (parseError) {
          throw new Error(errorText || 'Failed to create course');
        }
      }
      
      const createdCourse = await response.json();
      console.log('Created course:', createdCourse);
      
      // Add to courses list
      setCourses([createdCourse, ...courses]);
      setStats(prev => ({ 
        ...prev, 
        totalCourses: prev.totalCourses + 1,
        revenue: prev.revenue + Number(newCourse.price || 0)
      }));
      
      // Reset form and close modal
      setNewCourse({ title: '', description: '', price: '', image: null });
      setImagePreview(null);
      setShowCreateModal(false);
      
    } catch (err) {
      setError(err.message || 'Failed to create course');
    } finally {
      setCreating(false);
    }
  };

  const deleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      
      const deletedCourse = courses.find(c => c.id === courseId);
      setCourses(courses.filter(c => c.id !== courseId));
      setStats(prev => ({ 
        ...prev, 
        totalCourses: prev.totalCourses - 1,
        revenue: prev.revenue - (deletedCourse?.price || 0)
      }));
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading Admin Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{ padding: '4%', paddingTop: '8%' }}>
      <div className="relative">
        <Meteors number={20} />
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, {user?.name || user?.email}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full">
              <FaUserShield className="text-white" />
              <span className="text-white font-medium">Administrator</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-full transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Courses</p>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
              <FaBook className="text-3xl text-blue-300" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <FaUsers className="text-3xl text-green-300" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Enrollments</p>
                <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
              </div>
              <FaGraduationCap className="text-3xl text-purple-300" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 rounded-xl border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">{formatPrice(stats.revenue)}</p>
              </div>
              <FaChartBar className="text-3xl text-orange-300" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg transition-all"
          >
            <FaPlus />
            <span>Add New Course</span>
          </button>
          
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-6 py-3 rounded-lg transition-all"
          >
            <FaChalkboardTeacher />
            <span>View All Courses</span>
          </button>
          
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg transition-all">
            <FaUsers />
            <span>Manage Users</span>
          </button>
          
          <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-6 py-3 rounded-lg transition-all">
            <FaChartBar />
            <span>Analytics</span>
          </button>
          
          <button className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 px-6 py-3 rounded-lg transition-all">
            <FaCog />
            <span>Settings</span>
          </button>
        </div>

        {/* Recent Courses Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaClipboardList className="text-cyan-400" />
              Recent Courses
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Course Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {courses.slice(0, 10).map((course) => (
                  <tr key={course.id} className="hover:bg-gray-700/25 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{course.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-md truncate">
                      {course.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-green-400">
                      {formatPrice(course.price)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                          title="Edit Course"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button 
                          onClick={() => deleteCourse(course.id)}
                          className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                          title="Delete Course"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {courses.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No courses found. <button 
                  onClick={() => navigate('/courses')} 
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Create your first course
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Course Creation Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Create New Course</h3>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewCourse({ title: '', description: '', price: '', image: null });
                    setImagePreview(null);
                    setError('');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={createCourse} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={1}
                    value={newCourse.title}
                    onChange={(e) => {
                      setNewCourse({ ...newCourse, title: e.target.value });
                      if (error && e.target.value.trim()) setError(''); // Clear error when user types
                    }}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter course title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    minLength={1}
                    value={newCourse.description}
                    onChange={(e) => {
                      setNewCourse({ ...newCourse, description: e.target.value });
                      if (error && e.target.value.trim()) setError(''); // Clear error when user types
                    }}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical"
                    placeholder="Enter course description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={newCourse.price}
                    onChange={(e) => {
                      setNewCourse({ ...newCourse, price: e.target.value });
                      if (error && e.target.value && Number(e.target.value) >= 0) setError(''); // Clear error when valid price
                    }}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Course Image (optional)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400">
                      Supported formats: JPG, PNG, GIF. Max size: 5MB
                    </p>
                    
                    {imagePreview && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-300 mb-2">Preview:</p>
                        <div className="relative inline-block">
                          <img 
                            src={imagePreview} 
                            alt="Course preview" 
                            className="w-32 h-20 object-cover rounded-lg border border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setNewCourse({ ...newCourse, image: null });
                              setImagePreview(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewCourse({ title: '', description: '', price: '', image: null });
                      setImagePreview(null);
                      setError('');
                    }}
                    className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                  >
                    {creating ? 'Creating...' : 'Create Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
