require('dotenv').config();
const app = require('./src/app');
const db = require('./src/config/db')
const PORT = process.env.PORT || 5000;

async function Connection(){
    try{
        await db.connect()
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
console.log("database and server connected successfully")
    }catch(e){
console.log("database didn't connected", e)
    }
}
Connection()
