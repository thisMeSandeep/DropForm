import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { LightRays } from "../ui/light-rays";

const VideoDemo = () => {
    return (
        <section id="demo" className="relative px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-20">

            {/* Light rays  */}
            <LightRays />

            <div className="max-w-6xl mx-auto">
                {/* Header section */}
                <div className="text-center mb-12">
                    <h2 className="mb-4">
                        <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Watch Demo
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-100/50 max-w-2xl mx-auto">
                        See DropForm in action. Watch how easy it is to create beautiful forms with just a simple prompt.
                    </p>
                </div>

                {/* Video container */}
                <div className="flex justify-center items-center">
                    <HeroVideoDialog
                        className="block"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="/dashboard.png"
                        thumbnailAlt="DropForm Demo Video Thumbnail"
                    />
                </div>
            </div>
        </section>
    )
}

export default VideoDemo;