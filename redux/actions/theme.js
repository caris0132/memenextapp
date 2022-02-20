const toggleModal = (value) => {
    return {
        type: 'TOGGLE_MODAL',
        payload: value
    }
}
const toggleMenu = (value) => {
    return {
        type: 'TOGGLE_MENU',
        payload: value
    }
}

const setMediaWidth = (value) => {
    return {
        type: 'SET_MEDIA',
        payload: value
    }
}

export { toggleModal, toggleMenu, setMediaWidth };