const axios = require('axios');
const Dev = require('../Models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections,sendMessage } = require('../websocket');
module.exports = {
    async index(request,response){
        const Devs  = await Dev.find();

        return response.json(Devs);
    },

    async store(request, response)  {
        let Dev  = await Dev.findOne({github_usename});
        if(!Dev){
        const{github_usename, techs, latitude,longitude} = request.body;
        const apiResponse  = await axios.get(`https://api.github.com/users/${github_usename}`);
        const {name = login, avatar_url, bio} = apiResponse.data;
        const techsArray=parseStringAsArray(techs);
        const location = {type: 'Point',
                          coodinates: [longitude,latitude],}
        Dev = await Dev.create({
            github_usename,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        })
        // filtra 10km e 1 techs novo dev
        const sendSocketMessageTo = findConnections(
            {latitude,longitude},
            techsArray,
            )
            sendMessage(sendSocketMessageTo,'new-dev',Dev);
    }
        return response.json(Dev);
    }
}