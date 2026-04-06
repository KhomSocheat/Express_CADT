import { faker } from '@faker-js/faker'
import courseModel from './models/course.model.js'
import teacherModel from './models/teacher.model.js'
import { dbConnect } from './database/db.js'

const run = async () => {
  await dbConnect()

  const courseId = []
  const teacherId = []

  const numberOfCourse = 1000
  const numberOfTeacher = 50

  // -------- COURSES --------
  for (let i = 0; i < numberOfCourse; i++) {
    let course = new courseModel({
      title: faker.book.title(),
      description: faker.lorem.paragraph(),
      credit: faker.number.int({ max: 100 })
    })

    await course.save()
    courseId.push(course._id)
  }

  console.log(`${numberOfCourse} courses generated`)

  // -------- TEACHERS --------
  for (let i = 0; i < numberOfTeacher; i++) {
    let teacher = new teacherModel({
      name: faker.person.fullName(),
      subject: faker.person.jobTitle(),
      yearsOfExperience: faker.number.int({ max: 30 })
    })

    await teacher.save()
    teacherId.push(teacher._id) // ✅ FIXED
  }

  console.log(`${numberOfTeacher} teachers generated`)

  // -------- RELATION: Course → Teacher --------
  const courses = await courseModel.find()

  for (const item of courses) {
    item.taughtBy = faker.helpers.arrayElements(teacherId, {
      min: 1,
      max: 3
    })

    await item.save()
  }

  // -------- RELATION: Teacher → Courses --------
  const teachers = await teacherModel.find()

  for (const item of teachers) {
    item.courses = faker.helpers.arrayElements(courseId, {
      min: 2,
      max: 5
    })

    await item.save()
  }

  console.log("Relations created")

  process.exit()
}

run()