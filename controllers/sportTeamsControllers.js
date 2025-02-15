import {
  createSportTeams,
  getSportsTeams,
  getSportByTeamId,
  getTeamsBySportId,
  getSportByTeamId,
} from "../db/services/sportTeamsServices.js";
import { sportTeamSchema } from "../schemas/sportTeamSchema.js";
import { generateError } from "../utils/generateError.js";

export const createSportTeamController = async (req, res, next) => {
  try {
    const validate = await sportTeamSchema.validateAsync(req.body, {
      stripUnknown: true,
    });

    const sportTeam = await createSportTeams(validate);

    res.status(201).json({
      status: 201,
      message: "Team added correctly to sport",
      sportTeam,
    });
  } catch (error) {
    next(error);
  }
};

export const getSportsTeams = async (req, res, next) => {
  try {
    const sportsTeams = await getSportsTeams();

    res.status(200).json({
      status: 200,
      message: "All teams are founded",
      sportsTeams,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getTeamsBySportIdController = async (req, res, next) => {
  try {
    const { sport_id } = req.params;

    const teamsSport = await getTeamsBySportId(sport_id);

    res.status(200).json({
      status: 200,
      message: "Teams founded correctly from this sport",
      teamsSport,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSportByTeamIdController = async (req, res, next) => {
  try {
    const { team_id } = req.params;

    const sportTeam = await getSportByTeamId(team_id);

    res.status(200).json({
      status: 200,
      message: "Sport founded correctly from this teams",
      sportTeam,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
