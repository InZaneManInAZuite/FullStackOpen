const Total = ({parts}) => {

    const total = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <strong>total of {total} exercises</strong>
    )
}

export default Total