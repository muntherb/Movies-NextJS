import { useToasts } from 'react-toast-notifications'
import Router from 'next/router'
import styles from './Button.module.scss'

const Button = (props) => {
    const {show} = props 
    const {type} = props
    const handleDelete = async ()=> {
        const res = await fetch(
          'http://localhost:3100/api/movies',
          {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'DELETE'
          }
        )
        const data = await res.json()
        
        if(data){
          addToast(data.message, {appearance: "success", autoDismissTimeout: 2500})
            setTimeout(() => {
              return Router.reload(window.location.pathname);
            }, 1250);
          }
      }
      const handleAddClick = async (show) =>{
  
        // Add Movie details to DB
        const res = await fetch(
          'http://localhost:3100/api/movies',
          {
            body: 
            JSON.stringify({...show}),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }
        )
        const result = await res.json()
        if(result)
        addToast(`${result.name} has been successfully added to favorites!`, {appearance: "success", autoDismissTimeout: 2500})
            return {
              redirect: {
                destination: '/favorites',
                permanent: false,
              },
            }
      }
    const {addToast} = useToasts()
    switch (type) {
        case 'deleteAll':
              return( 
                <div className={styles.btnWrap}>
                    <button onClick={() =>handleDelete()} className={styles.Btn+ ' ' + styles.trash}><span>Delete All favorites</span></button>
                </div>
            )
        case 'deleteById':
            const handleClick = async (show) =>{
  
                // Add Movie details to DB
                const res = await fetch(
                  'http://localhost:3100/api/movies/deleteById',
                  {
                    body: 
                    JSON.stringify({...show}),
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    method: 'POST'
                  }
                )
                const result = await res.json()
                if(result)
                addToast(result.message, {appearance: "success", autoDismissTimeout: 1500})
                setTimeout(() => {
                  return Router.reload(window.location.pathname);
                }, 1250);
            }
                return( 
                    <div className={styles.btnWrap}>
                        <button onClick={() =>handleClick(show)} className={styles.Btn+ ' ' + styles.trash}><span>Delete from favorites</span></button>
                    </div>
                )
        case 'addFav':
          return( 
            <div className={styles.btnWrap}>
                <button onClick={() =>handleAddClick(show)} className={styles.Btn+ ' ' + styles.heart}><span>Add to favorites</span></button>
            </div>
        )
        default:
            return( <button />)
            break;
    }
    
    
}
export default Button