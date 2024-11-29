import Part from './Part'

const Content = (props) => {

    return (
        props.parts.map(part => <Part key={part.name} part={part}/>)
    )
}

export default Content