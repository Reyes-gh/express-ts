/* eslint-disable @typescript-eslint/restrict-template-expressions */

import mysql=require('mysql')
import GameMethods from '../game/methods/gameMethods'
import Game from '../game/types/game'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'usuario',
  database: 'apits',
  port: 3306
})

connection.connect()

export default class Sql implements GameMethods {
  async addGame (id: Number, name: String, genre: String): Promise<Boolean> {
    return await new Promise<Boolean>((resolve, reject) => {
      connection.query('INSERT INTO games VALUES (?,?,?)', [id, name, genre], function (error) {
        if (error != null) {
          reject(error)
          console.log('Ha ocurrido un error, revisa la inserción')
        } else {
          resolve(true)
        }
      })
    })
  }

  async getGame (id: Number): Promise<Game> {
    return await new Promise<Game>((resolve, reject) => {
      connection.query('SELECT * FROM games WHERE id=(?)', [id], function (error, results) {
        if (error != null) {
          reject(error)
          console.log('Ha ocurrido un error, no se ha podido borrar el objeto')
        }
        resolve({
          id: results[0].id,
          name: results[0].name,
          genre: results[0].genre
        })
      })
    })
  }

  async delGame (id: Number): Promise<Boolean> {
    return await new Promise<Boolean>((resolve, reject) => {
      connection.query('DELETE FROM games WHERE id=(?)', [id], function (error) {
        if (error != null) {
          reject(error)
          console.log('No se ha podido borrar el elemento')
        }
        resolve(true)
      })
    })
  }

  async getGames (): Promise<Game[]> {
    return await new Promise<Game[]>((resolve, reject) => {
      connection.query('SELECT * FROM games', function (error, results) {
        if (error != null) {
          reject(error)
          console.log('No se han podido cargar los juegos')
        }
        const games: Game[] = []
        results.forEach((gm: any) => {
          games.push({
            id: gm.id,
            name: gm.name,
            genre: gm.genre
          })
        })
        resolve(games)
      })
    })
  }

  async updateGame (id: Number, newName: String, newGenre: String): Promise<Boolean> {
    return await new Promise<Boolean>((resolve, reject) => {
      connection.query('UPDATE games SET name=(?), genre=(?) WHERE id=(?)', [newName, newGenre, id], function (error) {
        if (error != null) {
          reject(error)
          console.log('Ha fallado el update, comprueba el JSON')
        } else {
          resolve(true)
        }
      })
    })
  }

  async getDTO (genre: String): Promise<Game[]> {
    return await new Promise<Game[]>((resolve, reject) => {
      connection.query('SELECT * FROM games g INNER JOIN genres ge ON g.genre=ge.genre WHERE g.genre=(?)', [genre], function (error, results) {
        if (error != null) {
          reject(error)
          console.log('Algo ha fallado! No se han podido extraer los juegos de dicha categoría')
        }
        const games: Game[] = []
        results.forEach((game: any) => {
          games.push({
            id: game.id,
            name: game.name,
            genre: game.genre
          })
        })
        console.log(games)
        resolve(games)
      })
    })
  }
}
