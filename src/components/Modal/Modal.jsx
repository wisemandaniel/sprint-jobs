import Button from '../../components/Button/Button';

function Modal({ closeModal, children}) {

    return ( 
    <div id="modal-bg" className="absolute top-0 left-0 w-screen h-screen bg-zinc-700/50 flex flex-col justify-center items-center">
        {children}
    </div>);
}

export default Modal;