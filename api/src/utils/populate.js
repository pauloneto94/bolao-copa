const Group = require("../models/Group")
const Team = require("../models/Team")
const Match = require("../models/Match")

const createGroupA = () => {
    Group.create({name: "Grupo A"}).then(group => Team.bulkCreate([
        {name: "Catar", groupId: group.id},
        {name: "Equador", groupId: group.id},
        {name: "Senegal", groupId: group.id},
        {name: "Holanda", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 21, 2022 07:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 21, 2022 13:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 25, 2022 10:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 25, 2022 13:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 29, 2022 12:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 29, 2022 12:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroupB = () => {
    Group.create({name: "Grupo B"}).then(group => Team.bulkCreate([
        {name: "Inglaterra", groupId: group.id},
        {name: "Irã", groupId: group.id},
        {name: "Estados Unidos", groupId: group.id},
        {name: "País de Gales", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 21, 2022 10:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 21, 2022 16:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 25, 2022 16:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 25, 2022 07:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 29, 2022 16:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 29, 2022 16:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroupC = () => {
    Group.create({name: "Grupo C"}).then(group => Team.bulkCreate([
        {name: "Argentina", groupId: group.id},
        {name: "Arábia Saudita", groupId: group.id},
        {name: "México", groupId: group.id},
        {name: "Polônia", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 22, 2022 07:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 22, 2022 13:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 26, 2022 16:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 26, 2022 10:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 30, 2022 16:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 30, 2022 16:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroupD = () => {
    Group.create({name: "Grupo D"}).then(group => Team.bulkCreate([
        {name: "França", groupId: group.id},
        {name: "Austrália", groupId: group.id},
        {name: "Dinamarca", groupId: group.id},
        {name: "Tunísia", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 22, 2022 16:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 22, 2022 10:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 26, 2022 13:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 26, 2022 07:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 29, 2022 12:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 29, 2022 12:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroupE = () => {
    Group.create({name: "Grupo E"}).then(group => Team.bulkCreate([
        {name: "Espanha", groupId: group.id},
        {name: "Costa Rica", groupId: group.id},
        {name: "Alemanha", groupId: group.id},
        {name: "Japão", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 23, 2022 13:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 23, 2022 10:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 27, 2022 16:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 27, 2022 07:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 01, 2022 16:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 01, 2022 16:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroupF = () => {
    Group.create({name: "Grupo F"}).then(group => Team.bulkCreate([
        {name: "Bélgica", groupId: group.id},
        {name: "Canadá", groupId: group.id},
        {name: "Marrocos", groupId: group.id},
        {name: "Croácia", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 23, 2022 16:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 23, 2022 07:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 27, 2022 10:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 27, 2022 13:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 01, 2022 12:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 01, 2022 12:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroupG = () => {
    Group.create({name: "Grupo G"}).then(group => Team.bulkCreate([
        {name: "Brasil", groupId: group.id},
        {name: "Sérvia", groupId: group.id},
        {name: "Suíça", groupId: group.id},
        {name: "Camarões", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 24, 2022 16:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 24, 2022 07:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 28, 2022 13:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 28, 2022 07:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 02, 2022 16:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 02, 2022 16:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroupH = () => {
    Group.create({name: "Grupo H"}).then(group => Team.bulkCreate([
        {name: "Portugal", groupId: group.id},
        {name: "Gana", groupId: group.id},
        {name: "Uruguai", groupId: group.id},
        {name: "Coreia do Sul", groupId: group.id}
    ]).then(teams => Match.bulkCreate([
        {
            startTime: new Date('November 24, 2022 13:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 24, 2022 10:00:00'),
            homeTeam: teams[2].id,
            visitTeam: teams[3].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 28, 2022 16:00:00'),
            homeTeam: teams[0].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('November 28, 2022 10:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[1].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 02, 2022 12:00:00'),
            homeTeam: teams[1].id,
            visitTeam: teams[2].id,
            groupId: group.id
        },
        {
            startTime: new Date('December 02, 2022 12:00:00'),
            homeTeam: teams[3].id,
            visitTeam: teams[0].id,
            groupId: group.id
        }
    ])).catch(err => console.log(err))).catch(err => console.log(err))
}

const createGroups = () => {
    createGroupA()
    createGroupB()
    createGroupC()
    createGroupD()
    createGroupE()
    createGroupF()
    createGroupG()
    createGroupH()
}

module.exports = {
    createGroups
}