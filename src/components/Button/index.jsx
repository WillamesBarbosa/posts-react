import './style.css'

export const Button = ({loadMorePost, disabled}) => {
    return (<button disabled={disabled} className='button' onClick={loadMorePost}>Mais Posts</button>)
}