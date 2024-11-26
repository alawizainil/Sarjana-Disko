document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('myAudio');
  const playPauseButton = document.getElementById('playPauseButton');
  const circle = document.querySelector('.circle');
  const navLinks = document.querySelectorAll('.nav-link');
  const submenu = document.getElementById('submenu');
  const submenuLinks = document.querySelectorAll('.submenu-link');
  const sections = document.querySelectorAll('section');
  const aboutSection = document.getElementById('about');
  const flipImage = document.getElementById('flipImage');
  const lyricsCard = document.querySelector('.rounded-rectangle-card:not(.empty-card)'); // Select the lyrics card (not the empty one)
  const emptyCard = document.querySelector('.rounded-rectangle-card.empty-card'); // Select the empty card
  const flipImageMV = document.getElementById('flipImageMV'); // Select the MV flip button
  const mvCard = document.querySelector('#about-mv .rounded-rectangle-card'); // Select the MV card
  const mvEmptyCard = document.querySelector('#about-mv .empty-card'); // Select the MV empty card

  // Ensure autoplay is explicitly disabled
  audio.autoplay = false;

  // Set initial state based on the audio's paused state
  if (audio.paused) {
      circle.style.animationPlayState = 'paused';
      playPauseButton.textContent = 'Play Song';
  } else {
      circle.style.animationPlayState = 'running';
      playPauseButton.textContent = 'Pause Song';
  }

  // Toggle play/pause functionality
  playPauseButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (audio.paused) {
          audio.play();
          circle.style.animationPlayState = 'running';
          playPauseButton.textContent = 'Pause Song';
      } else {
          audio.pause();
          circle.style.animationPlayState = 'paused';
          playPauseButton.textContent = 'Play Song';
      }
  });

  flipImage.addEventListener('click', () => {
    lyricsCard.classList.toggle('hidden'); // Hide/show the lyrics card
    emptyCard.classList.toggle('hidden'); // Hide/show the empty card
  });

  flipImageMV.addEventListener('click', () => {
    mvCard.classList.toggle('hidden'); // Hide/show the MV card
    mvEmptyCard.classList.toggle('hidden'); // Hide/show the MV empty card
  });
  
  // Helper to toggle submenu visibility
  function toggleSubmenu(show) {
      if (show) {
          submenu.classList.add('show');
      } else {
          submenu.classList.remove('show');
      }
  }

  // Navigation and Submenu Functionality
  navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          targetElement.scrollIntoView({ behavior: 'smooth' });

          // Update active link
          navLinks.forEach(navLink => navLink.classList.remove('active'));
          link.classList.add('active');

          // Show/hide submenu based on the clicked link
          toggleSubmenu(targetId === '#about');
      });
  });

  // Submenu link click handling
  submenuLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          targetElement.scrollIntoView({ behavior: 'smooth' });

          // Update active submenu link
          submenuLinks.forEach(submenuLink => submenuLink.classList.remove('active'));
          link.classList.add('active');

          // Show the clicked about-content section
          document.querySelectorAll('.about-content').forEach(section => section.classList.remove('active'));
          targetElement.classList.add('active');
      });
  });

  // Optimized Scroll Event
  let scrollTimeout;
  window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
          // Show/hide submenu based on scroll
          const aboutSectionTop = aboutSection.offsetTop;
          const aboutSectionHeight = aboutSection.offsetHeight;

          toggleSubmenu(window.pageYOffset >= aboutSectionTop && window.pageYOffset < aboutSectionTop + aboutSectionHeight);

          // Update active navigation link
          sections.forEach(section => {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.offsetHeight;

              if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                  navLinks.forEach(link => link.classList.remove('active'));
                  const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                  if (correspondingLink) {
                      correspondingLink.classList.add('active');
                  }
              }
          });
      }, 50);
  });
});
