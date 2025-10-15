import React, { useEffect, useState } from 'react';
import { getTemplateCategories, getTemplates } from '../lib/api'; // Assuming these are public now
import { Folder, FileText, Loader2, AlertCircle } from 'lucide-react';

const TemplateBrowser = () => {
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const categoriesResponse = await getTemplateCategories();
        console.log("Categories API Response:", categoriesResponse);
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data.categories);
        } else {
          throw new Error(categoriesResponse.message || 'Failed to fetch categories');
        }

        // Fetch templates (initially all or a default set)
        const templatesResponse = await getTemplates();
        console.log("Templates API Response:", templatesResponse);
        if (templatesResponse.success) {
          setTemplates(templatesResponse.data.templates);
        } else {
          throw new Error(templatesResponse.message || 'Failed to fetch templates');
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        // Check if the error is an Axios error with a response
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    setError(null);
    try {
      const templatesResponse = await getTemplates(null, { categoryId }); // Pass null for token as it's public
      console.log("Filtered Templates API Response:", templatesResponse);
      if (templatesResponse.success) {
        setTemplates(templatesResponse.data.templates);
      } else {
        throw new Error(templatesResponse.message || 'Failed to fetch templates for category');
      }
    } catch (err) {
      console.error("Error fetching templates by category:", err);
      // Check if the error is an Axios error with a response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while filtering templates.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-3 text-gray-600">Loading categories and templates...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-600">
        <AlertCircle className="w-10 h-10 mb-4" />
        <p className="text-lg font-semibold">Error: {error}</p>
        <p className="text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Explore Legal Templates
        </h2>

        {/* Categories Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === null
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              <Folder className="inline-block w-4 h-4 mr-2" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Templates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.length > 0 ? (
            templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{template.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{template.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Difficulty: {template.difficulty || 'N/A'}</span>
                    <span>Free: {template.isFree ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Template &rarr;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg py-10">
              No templates found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TemplateBrowser;
