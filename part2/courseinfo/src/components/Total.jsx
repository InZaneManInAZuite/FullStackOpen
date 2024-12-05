const Total = (props) => {

    let total = 0
    props.parts.forEach(part => {
        total += part.exercises
    })

    return (
        <strong>total of {total} exercises</strong>
    )
}

export default Total