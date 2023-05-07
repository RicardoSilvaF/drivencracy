export default function validateSchema(schema){
    return(req,res,next) => {
        const validation = schema.validate(req.body, {abortEarly: false});

        if(validation.error){
            const errors = validation.error.detail.map((x) => x.message);
            return res.status(422);
        }
        next();
    }
}