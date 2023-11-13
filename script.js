// script.js

// Функция для отправки запроса на сервер Chess.com
function getChessStats() {
    const chessComNickname = document.getElementById('chessComNickname').value;

    // Отправка запроса на информацию о профиле игрока
    fetch(`https://api.chess.com/pub/player/${chessComNickname}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Обработка полученных данных
            displayPlayerInfo(data);
            
            // Отправка запроса на статистику игры
            return fetch(`https://api.chess.com/pub/player/${chessComNickname}/stats`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(statsData => {
            // Обработка полученных данных статистики игры
            displayPlayerStats(statsData);
        })
        .catch(error => {
            console.error('Ошибка при отправке запросов к API Chess.com:', error);
        });
}

// Функция для отображения информации о профиле игрока
function displayPlayerInfo(profileData) {
    const playerInfoDiv = document.getElementById('playerInfo');
    playerInfoDiv.innerHTML = `<img src="${profileData.avatar}" alt="Аватар">
                              <p>Никнейм: ${profileData.username}</p>
                              <p>Страна: ${profileData.country}</p>
                              <p>Подписчики: ${profileData.followers}</p>
                              <p>Ссылка на профиль: <a href="${profileData.url}" target="_blank">${profileData.url}</a></p>`;
}

// Функция для отображения статистики игры
function displayPlayerStats(statsData) {
    const playerStatsDiv = document.getElementById('playerStats');
    playerStatsDiv.innerHTML = `<h2>Статистика игры</h2>
                                <p>Rapid: ${statsData.chess_rapid.last.rating}</p>
                                <p>Bullet: ${statsData.chess_bullet.last.rating}</p>
                                <p>Blitz: ${statsData.chess_blitz.last.rating}</p>`;
    // Добавьте остальные данные статистики по необходимости
}

document.getElementById('chessForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (отправку данных на сервер)
    getChessStats(); // Вызываем функцию для отправки запроса
});