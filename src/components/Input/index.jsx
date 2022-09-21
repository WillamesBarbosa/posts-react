import './style.css'

export const Input = ({value, onChange}) => {
    return (
        <input value={value} onChange={onChange} placeholder='Encontre o post específico...' className='input-search' type='search' />
    )}