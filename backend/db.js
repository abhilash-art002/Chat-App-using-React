import mysql from 'mysql2';

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // 👈 use your MySQL username
  password: 'Tutun@002',         // 👈 use your MySQL password
  database: 'chat_app'  // 👈 we'll create this DB next
});

conn.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('✅ MySQL connected');
});

export default conn;
