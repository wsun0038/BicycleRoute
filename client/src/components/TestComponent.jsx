import React, { useEffect } from 'react';

const TestComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test');
        const data = await response.json();
        console.log('Test API response:', data);
      } catch (err) {
        console.error('Error fetching test data:', err);
      }
    };

    fetchData();
  }, []);

  return <div>Check console for test API response.</div>;
};

export default TestComponent;
