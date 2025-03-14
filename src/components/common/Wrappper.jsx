import React from 'react'
import { useLocation } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

function Wrappper({ children }) {
    const location = useLocation();
    return (
        <div className="min-h-screen max-w-md mx-auto" style={{
            paddingBottom: "60px"
        }}>
            {children}
            <BottomNavigation currentPath={location.pathname} />
        </div>
    )
}

export default Wrappper
