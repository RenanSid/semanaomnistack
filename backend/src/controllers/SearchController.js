const Dev = require('../Models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request,response){
    //buscar 10 km e filtro techs
    const {latitude,longitude,techs} =  request.query;
    const techsArray = parseStringAsArray(techs);
    const Devs  = await Dev.find({
        techs:{
            $in: techsArray,
        },
        location:{
            $near:{
                $geometry:{
                    type: 'Point',
                    location:[longitude,latitude],
                },
                $maxDistance:10000,
            },
        },
    });
    return response.json({Devs:[]})
    }
}