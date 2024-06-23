const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Pfad zur Datenbankdatei
const dbPath = path.resolve(__dirname, '../DrinkDiary.db');

// Datenbankverbindung erstellen und Tabelle initialisieren
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank:', err.message);
    } else {
        console.log('Verbindung zur SQLite-Datenbank erfolgreich');
        db.run(`CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            dailyGoal REAL,
            consumed REAL
        )`);
    }
});

// Eintrag erstellen
function createEntry(entry, callback) {
    const { weekday, dailyGoal, consumed } = entry;
    const sql = 'INSERT INTO entries (weekday, dailyGoal, consumed) VALUES (?, ?, ?)';
    db.run(sql, [weekday, dailyGoal, consumed], function (err) {
        callback(err, this.lastID);
    });
}

// Alle Einträge abrufen
function getAllEntries(callback) {
    const sql = 'SELECT * FROM entries';
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}

// Eintrag aktualisieren
function updateEntry(id, entry, callback) {
    const { weekday, dailyGoal, consumed } = entry;
    const sql = 'UPDATE entries SET weekday = ?, dailyGoal = ?, consumed = ? WHERE id = ?';
    db.run(sql, [weekday, dailyGoal, consumed, id], function (err) {
        callback(err, this.changes);
    });
}

// Eintrag löschen
function deleteEntry(id, callback) {
    const sql = 'DELETE FROM entries WHERE id = ?';
    db.run(sql, [id], function (err) {
        callback(err, this.changes);
    });
}

module.exports = {
    createEntry,
    getAllEntries,
    updateEntry,
    deleteEntry
};
