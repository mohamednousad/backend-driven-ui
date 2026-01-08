import React, { useEffect, useState } from 'react';
import { getDashboard, getAnalytics, getUsers, getSettings } from '../services/uiService';

const Home = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboard, analytics, users, settings] = await Promise.all([
          getDashboard(),
          getAnalytics(),
          getUsers(),
          getSettings()
        ]);
        
        setPages([dashboard, analytics, users, settings]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {pages.map((pageData) => {
          if (!pageData) return null;
          
          const pageName = pageData.page || '';
          const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
          
          return (
            <div key={pageName} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{formattedName}</h2>
              <div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                style={{ backgroundColor: pageData.theme?.backgroundColor }}
              >
                <div dangerouslySetInnerHTML={{ __html: pageData.html }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;