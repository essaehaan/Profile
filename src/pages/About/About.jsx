import HeroImg from "@/assets/images/Essa.png";
import OlovaLogo from "@/assets/images/olova.png";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 lg:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Developer, Designer, Creator, Innovator
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="payments illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                Hello! I'm Essa Ehaan, a passionate CMS & Flutter Developer
                specializing in creating innovative web solutions and
                user-friendly interfaces.{" "}
                <span className="font-bold text-white">
                  As the Learner of the Mobile App Development through cross platform
                </span>
                , I'm dedicated to creating Web Solution and cross-platform applications that provide seamless user experiences.
              </p>
              <p className="text-white">
                My focus is on making web development and mobile development faster, easier, and
                accessible to all users. Currently, I'm expanding into
                mobile app development using cross platforms like Flutter and React Native.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I'm a lifelong learner and innovator, committed to pushing the boundaries of technology   .
                    My goal is to create solutions that not only meet the needs of today but also anticipate the challenges of tomorrow.
                    
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Essa Ehaan    
                    </cite>
                    <div className="flex items-center gap-2">
                      <span className="text-white">CMS & Flutter Developer</span>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
