// Примерный JS-код для переключения разделов и управления аниме
document.addEventListener('DOMContentLoaded', () => {
  // Переключение разделов (кнопки в sidebar)
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Убираем active со всех кнопок
      navBtns.forEach(b => b.classList.remove('active'));
      // Ставим active на выбранную
      btn.classList.add('active');

      // Прячем все секции
      sections.forEach(sec => sec.classList.remove('active'));

      // Показываем нужную секцию
      const sectionId = btn.getAttribute('data-section') + '-section';
      document.getElementById(sectionId).classList.add('active');
    });
  });

  // ====== Пример управления аниме ======
  const animeForm = document.getElementById('anime-form');
  const animeTableBody = document.getElementById('anime-table-body');

  // Хранилище (вместо бэкенда)
  let animeList = [];

  // Обработчик отправки формы
  animeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('anime-title').value.trim();
    const desc = document.getElementById('anime-desc').value.trim();
    const cover = document.getElementById('anime-cover').value.trim();
    const category = document.getElementById('anime-category').value;
    const rating = document.getElementById('anime-rating').value;
    const playerLink = document.getElementById('anime-player').value.trim();

    // Создаём объект аниме
    const newAnime = {
      id: Date.now(), // уникальный ID
      title,
      desc,
      cover,
      category,
      rating,
      playerLink
    };

    // Добавляем в массив и обновляем таблицу
    animeList.push(newAnime);
    renderAnimeTable();

    // Сбрасываем форму
    animeForm.reset();
  });

  // Функция для отрисовки таблицы аниме
  function renderAnimeTable() {
    animeTableBody.innerHTML = ''; // очищаем
    animeList.forEach(item => {
      const row = document.createElement('tr');

      const tdTitle = document.createElement('td');
      tdTitle.textContent = item.title;

      const tdCategory = document.createElement('td');
      tdCategory.textContent = item.category;

      const tdRating = document.createElement('td');
      tdRating.textContent = item.rating || '';

      const tdActions = document.createElement('td');
      // Кнопки "Редактировать" / "Удалить"
      const btnEdit = document.createElement('button');
      btnEdit.textContent = 'Редактировать';
      btnEdit.classList.add('btn-action');
      btnEdit.addEventListener('click', () => editAnime(item.id));

      const btnDelete = document.createElement('button');
      btnDelete.textContent = 'Удалить';
      btnDelete.classList.add('btn-action');
      btnDelete.addEventListener('click', () => deleteAnime(item.id));

      tdActions.appendChild(btnEdit);
      tdActions.appendChild(btnDelete);

      row.appendChild(tdTitle);
      row.appendChild(tdCategory);
      row.appendChild(tdRating);
      row.appendChild(tdActions);

      animeTableBody.appendChild(row);
    });
  }

  // Функция редактирования (упрощённо)
  function editAnime(id) {
    const anime = animeList.find(a => a.id === id);
    if (!anime) return;

    // Заполняем форму
    document.getElementById('anime-title').value = anime.title;
    document.getElementById('anime-desc').value = anime.desc;
    document.getElementById('anime-cover').value = anime.cover;
    document.getElementById('anime-category').value = anime.category;
    document.getElementById('anime-rating').value = anime.rating;
    document.getElementById('anime-player').value = anime.playerLink;

    // В реальном проекте нужно как-то пометить, что мы в режиме "Редактирование"
    // и при сабмите обновлять, а не создавать новый объект
    alert('В демо-версии редактирование не до конца реализовано. :)');
  }

  // Функция удаления
  function deleteAnime(id) {
    if (!confirm('Вы уверены, что хотите удалить аниме?')) return;
    animeList = animeList.filter(a => a.id !== id);
    renderAnimeTable();
  }
});
