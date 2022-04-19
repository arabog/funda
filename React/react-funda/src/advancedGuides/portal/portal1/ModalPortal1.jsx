import { useEffect } from 'react'
import ReactDOM from 'react-dom';


const ModalPortal1 = (props) => {
          const modalRoot = document.getElementById('modal-root');

          const el = document.createElement('div');

          useEffect(() => {
                    modalRoot.appendChild(el)
          }, [el, modalRoot])

          useEffect(() => {
                    modalRoot.removeChild(el)
          }, [el, modalRoot])

          console.log(modalRoot)

          return ReactDOM.createPortal (
                    props.children,

                    el,
          )
}


export default ModalPortal1