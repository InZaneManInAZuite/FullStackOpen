import Course from './Course'

const Courses = ({ courses }) => {
  return (
    <div>
        <h2>Web development curriculum</h2>
        {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default Courses