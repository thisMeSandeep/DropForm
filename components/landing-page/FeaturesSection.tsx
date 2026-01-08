import { Sparkles, Settings, BarChart3, MessageSquare } from "lucide-react"
import { BentoCard, BentoGrid } from "../ui/bento-grid"

const features = [
    {
        Icon: Sparkles,
        name: "AI-Powered Form Generation",
        description: "Create beautiful forms instantly with just a natural language prompt. Our AI understands your intent and builds the perfect form structure for you.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute -top-20 -right-20 opacity-60 bg-linear-to-br from-purple-500 to-pink-500 blur-3xl w-40 h-40 rounded-full" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 bg-[#0a0a1a] border border-white/10 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.3),0_12px_24px_rgba(0,0,0,.2)] [&_svg]:text-white/90 [&_h3]:text-white/90 [&_p]:text-gray-300/70 [&_a]:text-white/80 hover:[&_a]:text-white [&_.group-hover\:bg-black\/\[\.03\]]:bg-white/5",
    },
    {
        Icon: Settings,
        name: "Full Customization",
        description: "Customize every aspect of your forms - fields, styling, validation rules, and more. Make each form uniquely yours.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute -top-20 -right-20 opacity-60 bg-linear-to-br from-blue-500 to-cyan-500 blur-3xl w-40 h-40 rounded-full" />,
        className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 bg-[#0a0a1a] border border-white/10 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.3),0_12px_24px_rgba(0,0,0,.2)] [&_svg]:text-white/90 [&_h3]:text-white/90 [&_p]:text-gray-300/70 [&_a]:text-white/80 hover:[&_a]:text-white [&_.group-hover\:bg-black\/\[\.03\]]:bg-white/5",
    },
    {
        Icon: BarChart3,
        name: "Advanced Analytics",
        description: "Track form submissions, analyze response data, and gain insights with our comprehensive analytics dashboard.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute -top-20 -right-20 opacity-60 bg-linear-to-br from-green-500 to-emerald-500 blur-3xl w-40 h-40 rounded-full" />,
        className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-4 bg-[#0a0a1a] border border-white/10 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.3),0_12px_24px_rgba(0,0,0,.2)] [&_svg]:text-white/90 [&_h3]:text-white/90 [&_p]:text-gray-300/70 [&_a]:text-white/80 hover:[&_a]:text-white [&_.group-hover\:bg-black\/\[\.03\]]:bg-white/5",
    },
    {
        Icon: MessageSquare,
        name: "AI Data Query",
        description: "Query your collected data using natural language. Our AI chatbot understands your questions and provides instant insights from your form responses.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute -top-20 -right-20 opacity-60 bg-linear-to-br from-orange-500 to-red-500 blur-3xl w-40 h-40 rounded-full" />,
        className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4 bg-[#0a0a1a] border border-white/10 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.3),0_12px_24px_rgba(0,0,0,.2)] [&_svg]:text-white/90 [&_h3]:text-white/90 [&_p]:text-gray-300/70 [&_a]:text-white/80 hover:[&_a]:text-white [&_.group-hover\:bg-black\/\[\.03\]]:bg-white/5",
    },
]

const FeaturesSection = () => {
    return (
        <section className="relative px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-20">
            <div className="max-w-6xl mx-auto">
                {/* Header section */}
                <div className="text-center mb-12">
                    <h2 className="mb-4">
                        <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Features that make us impressive
                        </span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <BentoGrid className="lg:grid-rows-3">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    )
}

export default FeaturesSection