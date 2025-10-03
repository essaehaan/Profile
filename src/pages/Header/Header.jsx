import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaLaptopCode,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaBars,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserShield,
  FaSignInAlt
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser, isAuthenticated, isAdmin, logout } from "../../lib/api";

export default function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(() => {
    const path = location.pathname.substring(1) || "home";
    return path;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      
      if (authenticated) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setUserIsAdmin(isAdmin());
      } else {
        setUser(null);
        setUserIsAdmin(false);
      }
    };
    
    checkAuth();
    // Re-check auth on location change
  }, [location.pathname]);

  // Define different navigation based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { id: "home", icon: FaHome, text: "Home", path: "/" },
      { id: "skills", icon: FaCode, text: "Skills", path: "/skills" },
      {
        id: "experience",
        icon: FaBriefcase,
        text: "Experience",
        path: "/experience",
      },
      {
        id: "education",
        icon: FaGraduationCap,
        text: "Education",
        path: "/education",
      },
      { id: "projects", icon: FaLaptopCode, text: "Projects", path: "/projects" },
    ];

    if (isAuth) {
      if (userIsAdmin) {
        // Admin navigation
        return [
          ...baseLinks,
          { id: "admin", icon: FaTachometerAlt, text: "Dashboard", path: "/admin" },
          { id: "courses", icon: FaChalkboardTeacher, text: "Courses", path: "/courses" },
          { id: "contact", icon: FaEnvelope, text: "Contact", path: "/contact" },
        ];
      } else {
        // Regular user navigation
        return [
          ...baseLinks,
          { id: "courses", icon: FaChalkboardTeacher, text: "Courses", path: "/courses" },
          { id: "contact", icon: FaEnvelope, text: "Contact", path: "/contact" },
        ];
      }
    } else {
      // Non-authenticated navigation
      return [
        ...baseLinks,
        { id: "contact", icon: FaEnvelope, text: "Contact", path: "/contact" },
      ];
    }
  };

  const navLinks = getNavLinks();
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
        <div className="p-[2px] md:rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 animate-gradient-x">
          <nav className="bg-gray-900/90 backdrop-blur-md md:rounded-full px-4 md:px-6 py-2.5">
            {/* Mobile Menu Button */}
            <div className="flex justify-between items-center md:hidden px-2">
              <Link to="/" className="text-white font-bold">
                {userIsAdmin ? 'Admin Panel' : 'Portfolio'}
              </Link>
              <div className="flex items-center gap-2">
                {isAuth && (
                  <span className="text-xs text-gray-300 hidden sm:inline">
                    {userIsAdmin ? '👑' : '👤'} {user?.name || user?.email}
                  </span>
                )}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white p-2"
                >
                  <FaBars />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-4 md:py-0">
                {navLinks.map(({ id, icon: Icon, text, path }) => (
                  <Link
                    key={id}
                    to={path}
                    onClick={() => {
                      setActiveLink(id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-2
                      hover:bg-white/10 
                      ${
                        activeLink === id
                          ? "bg-white/15 text-white"
                          : "text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      className={`text-base ${
                        activeLink === id ? "scale-110" : ""
                      }`}
                    />
                    <span className="inline">{text}</span>
                  </Link>
                ))}
                
                {/* Authentication Section */}
                <div className="flex items-center gap-2 md:ml-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-700 md:border-t-0">
                  {isAuth ? (
                    <>
                      {/* User Info - Desktop only */}
                      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
                        {userIsAdmin ? (
                          <FaUserShield className="text-purple-400" />
                        ) : (
                          <FaUser className="text-blue-400" />
                        )}
                        <span className="text-xs text-gray-300">
                          {user?.name || user?.email}
                        </span>
                        {userIsAdmin && (
                          <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      
                      {/* Logout Button */}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                          transition-all duration-300 hover:bg-red-500/20 text-red-400 hover:text-red-300"
                      >
                        <FaSignOutAlt className="text-base" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    /* Login Button for non-authenticated users */
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                        transition-all duration-300 hover:bg-green-500/20 text-green-400 hover:text-green-300"
                    >
                      <FaSignInAlt className="text-base" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </header>
  );
}
