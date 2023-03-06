/* eslint-disable camelcase */
'use strict'
const __createBinding = (this && this.__createBinding) || (Object.create
  ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    let desc = Object.getOwnPropertyDescriptor(m, k)
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function () { return m[k] } }
    }
    Object.defineProperty(o, k2, desc)
  }
  : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
  })
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
  ? function (o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v })
  }
  : function (o, v) {
    o.default = v
  })
const __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod
  const result = {}
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
  __setModuleDefault(result, mod)
  return result
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const gameServices = __importStar(require('../services/gameServices'))
const utils_1 = __importDefault(require('../utils'))
const router = express_1.default.Router()
router.get('/', (_req, res) => {
  res.send(gameServices.getGamesNoTipo())
})
router.get('/:id', (req, res) => {
  const gameWithId = gameServices.findId(+req.params.id)
  return (gameWithId != null)
    ? res.send(gameWithId)
    : res.sendStatus(404)
})
router.post('/', (req, res) => {
  try {
    const newGameEntry = (0, utils_1.default)(req.body)
    const addedGameEntry = gameServices.addGame(newGameEntry)
    res.json(addedGameEntry)
    res.send('Saving videogame...')
  } catch (e) {
    res.status(400)
    if (e instanceof Error) {
      res.send(e.message)
    }
  }
})
exports.default = router
