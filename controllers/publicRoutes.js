const get = (req, res) => {
    res.status(200).json({message: "This is a GET rest api"})
}

const post = (req, res) => {
    // const data = req.body;
    const name = req.body.name;
    const birthYear = req.body.birthYear;
    const location = req.body.location;
    const age = 2023 - birthYear
    const data = {
        name: name,
        birthYear: birthYear,
        location: location,
        age: age
    }
    res.status(200).json({message: "This is a POST rest api", data:data})
}

const publicController = {get, post}

export default publicController