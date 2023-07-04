const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Bet extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            date: Sequelize.DATE,
            homeTeamScores: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            visitTeamScores: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            points: Sequelize.INTEGER
        },{sequelize})
    
         return this
   
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
        this.belongsTo(models.Match, {foreignKey: 'matchId', as: 'match'})
    }
}

module.exports = Bet