import express from "express"
const app = express()
import cors from 'cors'
import {data} from './data.js'
const PORT = 5000

app.use(cors())

app.get('/data', (req, res) => {
    const {searchQuery,sortQuery, sortColunm} = req.query
    function Search(data)
    {
        const keys = ["firstName", "lastName", "email", "phone"]
        return data.filter(item => 
            keys.some(key => item[key].toLowerCase().includes(searchQuery)) ||
            (item.jobTitle === undefined ? "unmanaged".includes(searchQuery) : item.jobTitle.toLowerCase().includes(searchQuery))
        )
    }

    function Sort(data)
    {
        const sortMethods = {
            none: { method: (a, b) => null },
            ascending: { method: (a, b) => ((a[sortColunm] === undefined && sortColunm === "jobTitle" ? 'unmanaged' : a[sortColunm]) > (b[sortColunm] === undefined && sortColunm === "jobTitle" ? 'unmanaged' : b[sortColunm]) ? 1 : -1) },
            descending: { method: (a, b) => ((a[sortColunm] === undefined && sortColunm === "jobTitle" ? 'unmanaged' : a[sortColunm])> (b[sortColunm] === undefined && sortColunm === "jobTitle" ? 'unmanaged' : b[sortColunm]) ? -1 : 1) },
        };
        return data.sort(sortMethods[sortQuery].method)
    }

    res.json(Sort((Search(data))))
})

app.listen(PORT, ()=> console.log(`Server listening on Port ${PORT}`))