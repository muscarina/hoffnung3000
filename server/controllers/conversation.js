import httpStatus from 'http-status'

import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from './base'

import Animal from '../models/animal'
import Conversation, {
  ConversationBelongsToManyAnimal,
  ConversationHasManyMessage,
} from '../models/conversation'
import Message from '../models/message'

import pick from '../utils/pick'
import { APIError } from '../helpers/errors'

const permittedFields = [
  'text',
  'title',
]

export default {
  create: (req, res, next) => {
    const values = pick(permittedFields, req.body)
    const animalIds = req.body.animalIds

    // get all receiving animals
    return Animal.findAll({
      where: {
        id: {
          $in: animalIds,
        },
      },
    }, {
      returning: true,
    })
      .then(receivingAnimals => {
        // check if receiving animal is not myself
        receivingAnimals.forEach(animal => {
          if (animal.userId === req.user.id) {
            next(
              new APIError(
                'You can\'t send a message to yourself',
                httpStatus.BAD_REQUEST
              )
            )
            return null
          }
          return true
        })

        // are all receiving animals given?
        if (receivingAnimals.length !== animalIds.length) {
          next(
            new APIError(
              'One of the receiving animals does not exist',
              httpStatus.BAD_REQUEST
            )
          )
          return null
        }

        // create an animal for myself (the sending user)
        return Animal.create({
          userId: req.user.id,
        }, {
          returning: true,
        })
          .then(sendingAnimal => {
            const animals = receivingAnimals.concat([sendingAnimal])

            // create the new conversation
            return Conversation.create({
              title: values.title,
              animalId: sendingAnimal.id,
            })
              .then(conversation => {
                return conversation.setAnimals(animals)
                  .then(() => {
                    // create first message in conversation
                    return Message.create({
                      animalId: sendingAnimal.id,
                      conversationId: conversation.id,
                      text: values.text,
                    })
                      .then(() => {
                        res.json({ status: 'ok' })
                      })
                  })
              })
          })
      })
      .catch(err => next(err))
  },
  findAll: (req, res, next) => {
    const {
      limit = DEFAULT_LIMIT,
      offset = DEFAULT_OFFSET,
    } = req.query

    return Conversation.findAndCountAll({
      distinct: true,
      include: [
        {
          association: ConversationBelongsToManyAnimal,
          where: {
            userId: req.user.id,
          },
        },
        ConversationHasManyMessage,
      ],
      limit,
      offset,
      order: [
        ['createdAt', 'ASC'],
        [ConversationHasManyMessage, 'createdAt', 'DESC'],
      ],
    })
      .then(result => {
        res.json({
          data: result.rows,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          total: result.count,
        })
      })
      .catch(err => next(err))
  },
  lookup: (req, res, next) => {
    Conversation.findById(req.params.resourceId, {
      include: [
        {
          association: ConversationBelongsToManyAnimal,
          where: {
            userId: req.user.id,
          },
        },
      ],
      rejectOnEmpty: true,
    })
      .then(conversation => {
        req.conversation = conversation
        next()
      })
      .catch(err => next(err))
  },
  findOne: (req, res, next) => {
    return Conversation.findById(req.params.resourceId, {
      include: [
        {
          association: ConversationBelongsToManyAnimal,
          where: {
            userId: req.user.id,
          },
        },
      ],
      rejectOnEmpty: true,
    })
      .then(conversation => res.json(conversation))
      .catch(err => next(err))
  },
}
