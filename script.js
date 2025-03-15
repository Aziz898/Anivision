// Firebase configuration and initialization
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage();

// DOM elements for sections
var carouselContainer = document.getElementById('carousel');
var trendingList = document.getElementById('trending-list');
var continueList = document.getElementById('continue-list');
var recommendList = document.getElementById('recommend-list');
// Admin form elements
var addAnimeForm = document.getElementById('addAnimeForm');
var addCarouselForm = document.getElementById('addCarouselForm');

// Load Carousel items from Firebase and set up auto-slide
var slideInterval;
function loadCarousel() {
  db.collection('carousel').onSnapshot(function(snapshot) {
    // Clear existing slides
    carouselContainer.innerHTML = '';
    var slides = [];
    snapshot.forEach(function(doc) {
      var data = doc.data();
      // Create slide element
      var slide = document.createElement('div');
      slide.classList.add('slide');
      // Set slide background image
      if (data.image) {
        slide.style.backgroundImage = 'url("' + data.image + '")';
      }
      // Create slide content overlay (title and watch button)
      var content = document.createElement('div');
      content.classList.add('slide-content');
      var title = document.createElement('h2');
      title.textContent = data.title || '';
      content.appendChild(title);
      var watchBtn = document.createElement('a');
      watchBtn.href = '#';
      watchBtn.textContent = 'Смотреть';
      watchBtn.classList.add('watch-btn');
      content.appendChild(watchBtn);
      slide.appendChild(content);
      carouselContainer.appendChild(slide);
      slides.push(slide);
    });
    // Activate the first slide
    if (slides.length > 0) {
      slides[0].classList.add('active');
    }
    // Reset and restart carousel interval
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    var currentIndex = 0;
    slideInterval = setInterval(function() {
      if (slides.length > 0) {
        // Cycle to the next slide
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
      }
    }, 5000);
  });
}

// Load Trending section from Firebase
function loadTrending() {
  db.collection('trending').onSnapshot(function(snapshot) {
    trendingList.innerHTML = '';
    snapshot.forEach(function(doc) {
      var data = doc.data();
      // Create card
      var card = document.createElement('div');
      card.classList.add('card');
      // Cover image
      var img = document.createElement('img');
      img.src = data.image || '';
      img.alt = data.title || 'Anime Cover';
      card.appendChild(img);
      // Title text
      var title = document.createElement('div');
      title.classList.add('card-title');
      title.textContent = data.title || '';
      card.appendChild(title);
      trendingList.appendChild(card);
    });
  });
}

// Load Continue Watching section from Firebase
function loadContinue() {
  db.collection('continue').onSnapshot(function(snapshot) {
    continueList.innerHTML = '';
    snapshot.forEach(function(doc) {
      var data = doc.data();
      var card = document.createElement('div');
      card.classList.add('card', 'progress-card');
      // Cover image
      var img = document.createElement('img');
      img.src = data.image || '';
      img.alt = data.title || 'Anime Cover';
      card.appendChild(img);
      // Title text
      var title = document.createElement('div');
      title.classList.add('card-title');
      title.textContent = data.title || '';
      card.appendChild(title);
      // Progress bar if progress data exists
      if (data.progress !== undefined) {
        var progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        var progressSpan = document.createElement('span');
        progressSpan.style.width = data.progress + '%';
        progressBar.appendChild(progressSpan);
        card.appendChild(progressBar);
      }
      continueList.appendChild(card);
    });
  });
}

// Load Recommendations section from Firebase
function loadRecommendations() {
  db.collection('recommendations').onSnapshot(function(snapshot) {
    recommendList.innerHTML = '';
    snapshot.forEach(function(doc) {
      var data = doc.data();
      var card = document.createElement('div');
      card.classList.add('card');
      // Cover image
      var img = document.createElement('img');
      img.src = data.image || '';
      img.alt = data.title || 'Anime Cover';
      card.appendChild(img);
      // Title text
      var title = document.createElement('div');
      title.classList.add('card-title');
      title.textContent = data.title || '';
      card.appendChild(title);
      recommendList.appendChild(card);
    });
  });
}

// Initialize all content sections on page load
window.addEventListener('DOMContentLoaded', function() {
  loadCarousel();
  loadTrending();
  loadContinue();
  loadRecommendations();
  // If admin user is logged in, display the admin panel:
  // document.getElementById('admin-panel').style.display = 'block';
});

// Admin Panel: Add new anime to Trending/Recommendations
if (addAnimeForm) {
  addAnimeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var title = document.getElementById('animeTitle').value.trim();
    var section = document.getElementById('animeSection').value;
    var fileInput = document.getElementById('animeCover');
    var file = fileInput.files[0];
    if (!title || !file) {
      alert('Пожалуйста, заполните название и выберите файл обложки.');
      return;
    }
    // Upload cover image to Firebase Storage
    var storageRef = storage.ref('covers/' + Date.now() + '_' + file.name);
    storageRef.put(file).then(function(snapshot) {
      return snapshot.ref.getDownloadURL();
    }).then(function(downloadURL) {
      // Add new anime document to Firestore
      return db.collection(section).add({
        title: title,
        image: downloadURL
      });
    }).then(function() {
      alert('Аниме добавлено в ' + (section === 'trending' ? 'Популярное' : 'Рекомендации'));
      addAnimeForm.reset();
    }).catch(function(error) {
      console.error('Error adding document: ', error);
      alert('Ошибка при добавлении: ' + error.message);
    });
  });
}

// Admin Panel: Add new carousel banner
if (addCarouselForm) {
  addCarouselForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var title = document.getElementById('bannerTitle').value.trim();
    var fileInput = document.getElementById('bannerImage');
    var file = fileInput.files[0];
    if (!title || !file) {
      alert('Пожалуйста, введите заголовок и выберите файл баннера.');
      return;
    }
    // Upload banner image to Firebase Storage
    var storageRef = storage.ref('banners/' + Date.now() + '_' + file.name);
    storageRef.put(file).then(function(snapshot) {
      return snapshot.ref.getDownloadURL();
    }).then(function(downloadURL) {
      // Add new banner document to Firestore
      return db.collection('carousel').add({
        title: title,
        image: downloadURL
      });
    }).then(function() {
      alert('Баннер добавлен в карусель');
      addCarouselForm.reset();
    }).catch(function(error) {
      console.error('Error adding banner: ', error);
      alert('Ошибка при добавлении баннера: ' + error.message);
    });
  });
}
