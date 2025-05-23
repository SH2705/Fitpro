document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      const hamburger = navToggle.querySelector('.hamburger');
      hamburger.classList.toggle('open');
      
      if (hamburger.classList.contains('open')) {
        hamburger.style.backgroundColor = 'transparent';
        hamburger.style.transform = 'rotate(45deg)';
        hamburger.style.position = 'relative';
        
        hamburger.querySelectorAll('::before').forEach(function(el) {
          el.style.top = '0';
          el.style.transform = 'rotate(-90deg)';
        });
        
        hamburger.querySelectorAll('::after').forEach(function(el) {
          el.style.bottom = '0';
          el.style.transform = 'rotate(-90deg)';
        });
      } else {
        hamburger.style.backgroundColor = '';
        hamburger.style.transform = '';
        hamburger.style.position = '';
        
        hamburger.querySelectorAll('::before').forEach(function(el) {
          el.style.top = '';
          el.style.transform = '';
        });
        
        hamburger.querySelectorAll('::after').forEach(function(el) {
          el.style.bottom = '';
          el.style.transform = '';
        });
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
        
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Services filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter services
      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          
          // Add animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Class Schedule tabs
  const scheduleTabs = document.querySelectorAll('.schedule-tab');
  const scheduleTable = document.getElementById('schedule-body');
  
  // Schedule data
  const scheduleData = {
    monday: [
      { time: '6:00 AM', class: 'Morning Yoga', trainer: 'Sarah Johnson', duration: '60 min', spots: 12 },
      { time: '9:00 AM', class: 'HIIT Training', trainer: 'Mike Chen', duration: '45 min', spots: 8 },
      { time: '12:00 PM', class: 'Strength Training', trainer: 'David Wilson', duration: '60 min', spots: 10 },
      { time: '6:00 PM', class: 'Cardio Blast', trainer: 'Lisa Garcia', duration: '45 min', spots: 15 },
      { time: '7:30 PM', class: 'Pilates', trainer: 'Emma Davis', duration: '60 min', spots: 12 }
    ],
    tuesday: [
      { time: '6:30 AM', class: 'CrossFit', trainer: 'Jake Miller', duration: '60 min', spots: 10 },
      { time: '9:30 AM', class: 'Zumba', trainer: 'Maria Rodriguez', duration: '45 min', spots: 20 },
      { time: '12:30 PM', class: 'Boxing', trainer: 'Tony Anderson', duration: '50 min', spots: 12 },
      { time: '6:30 PM', class: 'Yoga Flow', trainer: 'Sarah Johnson', duration: '60 min', spots: 15 }
    ],
    wednesday: [
      { time: '6:00 AM', class: 'Spin Class', trainer: 'Rachel Green', duration: '45 min', spots: 16 },
      { time: '10:00 AM', class: 'Functional Training', trainer: 'Mike Chen', duration: '55 min', spots: 12 },
      { time: '1:00 PM', class: 'Power Yoga', trainer: 'Emma Davis', duration: '60 min', spots: 14 },
      { time: '7:00 PM', class: 'Total Body Workout', trainer: 'David Wilson', duration: '50 min', spots: 10 }
    ],
    thursday: [
      { time: '6:30 AM', class: 'HIIT Training', trainer: 'Lisa Garcia', duration: '45 min', spots: 8 },
      { time: '9:00 AM', class: 'Pilates', trainer: 'Emma Davis', duration: '60 min', spots: 12 },
      { time: '12:00 PM', class: 'Boxing', trainer: 'Tony Anderson', duration: '50 min', spots: 10 },
      { time: '6:00 PM', class: 'Dance Fitness', trainer: 'Maria Rodriguez', duration: '55 min', spots: 18 }
    ],
    friday: [
      { time: '6:00 AM', class: 'CrossFit', trainer: 'Jake Miller', duration: '60 min', spots: 12 },
      { time: '9:30 AM', class: 'Yoga', trainer: 'Sarah Johnson', duration: '60 min', spots: 15 },
      { time: '12:30 PM', class: 'Strength Training', trainer: 'David Wilson', duration: '60 min', spots: 10 },
      { time: '6:30 PM', class: 'HIIT Friday', trainer: 'Mike Chen', duration: '45 min', spots: 12 }
    ],
    saturday: [
      { time: '8:00 AM', class: 'Weekend Warriors', trainer: 'Jake Miller', duration: '75 min', spots: 15 },
      { time: '10:30 AM', class: 'Family Yoga', trainer: 'Sarah Johnson', duration: '45 min', spots: 20 },
      { time: '2:00 PM', class: 'Open Gym', trainer: 'Various', duration: '120 min', spots: 30 }
    ],
    sunday: [
      { time: '9:00 AM', class: 'Restorative Yoga', trainer: 'Emma Davis', duration: '75 min', spots: 16 },
      { time: '11:00 AM', class: 'Mindful Movement', trainer: 'Sarah Johnson', duration: '60 min', spots: 12 },
      { time: '4:00 PM', class: 'Sunday Strength', trainer: 'David Wilson', duration: '60 min', spots: 10 }
    ]
  };
  
  // Function to render schedule table
  function renderSchedule(day) {
    if (!scheduleTable) return;
    
    scheduleTable.innerHTML = '';
    
    const dayData = scheduleData[day];
    
    dayData.forEach(item => {
      const row = document.createElement('tr');
      
      // Create class for spots availability
      let availabilityClass = 'high';
      if (item.spots <= 5) {
        availabilityClass = 'low';
      } else if (item.spots <= 10) {
        availabilityClass = 'medium';
      }
      
      row.innerHTML = `
        <td class="time">${item.time}</td>
        <td class="class">${item.class}</td>
        <td class="trainer">${item.trainer}</td>
        <td class="duration">${item.duration}</td>
        <td class="spots">
          <span class="availability ${availabilityClass}">${item.spots} spots</span>
        </td>
        <td class="action">
          <button class="btn btn-primary">Book Now</button>
        </td>
      `;
      
      scheduleTable.appendChild(row);
    });
  }
  
  // Initialize schedule with Monday data
  renderSchedule('monday');
  
  // Add event listeners to schedule tabs
  scheduleTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      scheduleTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const day = this.getAttribute('data-day');
      renderSchedule(day);
    });
  });
  
  // Trainer cards interaction
  const trainerCards = document.querySelectorAll('.trainer-card');
  
  trainerCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
  
  // Testimonial slider
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const testimonialSlider = document.querySelector('.testimonials-slider');
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  let currentTestimonial = 0;
  
  // Function to show a specific testimonial
  function showTestimonial(index) {
    const testimonialWidth = testimonials[0].offsetWidth;
    
    testimonials.forEach((t, i) => {
      t.style.transform = `translateX(${(i - index) * 100}%)`;
      t.style.opacity = i === index ? '1' : '0';
      t.style.transition = 'transform 0.6s ease, opacity 0.4s ease';
    });
    
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
  }
  
  // Initialize first testimonial
  showTestimonial(0);
  
  // Auto rotate testimonials
  setInterval(() => {
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }, 5000);
  
  // Add click event to testimonial dots
  testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => showTestimonial(i));
  });
  
  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Simple validation
      if (!nameInput.value.trim()) {
        isValid = false;
        nameInput.style.borderColor = 'red';
      } else {
        nameInput.style.borderColor = '';
      }
      
      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        isValid = false;
        emailInput.style.borderColor = 'red';
      } else {
        emailInput.style.borderColor = '';
      }
      
      if (!messageInput.value.trim()) {
        isValid = false;
        messageInput.style.borderColor = 'red';
      } else {
        messageInput.style.borderColor = '';
      }
      
      if (isValid) {
        // In a real app, you would send this data to your server
        alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all required fields correctly.');
      }
    });
  }
  
  // Scroll to top button
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
      } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add animation to elements when they come into view
  const animateElements = document.querySelectorAll('.fade-in, .slide-up');
  
  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;
    
    animateElements.forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
      const elementBottomPosition = elementTopPosition + elementHeight;
      
      // Check if element is in view
      if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {
        element.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('resize', checkIfInView);
  
  // Initial check
  checkIfInView();
});