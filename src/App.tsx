import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCardd from "./components/ProjectCardd"; // Adjust path if needed
import { 
  Code, 
  Layout, 
  Palette, 
  Globe, 
  ShoppingBag, 
  Database, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  ArrowUp
} from 'lucide-react';
import { p } from 'framer-motion/client';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold font-display gradient-text">Majid Aliyev</a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-light"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="nav-link text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const AnimatedSection = ({ children, id, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const SkillCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="card"
    >
      <div className="mb-4 text-primary-500">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-light/70">{description}</p>
    </motion.div>
  );
};

const ProjectCard = ({ title, category, image, description, link }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="card overflow-hidden group"
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary text-sm py-2"
            >
              View Project <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
      <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">{category}</span>
      <h3 className="text-xl font-bold mt-1 mb-2">{title}</h3>
      <p className="text-light/70 text-sm">{description}</p>
    </motion.div>
  );
};

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary-600 text-white shadow-lg z-50 hover:bg-primary-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative pt-20 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-dark"></div>
    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-primary-500/10 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-dark to-transparent"></div>
  </div>

  <div className="w-full mx-auto px-4 md:px-6 relative z-10 flex flex-col-reverse md:flex-row items-center gap-12">
    {/* Metin kısmı */}
    <div className="max-w-3xl w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm mb-4">
          Web Developer
        </span>
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm mb-4">
          Designer
        </span>
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm mb-4">
          Engineering Student
        </span>
      </motion.div>

      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-6 font-display"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Hi, I'm <span className="gradient-text">Majid Aliyev</span>
      </motion.h1>

      <motion.p 
        className="text-xl md:text-2xl text-light/80 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Creating engaging digital experiences through web development, design, and marketing strategies.
      </motion.p>

      <motion.div 
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="#portfolio" className="btn btn-primary">
          View My Work <ChevronRight size={20} />
        </a>
        <a href="#contact" className="btn btn-outline">
          Contact Me
        </a>
      </motion.div>
    </div>

    {/* Resim kısmı */}
    <div className="relative md:w-[700px] w-[100%] max-w-[500px]">
      <img 
        src="./images/profile.jpeg" 
        alt="Floating UI Design" 
        className="rounded-2xl drop-shadow-xl transform animate-float transition-all duration-500 w-full h-auto"
      />
    </div>
  </div>
  
      {/* Glowing Background Effect */}
      <div className="absolute -z-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
      
</section>


      {/* About Section */}
      <AnimatedSection id="about">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gradient-text">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="./images/image_baku.jpg" 
                    alt="Majid Aliyev" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-4 border-dark bg-primary-600 flex items-center justify-center text-center">
                  <span className="text-white font-bold text-lg leading-none">2+ Years Experience</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Majid Aliyev</h3>
              <p className="text-light/80 mb-6 leading-relaxed">
                Passionate web developer and designer based in Freiburg, Germany. I'm currently applying for a practical placement as part of my dual studies in Media Design at IU International University for the summer semester 2025.
              </p>
              <p className="text-light/80 mb-6 leading-relaxed">
                With experience in web development, IT support, and marketing, I combine technical skills with creative design to create engaging digital experiences. I'm particularly interested in UX/UI design, web development, and digital marketing strategies.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-bold mb-2">Location</h4>
                  <p className="text-light/70">Freiburg, Germany</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Email</h4>
                  <p className="text-light/70">alyvmecid@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Study Program</h4>
                  <p className="text-light/70">Media Design (Dual)</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Languages</h4>
                  <p className="text-light/70"> German, English, Turkish, Azerbaijani, Russian</p>
                </div>
              </div>
              
              <a href="#contact" className="btn btn-primary">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Skills Section */}
      <AnimatedSection id="skills" className="bg-dark/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gradient-text">My Skills</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <SkillCard 
              icon={<Code size={32} />}
              title="Web Development"
              description="Creating responsive websites using HTML, CSS, JavaScript, and modern frameworks. Experience with Python, C++, and SQL."
            />
            <SkillCard 
              icon={<Layout size={32} />}
              title="UX/UI Design"
              description="Designing user-friendly interfaces with a focus on user experience, accessibility, and modern design principles."
            />
            <SkillCard 
              icon={<Palette size={32} />}
              title="Graphic Design"
              description="Creating visual content for social media, websites, and marketing materials. Experience with digital design tools."
            />
            <SkillCard 
              icon={<Globe size={32} />}
              title="Social Media Management"
              description="Managing social media accounts, creating content strategies, and running targeted ad campaigns."
            />
            <SkillCard 
              icon={<ShoppingBag size={32} />}
              title="E-Commerce"
              description="Setting up and optimizing Shopify stores, managing product listings, and improving conversion rates."
            />
            <SkillCard 
              icon={<Database size={32} />}
              title="Database Management"
              description="Managing and optimizing databases, ensuring data integrity, and implementing efficient data structures."
            />
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-badge">HTML</span>
              <span className="skill-badge">CSS</span>
              <span className="skill-badge">JavaScript</span>
              <span className="skill-badge">Python</span>
              <span className="skill-badge">C++</span>
              <span className="skill-badge">SQL</span>
              <span className="skill-badge">React</span>
              <span className="skill-badge">Tailwind CSS</span>
              <span className="skill-badge">Shopify</span>
              <span className="skill-badge">UX/UI Design</span>
              <span className="skill-badge">Responsive Design</span>
              <span className="skill-badge">Adobe Creative Suite</span>
              <span className="skill-badge">Social Media Marketing</span>
              <span className="skill-badge">Content Creation</span>
              <span className="skill-badge">Branding</span>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Portfolio Section */}
      <AnimatedSection id="portfolio">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gradient-text">My Portfolio</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCardd 
              title="Frauenarztpraxis Huseynova"
              category="Web Development"
              image="./images/praxis_main.png"
              description="Complete website design and development for a medical practice with focus on user experience and accessibility."
              details={<p>
                Complete website design and development for a medical practice with a focus on user experience and 
                accessibility. The project involved creating a modern, responsive website from scratch, ensuring easy 
                navigation and accessibility for patients. Responsibilities included website maintenance, content 
                updates, security measures, and technical optimizations.
            </p>}
            highlights={[
              "Designed and developed the website from scratch, ensuring a modern and responsive design",
              "Implemented user-friendly navigation and accessibility features to enhance the patient experience",
              "Managed website maintenance, including content updates, security measures, and technical optimizations",
              "Provided IT support and system administration for the medical practice"
          ]}
              
            />
            <ProjectCardd 
              title="AZERTUFF LTD"
              category="Social Media & Marketing Management"
              image="./images/shopify.png"
              description="Social media and marketing management for businesses, focusing on brand growth and revenue generation."
              details={<p>
                As a co-founder and Marketing Manager at AZERTUFF LTD, I specialized in social media management, branding, and content creation. 
                My responsibilities included managing Shopify stores, creating and optimizing Instagram posts, and running targeted ad campaigns. 
                I also developed strategies to help businesses increase their reach and strengthen their brand presence.
              </p>}
              highlights={[
                "Managed Shopify stores, including design, product management, and technical implementation",
                "Created and optimized Instagram posts and ad campaigns for targeted marketing",
                "Developed branding strategies to enhance brand visibility and customer engagement",
                "Provided Shopify store setup and optimization services for e-commerce businesses"
              ]}
            />
            <ProjectCardd 
              title="Nerdle Game"
              category="Game Development"
              image="./images/nerdle.jpeg"
              description="A console-based math puzzle game developed in C++ where players guess a randomly generated mathematical equation."
              details={<p>
                Developed a console-based version of the Nerdle game using C++. The game challenges players to guess a randomly generated 
                mathematical equation by inputting their guesses. The project involved implementing game mechanics, display management, 
                and user input handling. Unit tests were also created to ensure the reliability of the game logic and controls.
              </p>}
              highlights={[
                "Developed a console-based math puzzle game using C++",
                "Implemented game mechanics, display management, and user input handling",
                "Created a TerminalManager class for managing the game's display",
                "Wrote unit tests for game logic and control functionality",
                "Optimized code for performance and readability"
              ]}
            />
            <ProjectCardd 
              title="System Design with Mindstorms EV3"
              category="Robotics & Programming"
              image="./images/robot.jpg"
              description="Design and programming of a Mindstorms EV3 robot to complete a predefined course and perform specific tasks."
              details={<p>
                This project involved designing and programming a Mindstorms EV3 robot to navigate a predefined course and perform specific tasks. 
                The project included both mechanical design and software development, with a focus on creating a functional and efficient robot. 
                The robot successfully completed the course and performed the required tasks, demonstrating strong problem-solving and programming skills.
              </p>}
              highlights={[
                "Designed and programmed a Mindstorms EV3 robot to navigate a predefined course",
                "Developed both mechanical and software components for the robot",
                "Successfully completed the course and performed specific tasks",
                "Demonstrated strong problem-solving and programming skills",
                "Optimized robot performance for efficiency and accuracy"
              ]}
            />
            <ProjectCardd 
              title="Basics of Coding"
              category="Education & Programming"
              image="./images/scratch.png"
              description="A beginner-friendly programming course designed to introduce students to the fundamentals of coding."
              details={<p>
                Developed a beginner-friendly programming course consisting of eight lessons aimed at introducing students to the basics of coding. 
                The course was designed to be simple and engaging, making it suitable for both classroom and extracurricular activities. 
                The project focused on teaching fundamental programming concepts in a way that was accessible and fun for students.
              </p>}
              highlights={[
                "Created a beginner-friendly programming course with eight lessons",
                "Designed to introduce students to the fundamentals of coding",
                "Suitable for both classroom and extracurricular activities",
                "Focused on making programming concepts accessible and engaging",
                "Encouraged students to explore coding for the first time"
              ]}
            />
            <ProjectCardd 
              title="Social Media Marketing & Management"
              category="Digital Marketing & Content Creation"
              image="./images/smm.jpeg"
              description="Expertise in social media management, post design, editing, and content creation to enhance brand presence and engagement."
              details={<p>
                Specialized in social media marketing, including post design, editing, and content creation for various platforms. 
                Managed social media accounts, created visually appealing posts, and ran targeted ad campaigns to increase brand visibility and engagement. 
                Focused on delivering high-quality content tailored to the target audience, ensuring consistent brand messaging and growth.
              </p>}
              highlights={[
                "Managed social media accounts for multiple clients, ensuring consistent brand presence",
                "Designed and edited visually appealing posts for platforms like Instagram, Facebook, and LinkedIn",
                "Created and optimized content to increase engagement and follower growth",
                "Ran targeted ad campaigns to drive traffic and conversions",
                "Developed social media strategies to align with client goals and brand identity"
              ]}
            />
          </div>
        </div>
      </AnimatedSection>
      
      {/* Experience Section */}
      <AnimatedSection id="experience" className="bg-dark/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gradient-text">Work Experience</h2>
          
          <div className="space-y-12">
            <div className="relative pl-10 md:pl-0">
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10"></div>
              
              <div className="md:grid md:grid-cols-2 gap-8 relative">
                <div className="md:text-right md:pr-12">
                  <div className="hidden md:block absolute right-0 top-0 w-3 h-3 rounded-full bg-primary-500 transform translate-x-1.5"></div>
                  <span className="text-primary-400 font-medium">August 2023 - Present</span>
                  <h3 className="text-xl font-bold mt-1">Web Developer & IT Support</h3>
                  <p className="text-light/70">Frauenarztpraxis Huseynova, Schliengen</p>
                </div>
                <div className="mt-4 md:mt-0 md:pl-12">
                  <p className="text-light/80 leading-relaxed">
                    Developed and maintained the practice website using HTML, CSS, and JavaScript. Managed databases and provided IT support. Focused on creating user-friendly designs and improving digital processes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative pl-10 md:pl-0">
              <div className="md:grid md:grid-cols-2 gap-8 relative">
                <div className="md:text-right md:pr-12">
                  <div className="hidden md:block absolute right-0 top-0 w-3 h-3 rounded-full bg-primary-500 transform translate-x-1.5"></div>
                  <span className="text-primary-400 font-medium">November 2023 - Present</span>
                  <h3 className="text-xl font-bold mt-1">Co-founder & Marketing Manager</h3>
                  <p className="text-light/70">AZERTUFF LTD</p>
                </div>
                <div className="mt-4 md:mt-0 md:pl-12">
                  <p className="text-light/80 leading-relaxed">
                    Managed social media accounts, created and implemented marketing strategies. Developed brand identities and managed Shopify stores. Conducted targeted advertising campaigns and provided social media management services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Contact Section */}
      <AnimatedSection id="contact">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="section-heading gradient-text">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-light/80 mb-8 leading-relaxed">
                Feel free to reach out to me for any inquiries about my work, potential collaborations, or just to say hello. I'm always open to discussing new projects and opportunities.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-primary-500 mt-1">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <a href="mailto:alyvmecid@gmail.com" className="text-light/70 hover:text-primary-400 transition-colors">alyvmecid@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-primary-500 mt-1">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <a href="tel:+4915737980174" className="text-light/70 hover:text-primary-400 transition-colors">+49 157 37980174</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-primary-500 mt-1">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p className="text-light/70">Sundgauallee 50, 79110 Freiburg, Germany</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-light/70 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-light focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-light/70 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-light focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-light/70 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-light focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-light/70 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-light focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Footer */}
      <footer className="bg-dark/80 py-12 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#home" className="text-2xl font-bold font-display gradient-text">Majid Aliyev</a>
              <p className="text-light/50 mt-2">Web Developer & Designer</p>
            </div>
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
</div>

            <div className="flex flex-col items-center md:items-end">
              <p className="text-light/50 mb-2">© {new Date().getFullYear()} Majid Aliyev. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </>
  );
}

export default App;