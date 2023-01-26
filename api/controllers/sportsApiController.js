const axios = require("axios");
require('dotenv').config()

const key = process.env.API_KEY;

const getScores = async (req, res) => {
  const { teamOne, teamTwo } = req.body;

  try {
    // first Team Id request options /////
    const teamOneOptions = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/teams',
      params: { search: teamOne },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };
    // first Team Id request /////
    const teamOneResponse = await axios.request(teamOneOptions);
    // first Team ID ////
    console.log(teamOneResponse.data.response[0].id);
    const teamOneId = await teamOneResponse.data.response[0].id;

    ///////////////////////////////////////////////

    // second Team Id request options /////
    const teamTwoOptions = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/teams',
      params: { search: teamTwo },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };
    // second Team Id request /////
    const teamTwoResponse = await axios.request(teamTwoOptions);
    // second Team Id ////
    console.log(teamTwoResponse.data.response[0].id);
    const teamTwoId = await teamTwoResponse.data.response[0].id;

    ///////////////////////////////////////////////

    // games request options ////
    const gameOptions = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/games',
      params: {season: '2022', h2h: `${teamOneId}-${teamTwoId}`},
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };
    // games request ////
    const gamesResponse = await axios.request(gameOptions);
    // games response ////
    console.log(gamesResponse.data.response);
    const games = await gamesResponse.data.response;

    // response //
    res.status(200).json({
      success: true,
      data: games,
    });
  } catch (error) {
    console.log(error);
  };
};

module.exports = { getScores };
