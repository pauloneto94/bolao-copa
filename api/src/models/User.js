const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
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
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.VIRTUAL,
                allowNull: false
            },
            password_hash: Sequelize.STRING,
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
        },{sequelize})
        
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8)
            }
         })
    
         return this
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }

}

module.exports = User