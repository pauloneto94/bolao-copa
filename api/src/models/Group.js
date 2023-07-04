const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Group extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },{sequelize})
    
         return this
   
    }

    static associate(models){
        this.hasMany(models.Team, {foreignKey: 'groupId'})
        this.hasMany(models.Match, {foreignKey: 'groupId'})
    }
}

module.exports = Group