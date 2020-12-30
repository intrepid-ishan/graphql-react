import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children }) => {
    const elRef = useRef(null);

    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    //div - styling
    //createPortal(children, container/domNode) - createPortal to pass the children (whatever you put inside <Modal></Modal>) to the portal div(elRef.current)
    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;