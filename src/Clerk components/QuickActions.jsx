import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language, openModal } = context || {};

  // State management
  const [customActions, setCustomActions] = useState([]);
  const [recentActions, setRecentActions] = useState([]);
  const [favoriteActions, setFavoriteActions] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [actionCategories, setActionCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Default quick actions
  const defaultActions = [
    {
      id: 'new-case',
      name: language === 'ta' ? 'नया मामला जोड़ें' : 'Add New Case',
      description: language === 'ta' ? 'नया केस रिकॉर्ड बनाएं' : 'Create a new case record',
      icon: '📁',
      category: 'Cases',
      shortcut: 'Ctrl+N',
      action: () => navigate('/clerk/cases/new'),
      color: 'bg-blue-500'
    },
    {
      id: 'quick-search',
      name: language === 'ta' ? 'केस खोजें' : 'Search Cases',
      description: language === 'ta' ? 'केस नंबर या पार्टी नाम से खोजें' : 'Search by case number or party name',
      icon: '🔍',
      category: 'Search',
      shortcut: 'Ctrl+F',
      action: () => {
        const searchTerm = window.prompt(language === 'ta' ? 'खोज शब्द दर्ज करें:' : 'Enter search term:');
        if (searchTerm) {
          navigate(`/clerk/cases?search=${encodeURIComponent(searchTerm)}`);
        }
      },
      color: 'bg-green-500'
    },
    {
      id: 'today-hearings',
      name: language === 'ta' ? 'आज की सुनवाई' : "Today's Hearings",
      description: language === 'ta' ? 'आज की अनुसूचित सुनवाई देखें' : 'View scheduled hearings for today',
      icon: '⚖️',
      category: 'Calendar',
      shortcut: 'Ctrl+H',
      action: () => navigate('/clerk/calendar?date=today'),
      color: 'bg-purple-500'
    },
    {
      id: 'send-sms',
      name: language === 'ta' ? 'SMS भेजें' : 'Send SMS',
      description: language === 'ta' ? 'क्लाइंट्स को SMS अलर्ट भेजें' : 'Send SMS alerts to clients',
      icon: '📱',
      category: 'Communication',
      shortcut: 'Ctrl+M',
      action: () => navigate('/clerk/sms'),
      color: 'bg-orange-500'
    },
    {
      id: 'generate-report',
      name: language === 'ta' ? 'रिपोर्ट जेनरेट करें' : 'Generate Report',
      description: language === 'ta' ? 'केस स्टेटस रिपोर्ट बनाएं' : 'Create case status report',
      icon: '📊',
      category: 'Reports',
      shortcut: 'Ctrl+R',
      action: () => {
        addNotification?.({
          type: 'info',
          message: language === 'ta' ? 'रिपोर्ट जेनरेशन शुरू हो गई है...' : 'Report generation started...'
        });
        // Simulate report generation
        setTimeout(() => {
          addNotification?.({
            type: 'success',
            message: language === 'ta' ? 'रिपोर्ट तैयार है!' : 'Report ready for download!'
          });
        }, 3000);
      },
      color: 'bg-indigo-500'
    },
    {
      id: 'bulk-update',
      name: language === 'ta' ? 'बल्क अपडेट' : 'Bulk Update',
      description: language === 'ta' ? 'मल्टिपल केसेस अपडेट करें' : 'Update multiple cases at once',
      icon: '📦',
      category: 'Cases',
      shortcut: 'Ctrl+B',
      action: () => navigate('/clerk/bulk-operations'),
      color: 'bg-red-500'
    },
    {
      id: 'backup-data',
      name: language === 'ta' ? 'डेटा बैकअप' : 'Backup Data',
      description: language === 'ta' ? 'सिस्टम डेटा का बैकअप लें' : 'Create system data backup',
      icon: '💾',
      category: 'System',
      shortcut: 'Ctrl+Shift+B',
      action: () => {
        if (window.confirm(language === 'ta' ? 'क्या आप डेटा बैकअप करना चाहते हैं?' : 'Do you want to create a data backup?')) {
          addNotification?.({
            type: 'info',
            message: language === 'ta' ? 'बैकअप प्रक्रिया शुरू हो गई है...' : 'Backup process started...'
          });
          setTimeout(() => {
            addNotification?.({
              type: 'success',
              message: language === 'ta' ? 'डेटा बैकअप पूर्ण!' : 'Data backup completed!'
            });
          }, 5000);
        }
      },
      color: 'bg-gray-500'
    },
    {
      id: 'fake-case-check',
      name: language === 'ta' ? 'फेक केस चेक' : 'Fake Case Check',
      description: language === 'ta' ? 'संदिग्ध केसेस की जांच करें' : 'Check for suspicious cases',
      icon: '🕵️',
      category: 'Security',
      shortcut: 'Ctrl+Shift+F',
      action: () => navigate('/clerk/fake-case-checker'),
      color: 'bg-yellow-500'
    }
  ];

  // Categories
  const categories = [
    { key: 'all', name: language === 'ta' ? 'सभी' : 'All' },
    { key: 'Cases', name: language === 'ta' ? 'मामले' : 'Cases' },
    { key: 'Communication', name: language === 'ta' ? 'संचार' : 'Communication' },
    { key: 'Reports', name: language === 'ta' ? 'रिपोर्ट्स' : 'Reports' },
    { key: 'Calendar', name: language === 'ta' ? 'कैलेंडर' : 'Calendar' },
    { key: 'System', name: language === 'ta' ? 'सिस्टम' : 'System' },
    { key: 'Security', name: language === 'ta' ? 'सुरक्षा' : 'Security' },
    { key: 'Search', name: language === 'ta' ? 'खोज' : 'Search' }
  ];

  // Load data
  useEffect(() => {
    setActionCategories(categories);
    
    // Load recent actions from localStorage
    const saved = localStorage.getItem('clerk-recent-actions');
    if (saved) {
      try {
        setRecentActions(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent actions:', e);
      }
    }

    // Load favorite actions
    const favorites = localStorage.getItem('clerk-favorite-actions');
    if (favorites) {
      try {
        setFavoriteActions(new Set(JSON.parse(favorites)));
      } catch (e) {
        console.error('Error loading favorite actions:', e);
      }
    }
  }, [language]);

  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      const action = defaultActions.find(a => {
        const keys = a.shortcut.toLowerCase().split('+');
        const isCtrl = keys.includes('ctrl') && (event.ctrlKey || event.metaKey);
        const isShift = keys.includes('shift') && event.shiftKey;
        const key = keys[keys.length - 1];
        
        return isCtrl && 
               (keys.includes('shift') ? isShift : !event.shiftKey) &&
               event.key.toLowerCase() === key;
      });

      if (action) {
        event.preventDefault();
        executeAction(action);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [defaultActions]);

  // Execute action
  const executeAction = (action) => {
    try {
      // Add to recent actions
      const newRecent = [
        { ...action, executedAt: new Date().toISOString() },
        ...recentActions.filter(a => a.id !== action.id).slice(0, 9)
      ];
      setRecentActions(newRecent);
      localStorage.setItem('clerk-recent-actions', JSON.stringify(newRecent));

      // Execute the action
      action.action();
      
      addNotification?.({
        type: 'info',
        message: `${action.name} executed`
      });
    } catch (error) {
      console.error('Error executing action:', error);
      addNotification?.({
        type: 'error',
        message: 'Failed to execute action'
      });
    }
  };

  // Toggle favorite
  const toggleFavorite = (actionId) => {
    const newFavorites = new Set(favoriteActions);
    if (newFavorites.has(actionId)) {
      newFavorites.delete(actionId);
    } else {
      newFavorites.add(actionId);
    }
    setFavoriteActions(newFavorites);
    localStorage.setItem('clerk-favorite-actions', JSON.stringify([...newFavorites]));
  };

  // Filter actions
  const filteredActions = defaultActions.filter(action => {
    const matchesSearch = action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || action.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Create custom action
  const createCustomAction = () => {
    openModal?.({
      title: language === 'ta' ? 'कस्टम एक्शन बनाएं' : 'Create Custom Action',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'ta' ? 'एक्शन नाम' : 'Action Name'}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder={language === 'ta' ? 'एक्शन का नाम दर्ज करें' : 'Enter action name'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'ta' ? 'विवरण' : 'Description'}
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder={language === 'ta' ? 'एक्शन का विवरण दर्ज करें' : 'Enter action description'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'ta' ? 'URL/पाथ' : 'URL/Path'}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="/clerk/custom-page"
            />
          </div>
        </div>
      ),
      actions: [
        {
          label: language === 'ta' ? 'रद्द करें' : 'Cancel',
          variant: 'secondary',
          onClick: () => {}
        },
        {
          label: language === 'ta' ? 'बनाएं' : 'Create',
          variant: 'primary',
          onClick: () => {
            addNotification?.({
              type: 'success',
              message: language === 'ta' ? 'कस्टम एक्शन बनाया गया!' : 'Custom action created!'
            });
          }
        }
      ]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'ta' ? 'त्वरित कार्य' : 'Quick Actions'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ta' ? 'सामान्य कार्यों के लिए शॉर्टकट और कीबोर्ड शॉर्टकट्स' : 'Shortcuts and keyboard shortcuts for common tasks'}
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <button
              onClick={createCustomAction}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {language === 'ta' ? 'कस्टम एक्शन' : 'Custom Action'}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute inset-y-0 left-0 pl-3 flex items-center h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder={language === 'ta' ? 'एक्शन खोजें...' : 'Search actions...'}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === 'ta' ? 'श्रेणी:' : 'Category:'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {categories.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Favorite Actions */}
      {favoriteActions.size > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="h-5 w-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {language === 'ta' ? 'पसंदीदा कार्य' : 'Favorite Actions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {defaultActions
              .filter(action => favoriteActions.has(action.id))
              .map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onExecute={executeAction}
                  language={language}
                />
              ))}
          </div>
        </div>
      )}

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {language === 'ta' ? 'हाल के कार्य' : 'Recent Actions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentActions.slice(0, 8).map((recentAction) => {
              const action = defaultActions.find(a => a.id === recentAction.id);
              return action ? (
                <ActionCard
                  key={`recent-${action.id}`}
                  action={action}
                  isFavorite={favoriteActions.has(action.id)}
                  onToggleFavorite={toggleFavorite}
                  onExecute={executeAction}
                  language={language}
                  executedAt={recentAction.executedAt}
                />
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* All Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {language === 'ta' ? 'सभी कार्य' : 'All Actions'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredActions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              isFavorite={favoriteActions.has(action.id)}
              onToggleFavorite={toggleFavorite}
              onExecute={executeAction}
              language={language}
            />
          ))}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-8">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'ta' ? 'कोई एक्शन नहीं मिला' : 'No actions found'}
            </p>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          {language === 'ta' ? 'कीबोर्ड शॉर्टकट्स:' : 'Keyboard Shortcuts:'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-blue-800 dark:text-blue-200">
          {defaultActions.map((action) => (
            <div key={action.id} className="flex items-center justify-between">
              <span>{action.name}</span>
              <kbd className="px-2 py-1 text-xs bg-blue-200 dark:bg-blue-800 rounded">
                {action.shortcut}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ action, isFavorite, onToggleFavorite, onExecute, language, executedAt }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white text-lg`}>
          {action.icon}
        </div>
        <button
          onClick={() => onToggleFavorite(action.id)}
          className={`p-1 rounded ${
            isFavorite 
              ? 'text-yellow-500 hover:text-yellow-600' 
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
        {action.name}
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        {action.description}
      </p>

      {executedAt && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
          {language === 'ta' ? 'अंतिम बार:' : 'Last used:'} {new Date(executedAt).toLocaleString()}
        </p>
      )}

      <div className="flex items-center justify-between">
        <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
          {action.shortcut}
        </kbd>
        <button
          onClick={() => onExecute(action)}
          className="px-3 py-1 text-xs font-medium text-white bg-gray-600 rounded hover:bg-gray-700 transition-colors"
        >
          {language === 'ta' ? 'चलाएं' : 'Run'}
        </button>
      </div>
    </div>
  );
};

export default QuickActions;