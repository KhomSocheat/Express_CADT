import { validationResult } from "express-validator";
export function teacherMiddleware(req, res, next) {
    if(req.query.minYear){
        const minYear = parseInt(req.query.minYear);
        if(isNaN(minYear) || minYear < 0){
            return res.status(400).json({message: "minYear must be a positive number"})
        }
    }
    next();
}


export function stockMiddleware(req, res, next) {
    const errors = [];
    if(req.query.minQuantity){
        const minQuantity = parseInt(req.query.minQuantity);
        if(isNaN(minQuantity) || minQuantity < 0){
           errors.push({error : ''});
        }
    }
    if(req.query.maxQuantity){
        const maxQuantity = parseInt(req.query.maxQuantity);
        if(isNaN(maxQuantity) || maxQuantity < 0){
            return res.status(400).json({message: "maxQuantity must be a positive number"})
        }
    }
    if(errors.length > 0){
        return res.status(400).json({errors});
    }
    next();
}

export function handleValidation(req,res,next){
    const result = validationResult(req);
    if(result.isEmpty){
        next();
    }

    res.status(400).send({errors: result.array()});
}