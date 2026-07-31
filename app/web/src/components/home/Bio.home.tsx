import InforViewer from "@/lib/InforViewer";
import Image from "next/image";
import Link from "next/link";

const Bio = () => {
  return (
    <section>
      <h2 className=" text-3xl font-semibold mb-3">About</h2>
      <div className="flex gap-5 flex-col-reverse sm:flex-row justify-center items-center">
        <div>
          <p className="py-6">
            I'm a{" "}
            <InforViewer
              url="https://www.freecodecamp.org/news/what-is-a-full-stack-developer-back-end-front-end-full-stack-engineer/"
              info="A full-stack developer is a versatile software professional proficient in building both the front-end (user interface) and back-end (server-side/database) of applications."
              text="Full-Stack Developer"
            />{" "}
            and computer science student. Right now living in{" "}
            <InforViewer
              url="https://en.wikipedia.org/wiki/Lahore"
              text="Lahore"
              info="Lahore is the capital and largest city of the Pakistani province of Punjab. It is the second-largest city in Pakistan, after Karachi, and 27th largest in the world, with a population of over 14 million. Lahore is one of Pakistan's major industrial, educational and economic hubs"
            />
            , Pakistan and I've been serving to the web for the past three years.
          </p>
          <p>
            I've been passionate about computers since childhood and wanted to
            be their friend, so I learned their language. My interest in the web
            introduced me to <InforViewer
              info="JavaScript is a programming language and core technology of the Web, alongside HTML and CSS. Created by Brendan Eich in 1995."
              text="JavaScript"
              url="https://en.wikipedia.org/wiki/JavaScript"
            /> 🖤
          </p>
        </div>
        <Image
          className="rounded-full max-w-45 shadow-lg grayscale border contrast-150 border-gray-500 bg-gray-300"
          src="/profile-picture.webp"
          alt="Ahmad Siddique — Full-Stack Developer from Lahore, Pakistan"
          height={450}
          width={450}
          priority
        />
      </div>
      <div>
        <p className="my-7">
          With the time I've learned many <Link href="/skills" className="underline gap-2 decoration-gray-500 hover:decoration-gray-100 underline-offset-4">
            amazing things
          </Link> {" "}
          and made many <Link href="/project" className="underline gap-2 decoration-gray-500 hover:decoration-gray-100 underline-offset-4">
            projects
          </Link>
          . Which had boost my confidence in Web Development. I also do <InforViewer
            info="Data Structures and Algorithms (DSA) is a fundamental part of Computer Science that teaches you how to think and solve complex problems systematically."
            text="DSA"
            url="https://www.w3schools.com/dsa/"
          /> on daily basis to improve my problem solving skills.

        </p>
      </div>
    </section>
  );
};

export default Bio;
