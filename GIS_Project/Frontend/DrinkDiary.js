document.addEventListener('DOMContentLoaded', () => {
    
    const consumedElement = document.getElementById('consumed');
    const goalElement = document.getElementById('goal');
    const dailyGoalinput = document.getElementById('dailyGoal');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageSelect = document.getElementById('language-select');
    const addwaterbutton = document.getElementById('addwaterbutton');
    const resetbutton = document.getElementById('resetbutton');
    const pastdaysElement = document.getElementById('day');

    resetbutton.addEventListener('click', () => {
        setValue(0);
    })

    let dailyGoal = 0;
    let consumed = 0;
    let value = Number(localStorage.getItem('value'))
    pastdaysElement.textContent = value;
    resetbutton.addEventListener('click', () => {
        setValue(0);
      });
    addwaterbutton.addEventListener('click', () => {
        setValue(value + 0.1);
    });

    function setValue(x) {
        value = x;
        day.textContent = value;
        localStorage.setItem('value', value);
      }

    switch (new Date().getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
           day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }

    

    dailyGoalinput.addEventListener('change', () => {
        console.log(dailyGoalinput.value)
        dailyGoal = dailyGoalinput.value
        updateDisplay()
    });

    addwaterbutton.addEventListener('click', () => {
        console.log(consumed)
        consumed = consumed +0.1
        updateDisplay()
    });

    addwaterbutton.addEventListener("click", () => {
        console.log(pastdaysElement.textContent)
        pastdaysElement.textContent = Number(pastdaysElement.textContent) +0.1
        updateDisplay()
    });

    const updateDisplay = () => {
        goalElement.textContent = dailyGoal;
        consumedElement.textContent = consumed;
        /*pastdaysElement.textContent = mon;*/
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
        const languageSelect = event.target.value;
        applyTranslations(languageSelect);
    });

    /*function applyTranslations() {
                document.getElementById('title').textContent = translation.title;
                document.getElementById('subtitle').textContent = translation.subtitle;
                document.getElementById('darkModeButton').textContent = translation.darkModeButton;
                document.getElementById('welcome').textContent = translation.welcome;
                document.getElementById('instruction').textContent = translation.instruction;
                document.getElementById('dailyGoalLabel').textContent = translation.dailyGoalLabel;
                document.getElementById('addWaterButton').textContent = translation.addWaterButton;
                document.getElementById('reset').textContent = translation.reset;
                document.getElementById('dailyGoal').innerHTML = translation.dailyGoal;
                document.getElementById('consumed').innerHTML = translation.consumed;
                pastdaysElement.textContent = translation[new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase()];
            };*/

    function applyTranslations(languageSelect) {
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate-key');
            element.textContent = (document.getElementById('translation'))[language][key];
        });


    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    languageSelect.addEventListener('select', () => {
        document.body.classList.languageSelect('language-select');
    });

}})
