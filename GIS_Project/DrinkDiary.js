document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('drink-form');
    const consumedElement = document.getElementById('consumed');
    const goalElement = document.getElementById('goal');
    const dailyGoalinput = document.getElementById('dailyGoal');
    const ctx = document.getElementById('consumption-chart').getContext('2d');
    const calendarBody = document.querySelector('#calendar tbody');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageSelect = document.getElementById('language-select');
    const addwaterbutton = document.getElementById('addwaterbutton')
   

    let dailyGoal = 0;
    let consumed = 0;
    let consumptionData = [];

    dailyGoalinput.addEventListener("change", (event) => {
        console.log(dailyGoalinput.value)
        dailyGoal = dailyGoalinput.value
        updateDisplay()
    });

    addwaterbutton.addEventListener("click", (event) => {
        console.log(consumed)
        consumed = consumed +0.1
        updateDisplay()
    });

    const updateDisplay = () => {
        goalElement.textContent = dailyGoal;
        consumedElement.textContent = consumed;
    };

    const translations = {
        en: {
            title: 'DrinkDiary.com',
            subtitle: 'Stay hydrated!',
            darkModeButton: 'Dark Mode',
            welcome: 'Welcome to DrinkDiary',
            instruction: 'Please enter your information below to start',
            dailyGoalLabel: 'What is your Daily Goal? (in l)',
            addWaterButton: 'Add Water',
            dailyGoal: 'Daily Goal: <span id="goal">0</span> Liters',
            consumed: 'Consumed: <span id="consumed">0</span> Liters',
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
            sun: 'Sunday',
        },

        de: {
            title: 'DrinkDiary.com',
            subtitle: 'Bleiben Sie hydriert!',
            darkModeButton: 'Dark Mode',
            welcome: 'Willkommen bei DrinkDiary',
            instruction: 'Bitte geben Sie unten Ihre Informationen ein, um zu starten',
            dailyGoalLabel: 'Was ist Ihr Tagesziel? (in l)',
            addWaterButton: 'Wasser hinzufügen',
            dailyGoal: 'Tagesziel: <span id="goal">0</span> Liter',
            consumed: 'Verbraucht: <span id="consumed">0</span> Liter',
            mon: 'Montag',
            tue: 'Dienstag',
            wed: 'Mittwoch',
            thu: 'Donnerstag',
            fri: 'Freitag',
            sat: 'Samstag',
            sun: 'Sonntag'
        },

        fr: {
            title: 'DrinkDiary.com',
            subtitle: 'Restez hydraté!',
            darkModeButton: 'Mode Sombre',
            welcome: 'Bienvenue sur DrinkDiary',
            instruction: 'Veuillez entrer vos informations ci-dessous pour commencer',
            dailyGoalLabel: 'Quel est votre objectif quotidien? (en l)',
            addWaterButton: 'Ajouter de l\'eau',
            dailyGoal: 'Objectif quotidien: <span id="goal">0</span> Litres',
            consumed: 'Consommé: <span id="consumed">0</span> Litres',
            mon: 'Lundi',
            tue: 'Mardi',
            wed: 'Mercredi',
            thu: 'Jeudi',
            fri: 'Vendredi',
            sat: 'Samedi',
            sun: 'Dimanche'
        },

        es: {
            title: 'DrinkDiary.com',
            subtitle: '¡Mantente hidratado!',
            darkModeButton: 'Modo Oscuro',
            welcome: 'Bienvenido a DrinkDiary',
            instruction: 'Por favor, ingrese su información a continuación para comenzar',
            dailyGoalLabel: '¿Cuál es su meta diaria? (en l)',
            addWaterButton: 'Agregar Agua',
            dailyGoal: 'Meta diaria: <span id="goal">0</span> Litros',
            consumed: 'Consumido: <span id="consumed">0</span> Litros',
            mon: 'Lunes',
            tue: 'Martes',
            wed: 'Miércoles',
            thu: 'Jueves',
            fri: 'Viernes',
            sat: 'Sábado',
            sun: 'Domingo'
        }
        
    };

    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        applyTranslations(selectedLanguage);
    });

    const applyTranslations = (language) => {
        const elements = document.querySelectorAll('[data-translate-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[language] && translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });
    };


    const updateData = () => {
        const today = new Date();
        const last7Days = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const consumption = consumptionData.find(entry => entry.date === dateString)?.amount || 0;
            last7Days.push({ date: dateString, amount: consumption });
        }

        consumptionChart.data.labels = last7Days.map(entry => entry.date);
        consumptionChart.data.datasets[0].data = last7Days.map(entry => entry.amount);
        consumptionChart.update();

        renderCalendar(last7Days);
    };

   /* const consumptionChart = new Chart(ctx, { 
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Water Consumption (l)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: 2
                }
            }
        }
    }); */

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    languageSelect.addEventListener('select', () => {
        document.body.classList.languageSelect('language-select');
    });

    const renderCalendar = (data) => {
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
        calendarBody.innerHTML = '';
        let date = startDate;

        while (date <= endDate) {
            const weekRow = document.createElement('tr');
            for (let i = 0; i < 7; i++) {
                const dayCell = document.createElement('td');
                if (date.getMonth() === today.getMonth() && date.getDay() === i) {
                    dayCell.textContent = date.getDate();
                    const dateString = date.toISOString().split('T')[0];
                    const consumption = data.find(entry => entry.date === dateString)?.amount || 0;
                    if (consumption > 0) {
                        const consumptionBadge = document.createElement('div');
                        consumptionBadge.classList.add('water-consumption');
                        consumptionBadge.textContent = `${consumption} l`;
                        dayCell.appendChild
                    }
                }
            }
        }
    }
}
)