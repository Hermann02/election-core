require('dotenv').config()

module.exports = (req , res , next) => {
    const apikey = req.header('apikey')
    console.log(apikey)
    if(apikey === undefined) {
        res.json({
            success: false,
            message: 'Access denied!!'
        })
    }

    if(apikey === process.env.API_KEY) {
        next()
    } else {
        res.json({
            success: false,
            message: 'Access denied!!'
        })
    }
}
