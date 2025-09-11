// Loading Screen Functionality
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressText = document.querySelector('.progress-text');
    const loadingStatus = document.querySelector('.loading-status');
    
    const statusMessages = [
        "Initializing portfolio...",
        "Loading components...",
        "Preparing projects...",
        "Setting up interface...",
        "Optimizing experience...",
        "Almost ready...",
        "Welcome to my portfolio!"
    ];
    
    let progress = 0;
    let statusIndex = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 8; // Slower progress increment
        if (progress > 100) progress = 100;
        
        progressText.textContent = Math.floor(progress) + '%';
        
        // Update status message based on progress
        const newStatusIndex = Math.floor((progress / 100) * (statusMessages.length - 1));
        if (newStatusIndex !== statusIndex && newStatusIndex < statusMessages.length) {
            statusIndex = newStatusIndex;
            loadingStatus.textContent = statusMessages[statusIndex];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            loadingStatus.textContent = statusMessages[statusMessages.length - 1];
            
            // Wait longer before hiding loading screen
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                mainContent.classList.add('show');
                
                // Remove loading screen from DOM after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500); // Increased from 500ms to 1500ms
        }
    }, 150); // Increased from 100ms to 150ms
});

let menuIcon =document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick =() =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}






let section = document.querySelectorAll('section');
let navLinks =document.querySelectorAll('header nav a');

window.onscroll=() =>{
    section.forEach(sec =>{
        let top = window.scrollY;
        let offset= sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });


        };


    });


    let header = document.querySelector('header');

    header.classList.toggle('sticky',window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};

// Function to refresh section animations
function refreshSectionAnimations(sectionId) {
    // Clear previous section animations and restart
    const currentSection = document.getElementById(sectionId);
    
    if (!currentSection) return;
    
    // Remove and re-add animation classes to restart animations
    const animatedElements = currentSection.querySelectorAll('[class*="animate"], [class*="reveal"], .skill-item, .circular-skill, .services-box, .portfolio-box');
    
    animatedElements.forEach(element => {
        // Temporarily remove animation classes
        const animationClasses = Array.from(element.classList).filter(cls => 
            cls.includes('animate') || cls.includes('reveal') || cls.includes('fadeIn') || cls.includes('slideIn')
        );
        
        // Remove animation classes
        animationClasses.forEach(cls => element.classList.remove(cls));
        
        // Force reflow
        element.offsetHeight;
        
        // Re-add animation classes after a small delay
        setTimeout(() => {
            animationClasses.forEach(cls => element.classList.add(cls));
        }, 50);
    });
    
    // Restart section-specific animations
    switch(sectionId) {
        case 'home':
            restartHomeAnimations();
            break;
        case 'skills':
            restartSkillsAnimations();
            break;
        case 'services':
            restartServicesAnimations();
            break;
        case 'portfolio':
            restartPortfolioAnimations();
            break;
    }
}

// Restart home section animations
function restartHomeAnimations() {
    const robot = document.querySelector('.robot');
    const homeContent = document.querySelector('.home-content');
    
    if (robot) {
        robot.style.animation = 'none';
        robot.offsetHeight; // Force reflow
        robot.style.animation = 'robotIdle 3s ease-in-out infinite alternate';
    }
    
    if (homeContent) {
        const textElements = homeContent.querySelectorAll('h1, h3, p');
        textElements.forEach((element, index) => {
            element.style.animation = 'none';
            element.offsetHeight; // Force reflow
            setTimeout(() => {
                element.style.animation = 'slideInFromLeft 1s ease forwards';
            }, index * 200);
        });
    }
}

// Restart skills section animations
function restartSkillsAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    const circularSkills = document.querySelectorAll('.circular-skill');
    
    // Reset and animate skill bars
    skillItems.forEach((item, index) => {
        const progressBar = item.querySelector('.skill-progress');
        if (progressBar) {
            const targetWidth = progressBar.dataset.width + '%';
            progressBar.style.width = '0%';
            progressBar.style.transition = 'none';
            
            setTimeout(() => {
                progressBar.style.transition = 'width 1.5s ease-in-out';
                progressBar.style.width = targetWidth;
            }, index * 100);
        }
    });
    
    // Reset and animate circular progress
    circularSkills.forEach((skill, index) => {
        setTimeout(() => {
            const circularProgress = skill.querySelector('.circular-progress');
            const percentage = parseInt(circularProgress.dataset.percentage);
            const circle = circularProgress.querySelector('.progress-ring__circle--active');
            const percentageElement = circularProgress.querySelector('.skill-percentage');
            
            if (circle && percentageElement) {
                const circumference = 2 * Math.PI * 50;
                const offset = circumference - (percentage / 100) * circumference;
                
                // Reset to initial state
                circle.style.strokeDashoffset = circumference;
                percentageElement.textContent = '0%';
                
                // Animate to final state
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                    animateNumber(percentageElement, 0, percentage, 2000);
                }, 200);
            }
        }, index * 200);
    });
}

// Restart services section animations
function restartServicesAnimations() {
    const serviceBoxes = document.querySelectorAll('.services-box');
    serviceBoxes.forEach((box, index) => {
        box.style.transform = 'translateY(50px)';
        box.style.opacity = '0';
        setTimeout(() => {
            box.style.transform = 'translateY(0)';
            box.style.opacity = '1';
            box.style.transition = 'all 0.8s ease';
        }, index * 200);
    });
}

// Restart portfolio section animations
function restartPortfolioAnimations() {
    const portfolioBoxes = document.querySelectorAll('.portfolio-box');
    portfolioBoxes.forEach((box, index) => {
        box.style.transform = 'scale(0.8)';
        box.style.opacity = '0';
        setTimeout(() => {
            box.style.transform = 'scale(1)';
            box.style.opacity = '1';
            box.style.transition = 'all 0.6s ease';
        }, index * 150);
    });
}

ScrollReveal({
   // reset:true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content, .heading',{origin:'top'});
ScrollReveal().reveal('.home-img, .services-container,.portfolio-box,.contact form',{origin:'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img',{origin:'left'});
ScrollReveal().reveal('.home-content p, .about-content',{origin:'right'});

// Skills Section Animations
ScrollReveal().reveal('.skills-category',{origin:'bottom', distance:'50px', duration:1000, delay:200});
ScrollReveal().reveal('.circular-skill',{origin:'bottom', distance:'30px', duration:800, delay:300, interval:200});

// Enhanced Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    const skillCategories = document.querySelectorAll('.skills-category');
    const professionalSkills = document.querySelector('.professional-skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                skillCategories.forEach(category => {
                    category.classList.add('animate-in');
                });
                
                if (professionalSkills) {
                    professionalSkills.classList.add('animate-in');
                }
                
                // Animate skill bars with enhanced effects
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                        
                        // Add number counting animation
                        const percentageElement = bar.closest('.skill-item').querySelector('.skill-percentage');
                        animateNumber(percentageElement, 0, parseInt(width), 1500);
                        
                        // Add sparkle effect when bar completes
                        setTimeout(() => {
                            addSparkleEffect(bar);
                        }, 1500);
                        
                    }, index * 300);
                });
                
                // Animate circular progress with enhanced effects
                setTimeout(() => {
                    animateCircularProgress();
                }, 800);
                
                observer.disconnect(); // Only animate once
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Enhanced Circular Progress Animation
function animateCircularProgress() {
    const circularProgress = document.querySelectorAll('.circular-progress');
    
    circularProgress.forEach((progress, index) => {
        setTimeout(() => {
            const percentage = parseInt(progress.dataset.percentage);
            const circle = progress.querySelector('.progress-ring__circle--active');
            const percentageElement = progress.querySelector('.skill-percentage');
            
            if (circle && percentageElement) {
                const circumference = 2 * Math.PI * 50; // radius = 50
                const offset = circumference - (percentage / 100) * circumference;
                
                // Set initial state
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;
                
                // Animate to final state
                setTimeout(() => {
                    circle.style.strokeDashoffset = offset;
                }, 100);
                
                // Animate number counting
                animateNumber(percentageElement, 0, percentage, 2000);
            }
        }, index * 400);
    });
}

// Number counting animation
function animateNumber(element, start, end, duration) {
    if (!element) return;
    
    const startTime = performance.now();
    const originalText = element.textContent;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = originalText; // Restore original text
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Add sparkle effect to skill bars
function addSparkleEffect(skillBar) {
    const sparkle = document.createElement('div');
    sparkle.className = 'skill-sparkle';
    sparkle.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        width: 10px;
        height: 10px;
        background: var(--main-color);
        border-radius: 50%;
        box-shadow: 0 0 15px var(--main-color);
        animation: sparkleEffect 1s ease-out forwards;
        pointer-events: none;
    `;
    
    // Add sparkle animation
    const sparkleAnimation = `
        @keyframes sparkleEffect {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    // Add animation to document if not exists
    if (!document.querySelector('#sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = sparkleAnimation;
        document.head.appendChild(style);
    }
    
    skillBar.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add sparkle effect to circular progress
function addCircularSparkle(circularProgress) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                width: 4px;
                height: 4px;
                background: var(--main-color);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--main-color);
                animation: circularSparkle 1.5s ease-out forwards;
                pointer-events: none;
            `;
            
            circularProgress.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }, i * 200);
    }
}

// Add hover effects for skill items
function addSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    const circularSkills = document.querySelectorAll('.circular-skill');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.transform = 'scaleY(1.2)';
                progressBar.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.transform = 'scaleY(1)';
            }
        });
    });
    
    circularSkills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            const circle = skill.querySelector('.progress-ring__circle');
            if (circle) {
                circle.style.strokeWidth = '10';
                circle.style.transition = 'stroke-width 0.3s ease';
            }
        });
        
        skill.addEventListener('mouseleave', () => {
            const circle = skill.querySelector('.progress-ring__circle');
            if (circle) {
                circle.style.strokeWidth = '8';
            }
        });
    });
}

// Initialize skill animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    addSkillHoverEffects();
    
    // Add circular sparkle animation to CSS
    const circularSparkleAnimation = `
        @keyframes circularSparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(2) rotate(180deg);
                opacity: 0.6;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = circularSparkleAnimation;
    document.head.appendChild(style);
});


const typed = new Typed('.multiple-text',{
    strings:['Frontend Developer ','Full-Stack Developer','UI/UX Designer'],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true

});

// Chatbot Functionality
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.init();
        this.setupResponses();
    }

    init() {
        this.chatbotIcon = document.getElementById('chatbot-icon');
        this.chatbotPopup = document.getElementById('chatbot-popup');
        this.chatbotClose = document.getElementById('chatbot-close');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        this.quickQuestions = document.querySelectorAll('.quick-question');

        this.bindEvents();
    }

    bindEvents() {
        this.chatbotIcon.addEventListener('click', () => this.toggleChatbot());
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());
        this.chatbotSend.addEventListener('click', () => this.sendMessage());
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.quickQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const questionText = question.getAttribute('data-question');
                this.addUserMessage(questionText);
                this.respondToMessage(questionText);
            });
        });
    }

    setupResponses() {
        this.responses = {
            projects: [
                "🚀 Here are some of Eranga's notable projects:",
                "",
                "🌐 <strong>Ruchi Packaging System</strong>",
                "• Full-stack web application for order management",
                "• Built with React.js, Node.js, and MySQL",
                "• Features: Order handling, resource allocation, delivery management",
                "• GitHub: https://github.com/Eranga999/packagingSystem",
                "",
                "📱 <strong>Mobile Applications</strong>",
                "• To-Do List App (Kotlin/Android): https://github.com/Eranga999/mobile-application-todo_list-app",
                "• Fashion Shopping App: https://github.com/Eranga999/menonlinefashionshop",
                "• All built using Android Studio with modern UI/UX",
                "",
                "🎯 <strong>Web Projects</strong>",
                "• Online Fitness Trainer Platform: https://github.com/Eranga999/First-year-second-semester-online-fitness-trainner-",
                "• Currency Converter: https://github.com/Eranga999/Currency-Converter-Website",
                "• Responsive design and user-friendly interfaces",
                "",
                "Check out the Portfolio section for live demos and more GitHub links! 👆"
            ],
            skills: [
                "💻 <strong>Eranga's Technical Expertise:</strong>",
                "",
                "🎨 <strong>Frontend Development</strong>",
                "• HTML5, CSS3, JavaScript (ES6+)",
                "• React.js for dynamic web applications",
                "• Responsive design & mobile-first approach",
                "• Bootstrap for rapid UI development",
                "",
                "⚙️ <strong>Backend Development</strong>",
                "• Node.js & Express.js",
                "• PHP for server-side scripting",
                "• RESTful API development",
                "• Database design and management",
                "",
                "📱 <strong>Mobile Development</strong>",
                "• Kotlin for Android development",
                "• Android Studio IDE",
                "• Material Design principles",
                "",
                "🗄️ <strong>Databases</strong>",
                "• MySQL for relational databases",
                "• Database optimization and queries",
                "",
                "🎨 <strong>Design & Tools</strong>",
                "• Figma for UI/UX design",
                "• Git & GitHub for version control",
                "• VS Code as primary development environment"
            ],
            contact: [
                "📞 <strong>Let's Connect!</strong>",
                "",
                "Eranga is always open to new opportunities and collaborations:",
                "",
                "📧 <strong>Direct Contact</strong>",
                "• Use the contact form above for quick messages",
                "• Professional inquiries welcome",
                "",
                "🔗 <strong>Social & Professional Networks</strong>",
                "• LinkedIn: https://linkedin.com/in/eranga-harsha-16b941307/",
                "• GitHub: https://github.com/Eranga999 (View code repositories)",
                "• Instagram: https://www.instagram.com/_eranga_harsha_",
                "• Facebook: https://www.facebook.com/share/1AuyiyxSNK/",
                "",
                "💼 <strong>Download Resume</strong>",
                "• Complete CV available for download in the header",
                "",
                "🤝 Feel free to reach out for projects, collaborations, or just to say hello!"
            ],
            services: [
                "⚡ <strong>Professional Services Offered:</strong>",
                "",
                "🌐 <strong>Web Development</strong>",
                "• Custom web applications from scratch",
                "• Responsive design for all devices",
                "• Frontend and backend development",
                "• Database integration and API development",
                "",
                "📱 <strong>Mobile App Development</strong>",
                "• Native Android apps using Kotlin",
                "• User-friendly interfaces with Material Design",
                "• API integration and data management",
                "• Performance optimization",
                "",
                "🎨 <strong>UI/UX Design</strong>",
                "• User-centered design approach",
                "• Wireframing and prototyping in Figma",
                "• Modern, intuitive interface design",
                "• User experience optimization",
                "",
                "🔧 <strong>Technical Consulting</strong>",
                "• Project planning and architecture",
                "• Technology stack recommendations",
                "• Code review and optimization",
                "",
                "📊 Currently building portfolio while studying - competitive rates for quality work!"
            ],
            about: [
                "👨‍💻 <strong>Meet Eranga Harsha!</strong>",
                "",
                "🎓 <strong>Current Status</strong>",
                "• 3rd-year IT student at SLIIT Campus",
                "• Specializing in Software Engineering",
                "• Expected graduation: 2025",
                "",
                "💡 <strong>Passion & Vision</strong>",
                "• Passionate Full Stack Developer & UI/UX Designer",
                "• Focused on creating intuitive user experiences",
                "• Believes in clean, efficient, and scalable code",
                "• Committed to continuous learning and innovation",
                "",
                "🚀 <strong>What Drives Him</strong>",
                "• Problem-solving through technology",
                "• Creating impactful digital solutions",
                "• Learning cutting-edge technologies",
                "• Building meaningful projects",
                "",
                "🎯 <strong>Career Goals</strong>",
                "• Becoming a well-rounded full-stack developer",
                "• Contributing to innovative tech projects",
                "• Making a positive impact through technology"
            ],
            education: [
                "🎓 <strong>Educational Journey:</strong>",
                "",
                "🏫 <strong>Current Education</strong>",
                "• Sri Lanka Institute of Information Technology (SLIIT)",
                "• Bachelor's Degree in Information Technology",
                "• Currently in 3rd year (2022-2025)",
                "• Focus: Software Engineering & Development",
                "",
                "📚 <strong>Academic Focus Areas</strong>",
                "• Software Development & Engineering",
                "• Database Management Systems",
                "• Web & Mobile Application Development",
                "• UI/UX Design Principles",
                "• Project Management",
                "",
                "🏆 <strong>Learning Approach</strong>",
                "• Hands-on project-based learning",
                "• Industry-relevant skill development",
                "• Continuous self-improvement",
                "• Stay updated with latest tech trends",
                "",
                "💼 <strong>Practical Experience</strong>",
                "• Multiple academic and personal projects",
                "• Real-world application development",
                "• Collaborative team projects"
            ],
            experience: [
                "💼 <strong>Professional Experience & Skills:</strong>",
                "",
                "🔧 <strong>Development Experience</strong>",
                "• 2+ years of hands-on programming experience",
                "• Full-stack web application development",
                "• Mobile app development for Android platform",
                "• Database design and implementation",
                "",
                "📱 <strong>Project Portfolio</strong>",
                "• Successfully completed 5+ major projects",
                "• Web applications with modern frameworks",
                "• Mobile apps with 1000+ lines of code",
                "• UI/UX designs for various platforms",
                "",
                "🛠️ <strong>Technical Proficiencies</strong>",
                "• Frontend: React.js, HTML5, CSS3, JavaScript",
                "• Backend: Node.js, PHP, Express.js",
                "• Mobile: Kotlin, Android Studio",
                "• Database: MySQL, API integration",
                "• Design: Figma, responsive design",
                "",
                "🎯 <strong>Key Strengths</strong>",
                "• Problem-solving and analytical thinking",
                "• Clean, maintainable code writing",
                "• User-centered design approach",
                "• Quick adaptation to new technologies",
                "",
                "🚀 While still building professional experience, Eranga demonstrates strong technical skills and dedication to quality development!"
            ],
            cv: [
                "📄 <strong>Eranga's CV Highlights:</strong>",
                "",
                "📞 <strong>Contact Information</strong>",
                "• Available through the contact form above",
                "• Professional LinkedIn profile linked",
                "• GitHub portfolio with code samples",
                "",
                "🎯 <strong>Career Objective</strong>",
                "• Aspiring Full Stack Developer",
                "• Focus on creating innovative digital solutions",
                "• Seeking opportunities in software development",
                "",
                "💼 <strong>What's in the CV</strong>",
                "• Complete educational background",
                "• Detailed project descriptions",
                "• Technical skills and proficiencies",
                "• Contact information and references",
                "",
                "📥 <strong>Download Options</strong>",
                "• Click 'Download CV' button in the header",
                "• PDF format for easy viewing",
                "• Always up-to-date with latest achievements",
                "",
                "💡 The CV provides a comprehensive overview of Eranga's academic and technical journey!"
            ]
        };
    }

    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.chatbotPopup.classList.add('show');
        this.isOpen = true;
        
        // Add a small delay before focusing to ensure animation completes
        setTimeout(() => {
            this.chatbotInput.focus();
        }, 300);
        
        // Add welcome back message if returning user
        if (localStorage.getItem('chatbot_visited')) {
            // User has visited before - could add a "Welcome back!" message
        } else {
            localStorage.setItem('chatbot_visited', 'true');
        }
    }

    closeChatbot() {
        this.chatbotPopup.classList.remove('show');
        this.isOpen = false;
        this.chatbotInput.blur();
    }

    sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (message) {
            this.addUserMessage(message);
            this.chatbotInput.value = '';
            this.respondToMessage(message);
        }
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(20px)';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.chatbotMessages.appendChild(messageDiv);
        
        // Animate message appearance
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        }, 50);
        
        this.scrollToBottom();
    }

    addBotMessage(messages) {
        // Show typing indicator
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px)';
            
            const content = Array.isArray(messages) 
                ? messages.map(msg => {
                    if (msg === "") {
                        return "<br>"; // Handle empty lines
                    }
                    // Convert URLs to clickable links
                    const linkifiedMsg = this.linkifyText(msg);
                    return `<p>${linkifiedMsg}</p>`;
                }).join('')
                : `<p>${this.linkifyText(messages)}</p>`;
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${content}
                </div>
            `;
            this.chatbotMessages.appendChild(messageDiv);
            
            // Animate message appearance
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 50);
            
            this.scrollToBottom();
        }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds for more natural feel
    }

    linkifyText(text) {
        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        // Replace URLs with clickable links
        return text.replace(urlRegex, (url) => {
            // Remove trailing punctuation if present
            const cleanUrl = url.replace(/[.,!?;:]$/, '');
            const punctuation = url.length > cleanUrl.length ? url.slice(-1) : '';
            
            return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="chatbot-link">${cleanUrl}</a>${punctuation}`;
        });
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.chatbotMessages.appendChild(typingDiv);
        this.scrollToBottom();
        
        // Add a subtle sound effect simulation
        this.simulateTypingSound();
    }
    
    simulateTypingSound() {
        // This creates a visual feedback for typing
        const indicator = this.chatbotMessages.querySelector('.typing-indicator');
        if (indicator) {
            indicator.style.transform = 'scale(1.02)';
            setTimeout(() => {
                if (indicator && indicator.parentNode) {
                    indicator.style.transform = 'scale(1)';
                }
            }, 100);
        }
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatbotMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    respondToMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response;

        if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
            response = this.responses.projects;
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('programming')) {
            response = this.responses.skills;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            response = this.responses.contact;
        } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what can you do') || lowerMessage.includes('hire')) {
            response = this.responses.services;
        } else if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('eranga') || lowerMessage.includes('tell me')) {
            response = this.responses.about;
        } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('university') || lowerMessage.includes('sliit') || lowerMessage.includes('degree')) {
            response = this.responses.education;
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('career') || lowerMessage.includes('professional')) {
            response = this.responses.experience;
        } else if (lowerMessage.includes('cv') || lowerMessage.includes('resume') || lowerMessage.includes('download') || lowerMessage.includes('qualification')) {
            response = this.responses.cv;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
            response = [
                "👋 <strong>Hello there! Welcome to Eranga's Portfolio!</strong>",
                "",
                "I'm your dedicated portfolio assistant, excited to help you explore:",
                "",
                "🚀 <strong>Featured Projects</strong>",
                "• Ruchi Packaging System (React, Node.js, MySQL)",
                "• Mobile Apps (Kotlin/Android)",
                "• Web Applications & UI/UX Designs",
                "",
                "💻 <strong>Technical Skills</strong>",
                "• Full-Stack Development (Frontend + Backend)",
                "• Mobile Development (Android/Kotlin)",
                "• UI/UX Design (Figma)",
                "",
                "🎯 <strong>Quick Actions</strong>",
                "• View detailed project information",
                "• Get contact details for collaboration",
                "• Download complete CV/Resume",
                "• Learn about services offered",
                "",
                "✨ <em>Feel free to ask me anything or use the quick buttons below!</em>"
            ];
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
            response = [
                "You're absolutely welcome! 😊 <strong>Happy to help!</strong>",
                "",
                "🌟 I'm glad I could assist you in learning more about Eranga's portfolio.",
                "",
                "💡 <strong>Need More Information?</strong>",
                "• Feel free to ask about specific projects",
                "• Inquire about technical details",
                "• Get contact information for collaboration",
                "",
                "🚀 Don't hesitate to reach out if you have any other questions!"
            ];
        } else if (lowerMessage.includes('kotlin') || lowerMessage.includes('android') || lowerMessage.includes('mobile')) {
            response = [
                "📱 <strong>Mobile Development Expertise!</strong>",
                "",
                "🔧 <strong>Kotlin & Android</strong>",
                "• Native Android app development",
                "• Modern Kotlin programming language",
                "• Material Design implementation",
                "• Android Studio IDE proficiency",
                "",
                "📋 <strong>Recent Mobile Projects</strong>",
                "• To-Do List App with full CRUD operations",
                "• Fashion Shopping App with cart functionality", 
                "• User-friendly interfaces and smooth performance",
                "",
                "💡 Eranga focuses on creating intuitive mobile experiences!"
            ];
        } else if (lowerMessage.includes('react') || lowerMessage.includes('web') || lowerMessage.includes('frontend') || lowerMessage.includes('backend')) {
            response = [
                "🌐 <strong>Web Development Skills!</strong>",
                "",
                "⚛️ <strong>Frontend Technologies</strong>",
                "• React.js for dynamic user interfaces",
                "• HTML5, CSS3, JavaScript (ES6+)",
                "• Responsive design principles",
                "• Modern UI/UX implementation",
                "",
                "⚙️ <strong>Backend Development</strong>",
                "• Node.js & Express.js",
                "• PHP for server-side development",
                "• MySQL database management",
                "• RESTful API development",
                "",
                "🏆 <strong>Notable Project</strong>",
                "• Ruchi Packaging System - Full-stack solution with React, Node.js, and MySQL"
            ];
        } else if (lowerMessage.includes('figma') || lowerMessage.includes('design') || lowerMessage.includes('ui') || lowerMessage.includes('ux')) {
            response = [
                "🎨 <strong>UI/UX Design Excellence!</strong>",
                "",
                "🔧 <strong>Design Tools & Skills</strong>",
                "• Figma for professional design work",
                "• Wireframing and prototyping",
                "• User-centered design approach",
                "• Modern interface design principles",
                "",
                "💡 <strong>Design Philosophy</strong>",
                "• Focus on user experience and usability",
                "• Clean, intuitive interface design",
                "• Mobile-first responsive approach",
                "• Consistent design systems",
                "",
                "🌟 Check out the portfolio section to see design work in action!",
                "📐 Figma Portfolio: https://www.figma.com/design/OGDIeQxBPByNxVuuhuxCu7/Untitled?node-id=0-1&p=f&t=RZBLR5DJuTsPgW1L-0"
            ];
        } else {
            response = [
                "🤔 <strong>That's a great question!</strong>",
                "",
                "I'd love to help you learn more about Eranga. Here are some popular topics:",
                "",
                "💼 <strong>Professional Areas</strong>",
                "• <em>Projects</em> - View his latest development work",
                "• <em>Skills</em> - Technical expertise and tools",
                "• <em>Services</em> - What he can do for you",
                "• <em>Experience</em> - Professional background",
                "",
                "📚 <strong>Personal Information</strong>",
                "• <em>About</em> - Get to know Eranga",
                "• <em>Education</em> - Academic background",
                "• <em>Contact</em> - How to reach him",
                "• <em>CV</em> - Download his resume",
                "",
                "✨ Try asking something like 'Tell me about his projects' or use the quick buttons below!"
            ];
        }

        this.addBotMessage(response);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatbotMessages.scrollTo({
                top: this.chatbotMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
    
    // Robot Eye Tracking Functionality
    const leftEye = document.querySelector('.left-eye');
    const rightEye = document.querySelector('.right-eye');
    const robot = document.querySelector('.robot-container');
    
    if (leftEye && rightEye && robot) {
        // Eye tracking on mouse move
        document.addEventListener('mousemove', function(e) {
            const robotRect = robot.getBoundingClientRect();
            const robotCenterX = robotRect.left + robotRect.width / 2;
            const robotCenterY = robotRect.top + robotRect.height / 2;
            
            // Calculate angle from robot center to mouse
            const deltaX = e.clientX - robotCenterX;
            const deltaY = e.clientY - robotCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            
            // Calculate eye movement (limit the movement range)
            const eyeMovementRange = 8; // pixels
            const eyeX = Math.cos(angle) * eyeMovementRange;
            const eyeY = Math.sin(angle) * eyeMovementRange;
            
            // Apply smooth movement to both eyes
            leftEye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
            rightEye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        });
        
        // Robot interactions
        robot.addEventListener('mouseenter', function() {
            robot.style.transform = 'scale(1.05)';
            robot.style.transition = 'transform 0.3s ease';
            
            // Trigger talking animation
            const mouth = robot.querySelector('.mouth');
            if (mouth) {
                mouth.style.animation = 'mouthTalk 0.5s ease-in-out infinite';
            }
            
            // Pulse antenna
            const antennaBall = robot.querySelector('.antenna-ball');
            if (antennaBall) {
                antennaBall.style.animation = 'ballPulse 1s ease-in-out infinite';
            }
        });
        
        robot.addEventListener('mouseleave', function() {
            robot.style.transform = 'scale(1)';
            
            // Reset eye position
            leftEye.style.transform = 'translate(0, 0)';
            rightEye.style.transform = 'translate(0, 0)';
            
            // Stop talking animation
            const mouth = robot.querySelector('.mouth');
            if (mouth) {
                mouth.style.animation = 'none';
            }
            
            // Reset antenna
            const antennaBall = robot.querySelector('.antenna-ball');
            if (antennaBall) {
                antennaBall.style.animation = 'ballPulse 2s ease-in-out infinite';
            }
        });
        
        // Click interaction
        robot.addEventListener('click', function() {
            // Trigger excited animation
            robot.style.animation = 'robotIdle 0.5s ease-in-out';
            
            // Reset animation after completion
            setTimeout(() => {
                robot.style.animation = 'floatRobot 6s ease-in-out infinite';
            }, 500);
            
            // Show a fun message
            showRobotMessage();
        });
    }
});

// Function to show robot messages
function showRobotMessage() {
    const messages = [
        "Hello! I'm Eranga's portfolio assistant! 🤖",
        "Impressive portfolio, isn't it? 💻",
        "Want to know more about my creator? 🚀",
        "Check out the amazing projects below! ⭐",
        "Ready to collaborate? Let's connect! 🤝"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create temporary message bubble
    const messageElement = document.createElement('div');
    messageElement.textContent = randomMessage;
    messageElement.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(14, 255, 255, 0.1), rgba(14, 255, 255, 0.2));
        border: 1px solid var(--main-color);
        padding: 1rem 2rem;
        border-radius: 2rem;
        color: var(--main-color);
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(14, 255, 255, 0.3);
        animation: fadeInOut 3s ease-in-out forwards;
    `;
    
    // Add fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageElement);
    
    // Remove message after animation
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 3000);
}