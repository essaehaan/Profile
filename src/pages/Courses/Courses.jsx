import React from 'react';
import './Courses.css';
import Webplanet from "../../assets/images/webplanet.png";
import MedicalAsth from "../../assets/images/madicalAusthetic.png";
import ScrabbleApp from "../../assets/images/scribbleapp.png";
import { Meteors } from '../../components/ui/meteors';

import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, image, price, id }) => (
  <Link to={`/course/${id}`} state={{ course: { title, description, image, price, id } }}>
    <div className="group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
      <div className="absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg" />
      <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500" />
      <div className="relative bg-gray-900/90 rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl">
        <div className="relative mb-6">
          <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {price}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-300 border-l-4 border-blue-500/50 pl-4 mt-4 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="absolute top-4 right-4 w-20 h-20">
          <div className="absolute top-0 right-0 w-6 h-[2px] bg-cyan-500/50" />
          <div className="absolute top-0 right-0 w-[2px] h-6 bg-cyan-500/50" />
        </div>
        <div className="absolute bottom-4 left-4 w-20 h-20">
          <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-purple-500/50" />
          <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-purple-500/50" />
        </div>
      </div>
    </div>
  </Link>
);

const courses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn the fundamentals of React and build your first web application.',
    image: Webplanet,
    price: '$49',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced JavaScript concepts and techniques.',
    image: MedicalAsth,
    price: '$99',
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Learn the principles of UI/UX design and create beautiful and intuitive interfaces.',
    image: ScrabbleApp,
    price: '$79',
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    description: 'Learn the principles of UI/UX design and create beautiful and intuitive interfaces.',
    image: ScrabbleApp,
    price: '$79',
  },
];

const Courses = () => {
  return (
    <div className="skills-container" style={{ padding: "4%", }}>
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2rem' }}>
        <Meteors number={20} />
      </div>
      <div className="skills-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
