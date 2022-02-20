const initState = {
    openMenu: true,
    openModal: false,
    media: "lg"
}
const themeReducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return {...state, openModal: action.payload };

        case "TOGGLE_MENU":
            return {...state, openMenu: action.payload };

        case "SET_MEDIA":
            return {...state, media: action.payload };

        default:
            return state;
    }
}
export default themeReducer;