export default function setNumber(state = 0, action) {
    switch (action.type) {
      case 'SET':
        return state = action.value
      case 'CLEAR':
        return state = 0
      default:
        return state
    }
  }