import React from 'react';

import { Link } from 'react-router-dom';

const NotAuthorized  = () => {
  return (
    <div id='notfound' className='text-center'>
      <div className="notfound">
        <div className="notfound-404"></div>
        <h1>401</h1>
        <h2>Oops! Page Not Authorized</h2>
        <p>Sorry, you are not authorised to view this page</p>

        <p className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">Go back to the homepage</Link>
        </p>

      </div>
    </div>
  );
};

export default NotAuthorized;
