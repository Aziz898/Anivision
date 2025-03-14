const App = {
  init() {
    this.initWebApp();
    this.loadContent();
    this.setupEventListeners();
    this.hideSplash();
  },

  initWebApp() {
    this.WebApp = window.Telegram.WebApp;
    this.WebApp.ready();
    this.WebApp.setHeaderColor('#000000');
    this.WebApp.setBackgroundColor('#141414');
  },

  async loadContent() {
    try {
      const response = await fetch('https://api.example.com/content');
      const data = await response.json();
      this.renderContent(data);
    } catch (error) {
      console.error('Ошибка загрузки контента:', error);
    }
  },

  renderContent(sections) {
    const container = document.getElementById('main-content');
    container.innerHTML = sections.map(section => `
      <section class="section">
        <h2 class="section-title">${section.title}</h2>
        <div class="row-container">
          ${section.items.map(item => `
            <article class="poster-card" 
                     data-id="${item.id}"
                     role="button"
                     tabindex="0">
              <img class="row-poster" 
                   src="${item.poster}" 
                   alt="${item.title}"
                   loading="lazy">
              <div class="poster-overlay">
                <h3>${item.title}</h3>
                <p>${item.genre}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `).join('');
  },

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      const poster = e.target.closest('.poster-card');
      if (poster) this.showPlayer(poster.dataset.id);
    });

    document.querySelector('.close-player').addEventListener('click', () => {
      this.hidePlayer();
    });
  },

  showPlayer(contentId) {
    const player = document.getElementById('video-player');
    player.querySelector('.video-iframe').src = `https://example.com/player/${contentId}`;
    player.hidden = false;
    document.body.style.overflow = 'hidden';
  },

  hidePlayer() {
    const player = document.getElementById('video-player');
    player.hidden = true;
    player.querySelector('.video-iframe').src = '';
    document.body.style.overflow = '';
  },

  hideSplash() {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
      splash.style.animation = 'fadeOut 0.7s forwards';
      splash.addEventListener('animationend', () => {
        splash.remove();
      }, { once: true });
    }, 2000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
