import { UserModel } from '../data-access/user.model.js';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export class UserRepository {
    filter(query, limit) {
        return UserModel.findAll({
            where: {
                login: {
                    [Op.iLike]: `${query}%`
                }
            },
            limit
        });
    }

    getAll() {
        return UserModel.findAll({
            raw: true
        });
    }

    getById(id) {
        return UserModel.findOne({
            where: {
                _id: id
            }
        });
    }

    create(id, login, password, age) {
        return UserModel.create({
            _id: id,
            login,
            password,
            age,
            isDeleted: false
        });
    }

    update(id, payload) {
        return UserModel.update(payload, {
            where: {
                _id: id
            }
        });
    }

    delete(id) {
        return UserModel.destroy({
            where: {
                _id: id
            }
        });
    }

    getByLoginAndPassword(login, password) {
        return UserModel.findOne({
            where: {
                login,
                password
            }
        });
    }
}
