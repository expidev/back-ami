const statisticsModel = require("../dao/statisticsModel")

const getDownloadStatistics = async (req, res) => {
    try {
        const { 
            id_ami,
            startDate,
            endDate
        } = req.body
        const countTotal = await statisticsModel.countDownloadByAmi(
            id_ami, startDate, endDate
        );
        const countEntreprise = await statisticsModel.countEntrepriseDownloadByAmi(
            id_ami, startDate, endDate
        );
        const countIndividu = await statisticsModel.countIndividuDownloadByAmi(
            id_ami, startDate, endDate
        );
        const districtStats = await statisticsModel.countDownloadsByDistrict(
            id_ami, startDate, endDate
        );
    
        res.status(200).json({
            countTotal: countTotal.count, 
            countEntreprise: countEntreprise.count,
            countIndividu: countIndividu.count,
            districtData: districtStats
        });
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

module.exports = { getDownloadStatistics }