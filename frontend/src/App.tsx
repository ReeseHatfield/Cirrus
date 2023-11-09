import { useEffect, useState } from 'react';
import React from 'react';

const backEndPoint: string = "http://localhost:3001";

const MyComponent = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // Use the full URL to your backend server
    fetch(`${backEndPoint}/main`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        return response.text(); // Use .json() if the response is in JSON format
      })
      .then(text => {
        setData(text);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []); // The empty array means this effect runs once on mount
  

  return (
    <div>
      {data ? <div>{data}</div> : <div>Loading...</div>}
    </div>
  );
};

export default MyComponent;
