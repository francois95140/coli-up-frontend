import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import boxSvg from "../assets/images/boxicon.svg";
import "/src/assets/css/navbar.css";

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (

    
    <section id="navbar" className="fixed bottom-0 w-full py-3 h-[4rem] max-h-[4rem] bg-gray-200">
        <div className="flex items-center w-full h-full justify-evenly nav">
            <button className="flex justify-center items-center active">
                <ion-icon name="settings-outline" className="text-3xl"></ion-icon>
            </button>
            <button className="flex justify-center items-center">
                <ion-icon name="time-outline" className="text-3xl"></ion-icon>
            </button>
            <button className="flex justify-center items-center">
                <ion-icon name="home-outline" className="text-3xl"></ion-icon>
            </button>
            <button className="flex justify-center items-center">
              <span class="text-3xl  size-3xl">
                <img src={boxSvg} alt="Box Icon" className="h-full w-full" />
              </span>
            </button>
            <button className="flex justify-center items-center">
                <ion-icon name="people-outline" className="text-3xl"></ion-icon>
            </button>
            <div className="selector size-3xl rounded-full fixed">

            </div>
        </div>
        
    </section>
  );
};

export default BottomNavBar;
