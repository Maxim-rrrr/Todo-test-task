import mysql from 'mysql2/promise';
import config from "config";
import logger from "../modules/logger.js";


class DB {
    connnection = async () => {
        await mysql.createConnection({
            host: config.get("db_host"),
            database: config.get("db_name"),
            user: config.get("db_user"),
            password: config.get("db_password")
        }).then(conn => {
            logger.info(`DB connection success`)
            this.con = conn
        })
    }

    select = async (tabel, additionally = '') => {
        return await this.con.query(`SELECT * FROM ${tabel} ${additionally}`)
    }

    count = async (tabel, additionally = '') => {
        return await this.con.query(`SELECT COUNT(*) FROM ${tabel} ${additionally}`).then(([data]) => data[0]['COUNT(*)'])
    }

    add = async (tabel, obj) => {
        return await this.con.query(`INSERT INTO ${tabel} (${Object.keys(obj).join(', ')}) VALUES (${
                Object.values(obj).map(value => {
                    if (typeof value == 'string') {
                        return "'" + value + "'"
                    }
                    return value
                }).join(', ')
            })`)
    }

    update = async (tabel, obj, additionally = '') => {
        return await this.con.query(`UPDATE ${tabel} SET ${
            Object.entries(obj).map(([key, value]) => {
                if (typeof value == 'string') {
                  return `${key} = '${value}'`
                }
                return `${key} = ${value}`
              }).join(', ')
        } ${additionally}`)
    }

    del = async (tabel, additionally) => {
        return await this.con.query(`DELETE FROM ${tabel} ${additionally}`)
    }
}

export default new DB()