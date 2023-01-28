const axios = require("axios");
require('dotenv').config()

const year = new Date().getFullYear() - 1;
const key = process.env.API_KEY;

const getNflScores = async (req, res) => {
  const { teamOne, teamTwo } = req.body;

  console.log(teamOne, teamTwo);

  res.send('Success');

  // try {
  //   // first Team Id request options /////
  //   const teamOneOptions = {
  //     method: 'GET',
  //     url: 'https://api-nba-v1.p.rapidapi.com/teams',
  //     params: { search: teamOne },
  //     headers: {
  //       'X-RapidAPI-Key': key,
  //       'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  //     }
  //   };
  //   // first Team Id request /////
  //   const teamOneResponse = await axios.request(teamOneOptions);
  //   // first Team ID ////
  //   const teamOneId = await teamOneResponse.data.response[0].id;

  //   ///////////////////////////////////////////////

  //   // second Team Id request options /////
  //   const teamTwoOptions = {
  //     method: 'GET',
  //     url: 'https://api-nba-v1.p.rapidapi.com/teams',
  //     params: { search: teamTwo },
  //     headers: {
  //       'X-RapidAPI-Key': key,
  //       'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  //     }
  //   };
  //   // second Team Id request /////
  //   const teamTwoResponse = await axios.request(teamTwoOptions);
  //   // second Team Id ////
  //   const teamTwoId = await teamTwoResponse.data.response[0].id;

  //   ///////////////////////////////////////////////

  //   // games request options ////
  //   const gameOptions = {
  //     method: 'GET',
  //     url: 'https://api-nba-v1.p.rapidapi.com/games',
  //     params: {season: year, h2h: `${teamOneId}-${teamTwoId}`},
  //     headers: {
  //       'X-RapidAPI-Key': key,
  //       'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  //     }
  //   };
  //   // games request ////
  //   const gamesResponse = await axios.request(gameOptions);
  //   // games response ////
  //   const games = await gamesResponse.data.response;

  //   // response //
  //   res.status(200).json({
  //     success: true,
  //     data: games,
  //   });
  // } catch (error) {
  //   console.log(error);
  // };
};

module.exports = { getNflScores };