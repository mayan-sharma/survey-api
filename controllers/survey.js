const db = require('../models');
const errorHandler = require('../utils/errorHandler');

/**
 * @method POST
 * @route /api/survey/
 * @Authorization Token
 */
exports.createSurvey = async(req, res) => {
    const { name, questions } = req.body;
    const createdBy = req.username;

    // verify req body
    if (!name || !questions || !questions.length) {
        return res.status(400).json({
            message: 'Invalid request'
        });
    }

    let survey, dbQuestions;

    try {
        // start a transaction
        await db.transaction(async transaction => {
            try {
                // create entry in survey table
                survey = await db.Survey.create({ name, createdBy }, { transaction });

                // add questions in question table
                dbQuestions = await db.Question.bulkCreate(questions.map(question => ({
                    question,
                    SurveyId: survey.id
                })), { transaction });

            } catch (err) {
                errorHandler(err, res);
            }
        });

    } catch (err) {
        errorHandler(err, res);
    }

    return res.status(200).json({
        message: 'Survey successfully created',
        survey,
        questions: dbQuestions
    });
}

/**
 * @method POST
 * @route /api/survey/:id
 * @Authorization Token
 */
exports.takeSurvey = async(req, res) => {
    const responses = req.body;
    const SurveyId = req.params.id;
    const username = req.username;

    try {
        // get all questions of the requsted survey
        const questions = await db.Question.findAll({ where: { SurveyId } });

        // check if questions are there
        if (!questions.length) return res.status(400).json({
            message: 'No survey found!'
        });

        // check if req body has answered all the questions
        if (responses.length !== questions.length) return res.status(400).json({
            message: 'You must answer all questions of the survey!'
        });

        // add responses in response table
        await db.Response.bulkCreate(responses.map(res => ({
            response: res.response,
            QuestionId: res.questionId,
            username
        })));

    } catch (err) {
        errorHandler(err, res);
    }

    return res.status(200).json({
        message: 'Questions successfully submitted to survey'
    });
}

/**
 * @method GET
 * @route /api/survey/:id
 * @Authorization Token
 */
exports.getSurvey = async(req, res) => {
    const id = req.params.id;

    try {
        const survey = await db.Survey.findOne({ where: { id } });

        // if survey not found
        if (!survey) return res.status(400).json({
            message: 'No survey with this id'
        });

        // fetch all questions of the survey
        const questions = await db.Question.findAll({
            where: { SurveyId: id },
            attributes: ['id', 'question']
        });

        // fetch all responses of the survey
        const responses = await db.Response.findAll({
            where: { QuestionId: questions.map(question => question.id) },
            attributes: ['QuestionId', 'response', 'username']
        });

        // calculate how many unique users completed a survey
        const totalResponses = new Set(responses.map(response => response.username)).size;

        return res.status(200).json({
            message: 'Survey successfully fetched',
            createdBy: survey.createdBy,
            totalResponses,
            questions,
            responses
        });

    } catch (err) {
        errorHandler(err, res);
    }
}