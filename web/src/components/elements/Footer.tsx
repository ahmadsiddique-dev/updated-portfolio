import Image from "next/image";

const Footer = () => {
  return (
    <footer className="max-w-2xl px-5 flex items-center justify-between py-3.5 mx-auto">
      <div className="flex gap-3.5">
        <p className="font-light tracking-tight italic text-[16px] text-muted-foreground">
          Ahmad Siddique
        </p>
        <p className="flex justify-center items-center gap-0.5 font-light text-sm">
          <span className="text-muted-foreground font-semibold">(</span>
          <a
            className="underline decoration-gray-500 hover:decoration-gray-100 underline-offset-4 justify-center flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ahmad-siddique-dev/"
          >
            <Image
              src={"/linkedin.svg"}
              height={20}
              width={20}
              alt="LinkedIn profile"
            />{" "}
            LinkedIn{" "}
          </a>
          <span className="text-muted-foreground font-semibold">)</span>
        </p>
      </div>
      <p className="flex justify-center items-center ">
        <a
          className="underline gap-2 decoration-gray-500 hover:decoration-gray-100 underline-offset-4 justify-center flex items-center"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ahmadsiddique-dev"
        >
          <Image
            src={"/github.svg"}
            height={18}
            width={18}
            alt="GitHub profile"
            className="invert-95"
          />{" "}
          <span className="text-sm font-light">Source</span>{" "}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
