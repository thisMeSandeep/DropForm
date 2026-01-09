import { Sparkles, Settings, BarChart3, MessageSquare, TrendingUp, CheckCircle, Video, Globe } from "lucide-react"
import { BentoGrid, type BentoItem } from "../ui/bento-grid"

const features: BentoItem[] = [
    {
        title: "AI-Powered Form Generation",
        meta: "v2.0",
        description: "Create beautiful forms instantly with just a natural language prompt. Our AI understands your intent and builds the perfect form structure for you.",
        icon: <Sparkles className="w-4 h-4 text-purple-500" />,
        status: "Live",
        tags: ["AI", "Automation", "Magic"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Full Customization",
        meta: "100+ options",
        description: "Customize every aspect of your forms - fields, styling, validation rules, and more.",
        icon: <Settings className="w-4 h-4 text-blue-500" />,
        status: "Updated",
        tags: ["Design", "Flexible"],
    },
    {
        title: "Advanced Analytics",
        meta: "Real-time",
        description: "Track form submissions, analyze response data, and gain insights with our comprehensive analytics dashboard.",
        icon: <BarChart3 className="w-4 h-4 text-emerald-500" />,
        tags: ["Data", "Insights"],
        colSpan: 2,
    },
    {
        title: "AI Data Query",
        meta: "Natural Language",
        description: "Query your collected data using natural language. Get instant insights from your form responses.",
        icon: <MessageSquare className="w-4 h-4 text-sky-500" />,
        status: "Beta",
        tags: ["Search", "AI"],
    },
];

const FeaturesSection = () => {
    return (
        <section className="relative px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-20">
            <div className="max-w-7xl mx-auto">
                {/* Header section */}
                <div className="text-center mb-12">
                    <h2 className="mb-4">
                        <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Features that make us impressive
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Experience the next generation of form building with our powerful AI-driven tools and intuitive design system.
                    </p>
                </div>

                {/* Bento Grid */}
                <BentoGrid items={features} />
            </div>
        </section>
    )
}

export default FeaturesSection
