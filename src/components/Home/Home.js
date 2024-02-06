import React from 'react';
import Weather from '../Weather/Weather';
import UserDetails from '../UserDetails/UserDetails';

const Home = () => {
    return (
        <div>
            <Weather></Weather>
            <UserDetails></UserDetails>
        </div>
    );
};

export default Home;