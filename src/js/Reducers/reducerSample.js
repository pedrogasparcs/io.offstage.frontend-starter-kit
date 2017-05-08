/**
 * Created by PedroGaspar on 29/03/2017.
 */

import {
    SAMPLE_ACTION
} from './../Actions/actionsSample'

const reducerSample = (state = { }, action) => {
  switch (action.type) {
    case SAMPLE_ACTION:
      return {
        ...state,
        [action.key]: action.data
      }
    default:
      return state
  }
}

export default reducerSample
