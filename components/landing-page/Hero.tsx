import { Sparkle } from "lucide-react"
import AnimatedTextArea from "./AnimatedTextArea"


const Hero = () => {
    return (
        <section className="relative pt-32 pb-32 md:pb-40 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center min-h-screen">

            {/* Corner gradient masks */}
            {/* Corner gradient masks */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top left */}
                <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-linear-to-br from-slate-800/15 via-slate-900/5 to-transparent blur-3xl"></div>

                {/* Top right */}
                <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-linear-to-bl from-gray-800/15 via-gray-900/5 to-transparent blur-3xl"></div>

                {/* Bottom left */}
                <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-linear-to-tr from-zinc-800/12 via-zinc-900/4 to-transparent blur-3xl"></div>

                {/* Bottom right */}
                <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-linear-to-tl from-neutral-800/12 via-neutral-900/4 to-transparent blur-3xl"></div>
            </div>


            {/* Text content */}
            <div className="max-w-5xl mx-auto text-center w-full">

                {/* Hero badge */}
                <div className="flex justify-center mb-2">
                    <span className="hero-badge space-x-2">
                        <Sparkle className="size-4 rotate-45 text-white" />
                        <p className="hero-badge-text">Build forms using AI</p>
                    </span>
                </div>

                {/* Main heading  */}
                <h1 className="mb-4">
                    {/* Desktop */}
                    <div className="hidden md:block">
                        <span className="section-header-title text-7xl font-semibold leading-tight">
                            Drop forms within seconds.
                        </span>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden">
                        <span className="section-header-title text-4xl sm:text-5xl font-bold leading-tight block">
                            Drop forms
                        </span>
                        <span className="section-header-title text-4xl sm:text-5xl font-bold leading-tight block">
                            Within seconds.
                        </span>
                    </div>
                </h1>

                {/* Sub heading */}
                <h3 className="text-lg text-gray-100/40 ">Build forms by just writing a prompt in human language.</h3>

            </div>

            {/* Animted text area  */}
            <div className="w-full mt-8">
                <AnimatedTextArea />
            </div>

        </section>
    )
}

export default Hero