const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const Bet = require('./Bet')

class Match extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            startTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            homeTeamScores: Sequelize.INTEGER,
            visitTeamScores: Sequelize.INTEGER
        },{sequelize})

        this.addHook('afterUpdate', async (match) => {
           const matchBets = await Bet.findAll({
               where: {matchId: match.id}
           })
           await Promise.all(matchBets.map(async bet => {

               var betPoints = 0
               
               if(bet.homeTeamScores == match.homeTeamScores && bet.visitTeamScores == match.visitTeamScores){
                    betPoints += 3
                }
               if(
                bet.homeTeamScores > bet.visitTeamScores &&
                match.homeTeamScores > match.visitTeamScores
                ){
                    betPoints += 1
                }
                if(
                bet.homeTeamScores < bet.visitTeamScores &&
                match.homeTeamScores < match.visitTeamScores
                ){
                    betPoints += 1
                }
                if(
                bet.homeTeamScores == bet.visitTeamScores &&
                match.homeTeamScores == match.visitTeamScores
                ){
                    betPoints += 1
                }

                await bet.update({points: betPoints})

           }))
         })
    
         return this
   
    }

    static associate(models){
        this.belongsTo(models.Team, {foreignKey: 'homeTeam', as: 'home'})
        this.belongsTo(models.Team, {foreignKey: 'visitTeam', as: 'visit'})
        this.hasMany(models.Bet, {foreignKey: 'matchId'})
    }
}

module.exports = Match