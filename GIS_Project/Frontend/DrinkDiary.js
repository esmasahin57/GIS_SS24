document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageSelect = document.getElementById('language-select');
    const addWaterButton = document.getElementById('addwaterbutton');
    const resetButton = document.getElementById('resetbutton');
    const dailyGoalInput = document.getElementById('dailyGoal');
    const goalSpan = document.getElementById('goal');
    const consumedSpan = document.getElementById('consumed');
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');
    const closeBtn = document.querySelector('.close-btn');

    let dailyGoal = 0;
    let consumed = 0;

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Language Translation
    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        translatePage(selectedLanguage);
    });

    // Add Water Button
    addWaterButton.addEventListener('click', () => {
        consumed += 0.1;
        consumedSpan.textContent = consumed.toFixed(1);
        checkGoalAchieved();
        updateChart();
        updateTable();
        saveDataToDatabase(); // Hier füge ich die Funktion hinzu, um die Daten in der Datenbank zu speichern
    });

    // Reset Button
    resetButton.addEventListener('click', () => {
        consumed = 0;
        consumedSpan.textContent = consumed.toFixed(1);
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        days.forEach(day => {
            document.getElementById(day).textContent = '0';
        });
        successModal.style.display = 'none';
        saveDataToDatabase(); // Hier füge ich die Funktion hinzu, um die Daten in der Datenbank zu speichern
    });

    // Daily Goal Input
    dailyGoalInput.addEventListener('input', (event) => {
        dailyGoal = parseFloat(event.target.value);
        goalSpan.textContent = dailyGoal.toFixed(1);
        checkGoalAchieved();
        saveDataToDatabase(); // Hier füge ich die Funktion hinzu, um die Daten in der Datenbank zu speichern
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // Close Modal if Click Outside
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Initialize Chart.js
    const ctx = document.getElementById('consumption-chart').getContext('2d');
    const consumptionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Water Consumption (l)',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateChart() {
        const currentDayIndex = new Date().getDay() - 1;
        consumptionChart.data.datasets[0].data[currentDayIndex] = consumed;
        consumptionChart.update();
    }

    function updateTable() {
        const currentDayIndex = new Date().getDay();
        switch (currentDayIndex) {
            case 0: // Sunday
                document.getElementById('sun').textContent = consumed.toFixed(1);
                break;
            case 1: // Monday
                document.getElementById('mon').textContent = consumed.toFixed(1);
                break;
            case 2: // Tuesday
                document.getElementById('tue').textContent = consumed.toFixed(1);
                break;
            case 3: // Wednesday
                document.getElementById('wed').textContent = consumed.toFixed(1);
                break;
            case 4: // Thursday
                document.getElementById('thu').textContent = consumed.toFixed(1);
                break;
            case 5: // Friday
                document.getElementById('fri').textContent = consumed.toFixed(1);
                break;
            case 6: // Saturday
                document.getElementById('sat').textContent = consumed.toFixed(1);
                break;
        }
    }

    function checkGoalAchieved() {
        if (consumed >= dailyGoal && dailyGoal > 0) {
            successMessage.textContent = translations[languageSelect.value].successMessage;
            successModal.style.display = 'block';
        } else {
            successModal.style.display = 'none';
        }
    }

    async function saveDataToDatabase() {
        const data = {
            date: new Date().toISOString().split('T')[0],
            dailyGoal: dailyGoal,
            consumed: consumed
        };
    
        try {
            const response = await fetch('http://localhost:5000/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    const translations = {
        en: {
            title: 'DrinkDiary.com',
            subtitle: 'Stay hydrated!',
            darkModeButton: 'Dark Mode',
            dailyGoalLabel: "What's your daily goal? (in l)",
            addWaterButton: 'Add Water',
            reset: 'reset',
            dailyGoal: 'Daily Goal',
            consumed: 'Consumed',
            welcome: 'Welcome to DrinkDiary!',
            instruction: 'Please enter your information below to start',
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
            sun: 'Sunday',
            successMessage: 'You did it!'
        },
        de: {
            title: 'DrinkDiary.de',
            subtitle: 'Bleib hydratisiert!',
            darkModeButton: 'Dunkelmodus',
            dailyGoalLabel: "Was ist dein tägliches Ziel? (in l)",
            addWaterButton: 'Wasser hinzufügen',
            reset: 'zurücksetzen',
            dailyGoal: 'Tagesziel',
            consumed: 'Verbraucht',
            welcome: 'Willkommen bei DrinkDiary!',
            instruction: 'Bitte geben Sie Ihre Informationen unten ein, um zu beginnen',
            mon: 'Montag',
            tue: 'Dienstag',
            wed: 'Mittwoch',
            thu: 'Donnerstag',
            fri: 'Freitag',
            sat: 'Samstag',
            sun: 'Sonntag',
            successMessage: 'Du hast es geschafft!'
        },
        es: {
            title: 'DrinkDiary.com',
            subtitle: '¡Mantente hidratado!',
            darkModeButton: 'Modo Oscuro',
            dailyGoalLabel: '¿Cuál es tu objetivo diario? (en l)',
            addWaterButton: 'Añadir Agua',
            reset: 'reiniciar',
            dailyGoal: 'Meta Diaria',
            consumed: 'Consumido',
            welcome: '¡Bienvenido a DrinkDiary!',
            instruction: 'Por favor ingrese su información a continuación para comenzar',
            mon: 'Lunes',
            tue: 'Martes',
            wed: 'Miércoles',
            thu: 'Jueves',
            fri: 'Viernes',
            sat: 'Sábado',
            sun: 'Domingo',
            successMessage: '¡Lo lograste!'
        },
        fr: {
            title: 'DrinkDiary.com',
            subtitle: 'Restez hydraté!',
            darkModeButton: 'Mode Sombre',
            dailyGoalLabel: 'Quel est votre objectif quotidien? (en l)',
            addWaterButton: "Ajouter de l'eau",
            reset: 'réinitialiser',
            dailyGoal: 'Objectif Quotidien',
            consumed: 'Consommé',
            welcome: 'Bienvenue sur DrinkDiary!',
            instruction: "Veuillez entrer vos informations ci-dessous pour commencer",
            mon: 'Lundi',
            tue: 'Mardi',
            wed: 'Mercredi',
            thu: 'Jeudi',
            fri: 'Vendredi',
            sat: 'Samedi',
            sun: 'Dimanche',
            successMessage: 'Vous l\'avez fait!'
        }
    };

    function translatePage(language) {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
        });

        goalSpan.textContent = dailyGoal.toFixed(1);
        consumedSpan.textContent = consumed.toFixed(1);
        checkGoalAchieved();
    }

    // Load data from the server on page load
    async function loadData() {
        try {
            const response = await fetch("http://localhost:5000/entries");
            const data = await response.json();
    
            if (data && data.length > 0) {
                const latestEntry = data[data.length - 1];
                dailyGoal = latestEntry.dailyGoal;
                consumed = latestEntry.consumed;
                dailyGoalInput.value = dailyGoal;
                goalSpan.textContent = dailyGoal.toFixed(1);
                consumedSpan.textContent = consumed.toFixed(1);
    
                updateChart();
                updateTable();
            }
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }

    // Initial load of translations and data based on language select
    translatePage(languageSelect.value);
    loadData();
});

//ChatGPT verwendet