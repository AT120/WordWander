const DISPLAY_ERROR = 1341
const HIDE_ERROR = 1342

const initialState = {
    error: {
        msg: '',
        show: false,
    },
}

const errorReducer = (state = initialState, action) => {
    let newState = {
        error: { ...state.error }
    }
    switch (action.type) {
        case DISPLAY_ERROR:
            newState.error.msg = action.msg
            newState.error.show = true
            return newState
        case HIDE_ERROR:
            newState.error.show = false
            return newState
        default:
            return newState
    }
}

export function displayErrorActionCreator(msg) {
    return { type: DISPLAY_ERROR, msg: msg }
}

export function hideErrorActionCreator() {
    return { type: HIDE_ERROR }
}

export default errorReducer
