const statisticsModel = require("../models/statisticsModel")

const getDownloadStatistics = async (req, res) => {
    try {
        const { 
            search,
            startDate,
            endDate
        } = req.body

        const countTotal = await statisticsModel.countDownloadByAmi(
            search, startDate, endDate
        );
        const countEntreprise = await statisticsModel.countEntrepriseDownloadByAmi(
            search, startDate, endDate
        );
        const countIndividu = await statisticsModel.countIndividuDownloadByAmi(
            search, startDate, endDate
        );
        const regionStats = await statisticsModel.countDownloadsByRegion(
            search, startDate, endDate
        );
    
        res.status(200).json({
            countTotal: countTotal.count, 
            countEntreprise: countEntreprise.count,
            countIndividu: countIndividu.count,
            regionsData: regionStats
        });
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

module.exports = { getDownloadStatistics }