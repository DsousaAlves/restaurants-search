import ReactDOM from 'react-dom';

const PortalModal = ({children}) => {
    return ReactDOM.createPortal(children, document.getElementById('modal-root'));
};

export default PortalModal;