document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('drink-form');
    const consumedElement = document.getElementById('consumed');
    const goalElement = document.getElementById('goal');
    const dailyGoalinput = document.getElementById('dailyGoal');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageSelect = document.getElementById('language-select');
    const addwaterbutton = document.getElementById('addwaterbutton')
    const pastdaysElement = document.getElementById('mon');

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

    addwaterbutton.addEventListener("click", (event) => {
        console.log(pastdays)
        mon = mon +0.1
        updateDisplay()
    });

    const updateDisplay = () => {
        goalElement.textContent = dailyGoal;
        consumedElement.textContent = consumed;
        pastdaysElement.textContent = mon;
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

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    languageSelect.addEventListener('select', () => {
        document.body.classList.languageSelect('language-select');
    });

    
    })
    