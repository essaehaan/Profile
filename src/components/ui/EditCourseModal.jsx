import React, { useState, useEffect } from 'react';
import { API_BASE_URL, formatPrice } from '../../lib/api';

const EditCourseModal = ({ course, onClose, onCourseUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        price: course.price ? course.price.toString() : '',
        image: null
      });
      setImagePreview(course.picture ? `${API_BASE_URL}${course.picture}` : null);
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required';
    }
    
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Valid price is required (must be 0 or greater)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('access_token');
      
      // First, update the course data
      const updateResponse = await fetch(`${API_BASE_URL}/courses/${course.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
        }),
      });
      
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(errorText || 'Failed to update course');
      }
      
      const updatedCourse = await updateResponse.json();
      
      // If there's a new image, upload it
      if (formData.image) {
        setIsUploading(true);
        const formDataForImage = new FormData();
        formDataForImage.append('file', formData.image);
        
        const imageResponse = await fetch(`${API_BASE_URL}/courses/upload-picture/${course.id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataForImage,
        });
        
        if (!imageResponse.ok) {
          const errorText = await imageResponse.text();
          throw new Error(errorText || 'Failed to upload image');
        }
        
        const imageResult = await imageResponse.json();
        updatedCourse.picture = imageResult.picture;
      }
      
      // Call the callback to update the parent component
      if (onCourseUpdated) {
        onCourseUpdated(updatedCourse);
      }
      
      onClose();
      
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to update course' });
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    setErrors(prev => ({ ...prev, image: '' }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Edit Course</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        
        {errors.submit && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4">
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter course title"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical ${
                errors.description ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Enter course description"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price *
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              required
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                errors.price ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1">{errors.price}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Image
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400">
                Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
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
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
              
              {errors.image && (
                <p className="text-red-400 text-sm mt-1">{errors.image}</p>
              )}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            >
              {isLoading ? 'Updating...' : isUploading ? 'Uploading Image...' : 'Update Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
