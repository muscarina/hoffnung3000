import ActionTypes from '../actionTypes'
import { getRequest } from '../services/api'

export const ITEMS_PER_PAGE = 50

export function fetchList(resourceName, page = 0, params = {}) {
  const offset = page * ITEMS_PER_PAGE
  const limit = ITEMS_PER_PAGE
  const meta = {
    page,
    offset,
    limit,
  }

  let type = ActionTypes.INFINITE_LIST_INITIALIZE
  if (page > 0) {
    type = ActionTypes.INFINITE_LIST_REQUEST
  }

  return getRequest([resourceName], { offset, limit, ...params }, {
    request: {
      type,
      meta,
    },
    success: {
      type: ActionTypes.INFINITE_LIST_SUCCESS,
      meta,
    },
    failure: {
      type: ActionTypes.INFINITE_LIST_FAILURE,
      meta,
    },
  })
}

export function clearList() {
  return {
    type: ActionTypes.INFINITE_LIST_INITIALIZE,
  }
}
