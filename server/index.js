const express = require('express')
const PORT = process.env.PORT || 8080
const userRouter = require('./routes/user.routes')
const tagRouter = require('./routes/tag.routes')
//const eventRouter = require('./routes/event.routes')
const cors = require('cors') // Для извлечение данных пользователя 24.06.2023
const app = express()

// app.get('/', (req, res) => {
//     res.send("Hello there!")
// })
app.use(cors()) // Для извлечение данных пользователя 24.06.2023
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', tagRouter)
//app.use('/api', eventRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
// export default postgreApp