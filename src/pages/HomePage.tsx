import React from 'react';
import { LeftActionTiles } from '../components/home/LeftActionTiles';
import { CentralServices } from '../components/home/CentralServices';
import { RightToolsWidget } from '../components/home/RightToolsWidget';
import { GrievanceStatsBanner } from '../components/home/GrievanceStatsBanner';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 3-Column Official Layout matching passportindia.gov.in */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Action Quadrant (Col 1-3) */}
        <div className="lg:col-span-3">
          <LeftActionTiles />
        </div>

        {/* Center Main Carousel & Services (Col 4-9) */}
        <div className="lg:col-span-6">
          <CentralServices />
        </div>

        {/* Right Tools & Advisor Widget (Col 10-12) */}
        <div className="lg:col-span-3">
          <RightToolsWidget />
        </div>
      </div>

      {/* Official Grievance Redressal Banner featuring Lok Sabha MEA Data */}
      <GrievanceStatsBanner />
    </div>
  );
};
