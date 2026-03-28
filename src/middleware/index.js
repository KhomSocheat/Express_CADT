export function teacherMiddleware(req, res, next) {
    if(req.query.minYear){
        const minYear = parseInt(req.query.minYear);
        if(isNaN(minYear) || minYear < 0){
            return res.status(400).json({message: "minYear must be a positive number"})
        }
    }
    next();
}