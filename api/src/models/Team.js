const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class Team extends Model {
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
            },
            image: Sequelize.STRING
        },{sequelize})
    
         return this
   
    }

    static associate(models){
        this.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' })
    }
}

module.exports = Team