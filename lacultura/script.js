  
    document.addEventListener('DOMContentLoaded', function() {
      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });
      
      // Tab navigation
      const tabButtons = document.querySelectorAll('[data-tab]');
      const tabContents = document.querySelectorAll('.tab-content');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          const tab = this.getAttribute('data-tab');
          
          // Handle special cases for mobile navigation
          if (tab === 'more') {
            toggleMoreMenu();
            return;
          }
          
          if (tab === 'explore') {
            toggleExploreMenu();
            return;
          }
          
          // Update navigation active state
          document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
          });
          document.querySelectorAll(`.nav-item[data-tab="${tab}"]`).forEach(item => {
            item.classList.add('active');
          });
          
          // Show the selected tab content
          tabContents.forEach(content => {
            content.classList.remove('active');
          });
          
          const tabContent = document.getElementById(`${tab}-content`);
          if (tabContent) {
            tabContent.classList.add('active');
            // Scroll to top when changing tabs
            window.scrollTo(0, 0);
          }
          
          // Close the more menu if it's open
          const moreMenu = document.getElementById('mobile-more-menu');
          moreMenu.classList.remove('translate-y-0');
          moreMenu.classList.add('translate-y-full');
          
          // Close the explore menu if it's open
          const exploreMenu = document.getElementById('explore-menu');
          exploreMenu.classList.remove('translate-y-0');
          exploreMenu.classList.add('translate-y-full');
        });
      });
      
      // More menu functionality
      function toggleMoreMenu() {
        const moreMenu = document.getElementById('mobile-more-menu');
        moreMenu.classList.toggle('hidden');
        setTimeout(() => {
          moreMenu.classList.toggle('translate-y-full');
          moreMenu.classList.toggle('translate-y-0');
        }, 10);
      }
      
      const closeMoreBtn = document.getElementById('close-more-menu');
      closeMoreBtn.addEventListener('click', function() {
        const moreMenu = document.getElementById('mobile-more-menu');
        moreMenu.classList.remove('translate-y-0');
        moreMenu.classList.add('translate-y-full');
        setTimeout(() => {
          moreMenu.classList.add('hidden');
        }, 300);
      });
      
      // Explore menu functionality
      function toggleExploreMenu() {
        const exploreMenu = document.getElementById('explore-menu');
        exploreMenu.classList.toggle('hidden');
        setTimeout(() => {
          exploreMenu.classList.toggle('translate-y-full');
          exploreMenu.classList.toggle('translate-y-0');
        }, 10);
      }
      
      const closeExploreBtn = document.getElementById('close-explore');
      if (closeExploreBtn) {
        closeExploreBtn.addEventListener('click', function() {
          const exploreMenu = document.getElementById('explore-menu');
          exploreMenu.classList.remove('translate-y-0');
          exploreMenu.classList.add('translate-y-full');
          setTimeout(() => {
            exploreMenu.classList.add('hidden');
          }, 300);
        });
      }
      
      // Carousel functionality
      let currentSlide = 0;
      const slides = document.querySelectorAll('.carousel-item');
      const totalSlides = slides.length;
      
      function showSlide(index) {
        if (index < 0) {
          currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
          currentSlide = 0;
        } else {
          currentSlide = index;
        }
        
        const carousel = document.getElementById('featured-carousel');
        if (carousel) {
          carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
      }
      
      const prevBtn = document.getElementById('prev-slide');
      const nextBtn = document.getElementById('next-slide');
      
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          showSlide(currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', () => {
          showSlide(currentSlide + 1);
        });
      }
      
      // Auto-advance carousel
      let carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
      
      // Pause carousel on hover
      const carouselContainer = document.querySelector('.carousel-container');
      if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
          clearInterval(carouselInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
          carouselInterval = setInterval(() => {
            showSlide(currentSlide + 1);
          }, 5000);
        });
      }
      
      // Show toast notification
      function showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
          toast.classList.remove('show');
        }, duration);
      }
      
      // FAQ accordion functionality
      const faqQuestions = document.querySelectorAll('.faq-question');
      
      faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
          const answer = this.nextElementSibling;
          const icon = this.querySelector('i');
          
          answer.classList.toggle('hidden');
          icon.classList.toggle('transform');
          icon.classList.toggle('rotate-180');
        });
      });
      
      // Feedback form star rating
      const ratingStars = document.querySelectorAll('.rating-star');
      const ratingValue = document.getElementById('rating-value');
      
      ratingStars.forEach(star => {
        star.addEventListener('click', function() {
          const rating = parseInt(this.getAttribute('data-rating'));
          ratingValue.value = rating;
          
          // Update star appearance
          ratingStars.forEach((s, index) => {
            const starIcon = s.querySelector('i');
            if (index < rating) {
              starIcon.classList.remove('far');
              starIcon.classList.add('fas');
              s.classList.add('text-yellow-500');
            } else {
              starIcon.classList.remove('fas');
              starIcon.classList.add('far');
              s.classList.remove('text-yellow-500');
            }
          });
        });
      });
      
      // Dark mode toggle
      const darkModeToggle = document.getElementById('dark-mode');
      if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
          if (this.checked) {
            document.documentElement.classList.add('dark-mode');
            document.querySelector('.dot').classList.add('transform', 'translate-x-6');
          } else {
            document.documentElement.classList.remove('dark-mode');
            document.querySelector('.dot').classList.remove('transform', 'translate-x-6');
          }
        });
      }
      
      // Form submission handlers
      const feedbackForm = document.getElementById('feedback-form');
      if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const rating = document.getElementById('rating-value').value;
          const feedbackType = document.getElementById('feedback-type').value;
          const message = document.getElementById('feedback-message').value;
          
          if (!rating || rating === '0') {
            showToast('Please provide a rating.');
            return;
          }
          
          if (!feedbackType) {
            showToast('Please select a feedback type.');
            return;
          }
          
          if (!message.trim()) {
            showToast('Please enter your feedback message.');
            return;
          }
          
          // In a real app, this would send data to an API
          // For this prototype, we'll just show a success message
          showToast('Thank you for your feedback! We appreciate your input.');
          feedbackForm.reset();
          
          // Reset star rating display
          ratingStars.forEach(s => {
            const starIcon = s.querySelector('i');
            starIcon.classList.remove('fas');
            starIcon.classList.add('far');
            s.classList.remove('text-yellow-500');
          });
          document.getElementById('rating-value').value = '0';
        });
      }
      
      const contributionForm = document.getElementById('contribution-form');
      if (contributionForm) {
        contributionForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const title = document.getElementById('title').value;
          const category = document.getElementById('category').value;
          const description = document.getElementById('description').value;
          const permission = document.getElementById('permission').checked;
          
          if (!title.trim()) {
            showToast('Please enter a title for your contribution.');
            return;
          }
          
          if (!category) {
            showToast('Please select a category.');
            return;
          }
          
          if (!description.trim()) {
            showToast('Please provide a description.');
            return;
          }
          
          if (!permission) {
            showToast('Please confirm that you have permission to share this content.');
            return;
          }
          
          // In a real app, this would send data to an API
          showToast('Thank you for your contribution! It will be reviewed soon.');
          contributionForm.reset();
        });
      }
      
      // File upload button handler
      const browseFilesBtn = document.getElementById('browse-files');
      const mediaUploadInput = document.getElementById('media-upload');
      
      if (browseFilesBtn && mediaUploadInput) {
        browseFilesBtn.addEventListener('click', function() {
          mediaUploadInput.click();
        });
        
        mediaUploadInput.addEventListener('change', function() {
          if (this.files && this.files.length > 0) {
            const fileName = this.files[0].name;
            showToast(`File selected: ${fileName}`);
          }
        });
      }
      
      // Game functionality
      const gameStartButtons = document.querySelectorAll('.game-start');
      const gameContainer = document.getElementById('game-container');
      const gameArea = document.getElementById('game-area');
      const activeGameTitle = document.getElementById('active-game-title');
      const closeGameBtn = document.getElementById('close-game');
      const restartGameBtn = document.getElementById('restart-game');
      
      gameStartButtons.forEach(button => {
        button.addEventListener('click', function() {
          const gameType = this.getAttribute('data-game');
          startGame(gameType);
        });
      });
      
      function startGame(gameType) {
        gameContainer.classList.remove('hidden');
        window.scrollTo({ top: gameContainer.offsetTop - 20, behavior: 'smooth' });
        
        // Set game title based on game type
        let gameTitle = 'Game';
        switch(gameType) {
          case 'quiz':
            gameTitle = 'Kenyan Culture Quiz';
            gameArea.innerHTML = '<p class="text-center">This is a prototype. In the full version, you would see a cultural quiz with multiple-choice questions about Kenyan traditions, history, and practices.</p>';
            break;
          case 'memory':
            gameTitle = 'Cultural Memory Match';
            gameArea.innerHTML = '<p class="text-center">This is a prototype. In the full version, you would see a memory matching game with cards featuring Kenyan cultural items, symbols, and landmarks.</p>';
            break;
          case 'puzzle':
            gameTitle = 'Kenyan Landmarks Puzzle';
            gameArea.innerHTML = '<p class="text-center">This is a prototype. In the full version, you would see a jigsaw puzzle featuring iconic Kenyan landmarks and cultural sites.</p>';
            break;
          case 'wordsearch':
            gameTitle = 'Kenyan Languages Word Search';
            gameArea.innerHTML = '<p class="text-center">This is a prototype. In the full version, you would see a word search puzzle with words from various Kenyan languages.</p>';
            break;
          case 'bao':
            gameTitle = 'Bao: Traditional Mancala';
            gameArea.innerHTML = '<p class="text-center">This is a prototype. In the full version, you would see a digital version of the traditional East African board game Bao.</p>';
            break;
          case 'explorer':
            gameTitle = 'Kenya Culture Explorer';
            gameArea.innerHTML = '<p class="text-center">This is a prototype. In the full version, you would explore an interactive map of Kenya, discovering cultural facts about different regions and communities.</p>';
            break;
          default:
            gameTitle = 'Cultural Game';
            gameArea.innerHTML = '<p class="text-center">Game loading...</p>';
        }
        
        activeGameTitle.textContent = gameTitle;
      }
      
      if (closeGameBtn) {
        closeGameBtn.addEventListener('click', function() {
          gameContainer.classList.add('hidden');
        });
      }
      
      if (restartGameBtn) {
        restartGameBtn.addEventListener('click', function() {
          showToast('Game restarted!');
          // In a real app, this would reset the game state
        });
      }
      
      // Profile button
      const profileBtn = document.getElementById('profile-btn');
      if (profileBtn) {
        profileBtn.addEventListener('click', function() {
          // Show profile tab content
          tabContents.forEach(content => {
            content.classList.remove('active');
          });
          const profileContent = document.getElementById('profile-content');
          if (profileContent) {
            profileContent.classList.add('active');
          }
        });
      }
      
      // Initialize the app
      showSlide(0);
    });