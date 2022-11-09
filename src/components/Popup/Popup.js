import './Popup.css'

const Popup = (props) => {

    return (
        <div className={`popup popup_closed ${(props.isTablet) && 'popup_opened'}`} />
    )
}

export default Popup;