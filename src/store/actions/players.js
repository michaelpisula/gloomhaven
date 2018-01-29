export const ADD_PLAYER = "players/add";
export const REMOVE_PLAYER = "players/remove";
const RESET_PLAYERS = "players/reset";

export function addPlayerAction(dispatch, name, characterClass) {
    dispatch({type: ADD_PLAYER, name, class: characterClass});
}

export function resetPlayersAction(dispatch) {
    dispatch({type: RESET_PLAYERS});
}

export function removePlayerAction(dispatch, name) {
    dispatch({type: REMOVE_PLAYER, name});
}
