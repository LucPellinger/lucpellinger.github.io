import React from 'react';
import './AcademicTilesSection.css';

import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { academicData } from '../../../utils/Data'; // Assuming you have a Data.js file with academic data


export default function AcademicTiles() {
  const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleString('default', { month: 'short', year: 'numeric' });

  return (
    <section className="academic-tiles-section">
      <div className="tiles-grid">
        {academicData.map((item) => (
          <div key={item.id} className={`tile tile-${item.size}`}>
            <a className='tile-link' href={item.link} onClick={() => window.open(item.link, "_blank")} target='_blank' rel="noopener noreferrer">
            <div
              className="tile-image"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="tile-content">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <div className="tile-content__meta-info">
                  <span>
                      <FaCalendarAlt style={{ marginRight: '7px' }} />
                      {formatDate(item.date_from)} – {formatDate(item.date_to)}
                  </span>
                  <span>
                    <FaLocationDot style={{ marginRight: '6px' }} />
                    {item.location}
                  </span>
              </div>
            </div>
          </a>
          </div>
          
        ))}
      </div>
    </section>
  );
}
