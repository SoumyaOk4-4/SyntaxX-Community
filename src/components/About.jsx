import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function About() {
  return (
    <>
      <br />
      <h1 className="fadein_fadeout2 page-title" style={{ color: "#e7a129" }}>
        <FontAwesomeIcon icon={faCircleInfo} /> About
      </h1>
      <br />
      <div className="web-content-container about-container">
        <div className="fadein_fadeout web-content about-txt">
          <div className="general">
            Welcome to SYNTAXX, A Departmental(CSE) team to conduct Departmental Events, 
            dedicated to nurture innovation, creativity, and collaboration among students. 
            Our goal is to create a dynamic community who can explore,
            experiment, and excel in the rapidly evolving world of technology.
            Stepping into a new era of tech-driven excellence, SYNTAXX provides a
            platform for hands-on learning, problem-solving, and skill-building
            through a wide range of events and activities. From coding competitions to technical workshops, 
            we offer a space where curiosity meets innovation.
          </div>

          <div className="expect" style={{fontSize: "1.5rem"}}>WHAT TO EXPECT ?</div>

          <div className="future-events">
            <div>
              To kickstart each academic session and ignite the spark of
              technology, SYNTAXX will organize CODEFEST - a coding
              competition of CSE department that challenges problem-solving skills of the 
              departmental(CSE) students.
            </div>
            <div>
              We will also host Hackathons, Workshops and Tech Talks on Latest Technologies 
              to improve the skills of the students CSE department.
            </div>
            <div>
              We will conduct workshops and mentorship programs on emerging
              technologies, offering opportunities for students of the CSE department 
              to gain hands-on experience in fields like AI, Cybersecurity, IoT, and Game
              Development—bridging the gap between academics and real-world
              applications.
            </div>
            <div>
              Whether you're a Coding Wizard, an enthusiast of Game Devolopment, 
              or just someone eager to dive into the world of
              technology, SYNTAXX welcomes you. Join us and be a part of this departmental group 
              that doesn't just follow technology— it creates it.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
