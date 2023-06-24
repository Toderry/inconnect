const express = require('express')
const PORT = process.env.PORT || 8080
const userRouter = require('./routes/user.routes')
const cors = require('cors') // Для извлечение данных пользователя 24.06.2023
const app = express()

// app.get('/', (req, res) => {
//     res.send("Hello there!")
// })
app.use(cors()) // Для извлечение данных пользователя 24.06.2023
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
// export default postgreApp