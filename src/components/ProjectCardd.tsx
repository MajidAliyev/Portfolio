import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ProjectCard = ({ title, category, image, description, details, highlights }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"; // Prevent main page from scrolling
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isExpanded]);

  return (
    <div className="relative">
      <motion.div 
        whileHover={{ y: -10 }}
        className="card overflow-hidden group cursor-pointer"
      >
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">{category}</span>
        <h3 className="text-xl font-bold mt-1 mb-2">{title}</h3>
        <p className="text-light/70 text-sm">{description}</p>
        <button 
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all"
          onClick={() => setIsExpanded(true)}
        >
          View Details
        </button>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-start justify-center bg-dark/90 backdrop-blur-lg p-6 z-50 overflow-y-auto"
            onClick={() => setIsExpanded(false)} // Close when clicking outside
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-dark/95 p-8 rounded-2xl max-w-3xl relative shadow-xl shadow-primary-500/10 transform"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <button 
                className="absolute top-4 right-4 text-light hover:text-primary-400"
                onClick={() => setIsExpanded(false)}
              >
                <X size={28} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="overflow-hidden rounded-lg mb-6"
              >
                <img src={image} alt={title} className="w-full h-full object-cover shadow-lg" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-4 gradient-text text-center">{title}</h3>
              <span className="block text-center text-sm text-primary-400 font-medium uppercase tracking-wider bg-primary-500/10 px-3 py-1 rounded-full w-max mx-auto">
                {category}
              </span>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-light/80 mt-4 leading-relaxed text-center"
              >
                {details}
              </motion.p>

              <div className="mt-6 border-t border-white/10 pt-6">
                <h4 className="text-lg font-semibold mb-3 text-primary-400 text-center">Project Highlights</h4>
                <ul className="list-disc list-inside text-light/70 space-y-2 text-center">
                {(highlights || []).map((highlight, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCard;
