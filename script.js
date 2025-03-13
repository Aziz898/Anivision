/* СБРОС СТИЛЕЙ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ШРИФТ И ТЕМНАЯ ТЕМА ПО УМОЛЧАНИЮ */
body {
  font-family: 'Montserrat', sans-serif;
  background-color: #1c1c1e;
  color: #fff;
  display: flex;
  position: relative;
  min-height: 100vh;
}

/* ФОН (GIF) */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://media.giphy.com/media/5xtDarzqClIMoNYxKRi/giphy.gif") no-repeat center center/cover;
  z-index: -1;
  opacity: 0.2;
}

/* ССЫЛКИ */
a {
  text-decoration: none;
  color: inherit;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  background-color: rgba(34, 34, 36, 0.95);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.sidebar-header {
  margin-bottom: 2rem;
}
.logo {
  color: #fff;
  font-size: 1.5rem;
}
.logo span {
  color: #a749f8;
}
.profile-section {
  text-align: center;
  margin-bottom: 2rem;
}
.avatar {
  border-radius: 50%;
  margin-bottom: 0.5rem;
  width: 80px;
  height: 80px;
}
.username {
  font-size: 1.1rem;
}
.menu ul {
  list-style: none;
}
.menu li {
  margin: 0.7rem 0;
}
.menu li a {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  transition: background 0.3s;
}
.menu li a:hover {
  background-color: #2f2f33;
}
.menu li .icon {
  margin-right: 0.5rem;
}
.quick-filter {
  margin-top: auto;
}
.quick-filter h4 {
  margin-bottom: 0.5rem;
  color: #a749f8;
}
.quick-filter ul {
  list-style: none;
}
.quick-filter li {
  margin: 0.4rem 0;
}
.quick-filter a {
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: background 0.3s;
}
.quick-filter a:hover {
  background-color: #2f2f33;
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.topbar {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: rgba(31, 31, 33, 0.95);
  justify-content: space-between;
}
.search-box input {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  width: 200px;
  outline: none;
  background-color: #2c2c2e;
  color: #fff;
}
.top-menu ul {
  list-style: none;
  display: flex;
}
.top-menu li {
  margin: 0 1rem;
}
.top-menu a {
  color: #fff;
  font-size: 0.95rem;
  transition: color 0.3s;
}
.top-menu a:hover {
  color: #a749f8;
}
.controls {
  display: flex;
  align-items: center;
}

/* Кнопки */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
}
.btn:hover {
  transform: scale(1.05);
}
.btn-signin {
  background-color: #a749f8;
  color: #fff;
  margin-left: 1rem;
}
.btn-signin:hover {
  background-color: #933ae0;
}
.btn-watch {
  background-color: #a749f8;
  color: #fff;
}
.btn-learn {
  background-color: #444;
  color: #fff;
}
.btn-watch:hover {
  background-color: #933ae0;
}
.btn-learn:hover {
  background-color: #666;
}

/* Слайдер-переключатель (switch) */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  top: 0; left: 0; right: 0; bottom: 0;
  transition: .4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #a749f8;
}
input:checked + .slider:before {
  transform: translateX(24px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}

/* HERO BANNER */
.hero-banner {
  position: relative;
  background-color: #2c2c2e;
  min-height: 300px;
  display: flex;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
}
.banner-bg {
  position: absolute;
  inset: 0;
  background: url("https://images.unsplash.com/photo-1637731629106-151d73c513a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1300&q=80") 
    no-repeat center center/cover;
  filter: brightness(0.6);
  z-index: 0;
}
.banner-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}
.banner-content h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.banner-content p {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #ccc;
}
.banner-buttons .btn {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

/* СЕКЦИИ (Продолжить просмотр, Последние релизы) */
.section-block {
  padding: 2rem;
  background-color: rgba(28, 28, 30, 0.9);
}
.section-block h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
.card-row {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}
.card {
  min-width: 200px;
  background-color: #2c2c2e;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.03);
}
.card-image img {
  display: block;
  width: 100%;
  height: auto;
}
.card-info {
  padding: 0.5rem;
}
.card-info h3 {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
.card-info p {
  font-size: 0.85rem;
  color: #ccc;
}

/* ПОДВАЛ */
.main-footer {
  background-color: rgba(31, 31, 33, 0.95);
  text-align: center;
  padding: 1rem;
}
.main-footer p {
  font-size: 0.9rem;
  color: #aaa;
}

/* ФОРМЫ (логин, регистрация) */
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  outline: none;
}

/* ПЛЕЕР */
.player-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.video-wrapper {
  max-width: 600px;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 1rem;
}
.video-wrapper iframe, 
.video-wrapper video {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

/* АДАПТИВНОСТЬ */
@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
  .main-content {
    margin-left: 0;
  }
  .topbar {
    flex-wrap: wrap;
    gap: 1rem;
  }
  .search-box input {
    width: 100%;
    max-width: 300px;
  }
  .banner-content h1 {
    font-size: 1.5rem;
  }
}

/* СВЕТЛАЯ ТЕМА (добавляется класс .light-theme к body) */
body.light-theme {
  background-color: #f0f0f0;
  color: #222;
}
body.light-theme::before {
  background: none; /* убираем гифку, например */
}
body.light-theme .sidebar {
  background-color: #e6e6e6;
}
body.light-theme .topbar {
  background-color: #dcdcdc;
  color: #222;
}
body.light-theme .section-block {
  background-color: #f9f9f9;
  color: #222;
}
body.light-theme .card {
  background-color: #ffffff;
  color: #222;
}
body.light-theme .main-footer {
  background-color: #dcdcdc;
  color: #444;
}
