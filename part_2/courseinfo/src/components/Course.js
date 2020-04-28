import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => (
  <div>
    <h1>Web Development Curriculum</h1>
    {courses.map((course) => (
      <div key={course.id}>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

export default Course;
