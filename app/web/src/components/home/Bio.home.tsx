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
            and
            <InforViewer
              url=""
              info="A GenAI engineer is a technical professional who builds production-grade software applications powered by generative artificial intelligence models"
              text="GenAI Engineer"
            />
            . Right now living in{" "}
            <InforViewer
              url="https://en.wikipedia.org/wiki/Lahore"
              text="Lahore"
              info="Lahore is the capital and largest city of the Pakistani province of Punjab. It is the second-largest city in Pakistan, after Karachi, and 27th largest in the world, with a population of over 14 million. Lahore is one of Pakistan's major industrial, educational and economic hubs"
            />
            , Pakistan and I've been serving to the web for the past three years & learned a lot of amazing stuff.
          </p>
          <p>
            I've always been looking for an opportunity to surround myself with like-minded where I can learn, contribute & share my ideas to create some impact.
            {/* <InforViewer
              info="JavaScript is a programming language and core technology of the Web, alongside HTML and CSS. Created by Brendan Eich in 1995."
              text="JavaScript"
              url="https://en.wikipedia.org/wiki/JavaScript"
            /> 🖤 */}
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
          In the era of AI I still do <InforViewer
            info="Data Structures and Algorithms (DSA) is a fundamental part of Computer Science that teaches you how to think and solve complex problems systematically."
            text="DSA"
            url="https://www.w3schools.com/dsa/"
          />  & and read a lot of
          <InforViewer
          info="Documentation means official papers, records, or written materials that provide proof, evidence, or instructions on how to use a system or object"
          url="https://en.wikipedia.org/wiki/Documentation"
          text="documentation"
          />  to keep my self upto-date and away from 
          
          <InforViewer
          key={'ai slope'}
          info="AI slop is low-quality, mass-produced content generated with AI, created more for volume and attention than for usefulness, originality, or human value."
          text="AI Slop"
          url="https://en.wikipedia.org/wiki/AI_slop"
          />
          
          My curiosity of understanding how things works made me to switch from Windows and Now I'm proud of saying:
          

        </p>
        <p className="my-7 text-start font-bold italic">
          "I use Arch Btw"
          <InforViewer
          info=""
          text=""
          url=""
          key={''}
          />
        </p>
      </div>
    </section>
  );
};

export default Bio;
