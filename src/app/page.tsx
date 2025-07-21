"use client";

import Nav from "./nav";
import MyFooter from "./footer";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <div className="content-container">
        <Nav />

        <div style={{ marginTop: "2rem" }}>
          <h3>
            Hello and welcome! My name is Spencer Lommel, I mostly program in C,
            C++, Go, and sometimes Python when needed, so I don&apos;t really do
            a lot of web development :P
          </h3>

          <p>
            I was working on a pretty cool embedded Linux project and I got a
            lot of questions online about it so I decided to make this page.
            Check out the project{" "}
            <Link href="/posts/reverse-engineering-poly-tc8-part-1">here!</Link>
          </p>

          <p>
            I am a CS Major at NDSU, and a Systems Programmer Intern at Marvin
            Windows. I really like hardware reverse engineering and working with
            microcontrollers! Check out my Github or Projects tab to see more of
            what I like to make! :-)
          </p>

          <MyFooter />
        </div>
      </div>
    </div>
  );
}
