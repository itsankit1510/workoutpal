import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  BrainCircuit,
  Dumbbell,
  MonitorIcon as Running,
  Bell,
  ChevronRight,
  Github,
  Mail,
  CheckCircle,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <WorkoutPalLogo />
            <span className="text-xl font-bold">WorkoutPal</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/login">
              <Button>Start for Free</Button>
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background to-background/95"></div>

          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-chart-1/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary border border-border">
                  <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                  <span>Now Available</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Train Smarter, <span className="text-primary">Stay Consistent</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your AI-powered fitness assistant that creates personalized workout and running plans tailored to your
                  goals and schedule.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/login">
                    <Button size="lg">Start for Free</Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                  <CheckCircle className="h-4 w-4 text-chart-1" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-chart-1/20 rounded-3xl blur-sm"></div>
                <div className="relative bg-card p-6 rounded-3xl border border-border shadow-xl">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="h-3 w-3 rounded-full bg-destructive"></div>
                    <div className="h-3 w-3 rounded-full bg-chart-4"></div>
                    <div className="h-3 w-3 rounded-full bg-chart-1"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Your Fitness Goal</div>
                      <div className="bg-secondary rounded-lg p-3 text-secondary-foreground">
                        Build muscle while improving overall fitness
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Your Workout Plan</div>
                      <div className="bg-primary/20 border border-primary/30 rounded-lg p-4">
                        <h3 className="font-medium text-primary mb-2">4-Week Strength Program</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-chart-1" />
                            <span>3 strength sessions per week</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-chart-1" />
                            <span>1 HIIT cardio session</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-chart-1" />
                            <span>Progressive overload built-in</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-secondary rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-sm">Added to your calendar</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 p-0">
                        View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                WorkoutPal combines AI intelligence with practical fitness knowledge to keep you on track.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BrainCircuit className="h-10 w-10 text-primary" />}
                title="AI-Powered Plans"
                description="Get personalized workout and running plans based on your fitness level, goals, and available equipment."
              />
              <FeatureCard
                icon={<Dumbbell className="h-10 w-10 text-primary" />}
                title="Personalized Workouts"
                description="Tailored exercise routines that adapt to your progress and preferences over time."
              />
              <FeatureCard
                icon={<Running className="h-10 w-10 text-primary" />}
                title="Running Programs"
                description="From couch to 5K to marathon training, get customized running plans for any distance or goal."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Calendar Integration"
                description="Seamlessly sync your workout schedule with Google Calendar, Apple Calendar, or Outlook."
              />
              <FeatureCard
                icon={<Bell className="h-10 w-10 text-primary" />}
                title="Smart Reminders"
                description="Get timely notifications that adapt to your schedule and help you stay consistent."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Progress Tracking"
                description="Monitor your improvements over time with easy-to-understand metrics and visualizations."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-background relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-chart-1/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Getting started with WorkoutPal is simple. Just follow these three easy steps.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Choose Your Goal"
                description="Tell us about your fitness goals, experience level, and available equipment."
              />
              <StepCard
                number="2"
                title="Get Your Plan"
                description="Receive a personalized workout or running plan tailored to your specific needs."
              />
              <StepCard
                number="3"
                title="Stay Consistent"
                description="Sync with your calendar and get smart reminders to keep you on track."
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Got questions? We've got answers.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 text-left">
                    Is WorkoutPal really free to use?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    Yes! WorkoutPal is currently free to use while we're in our initial launch phase. We may introduce
                    premium features in the future, but we'll always maintain a free tier.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border border-border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 text-left">
                    Do I need any special equipment?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    Not at all! WorkoutPal creates plans based on the equipment you have available. Whether you have a
                    fully equipped gym or just your bodyweight at home, we'll create a plan that works for you.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border border-border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 text-left">
                    Which calendar apps are supported?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    WorkoutPal currently integrates with Google Calendar, Apple Calendar, and Microsoft Outlook. We're
                    working on adding more integrations in the future.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border border-border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 text-left">
                    Can I change my workout plan?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    You can request changes to your plan at any time. Our AI will adjust your workouts based on your
                    feedback, progress, and any changes in your availability or goals.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-background to-background/95 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-chart-1/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your fitness journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already achieving their fitness goals with WorkoutPal.
            </p>
            <Link href="/login">
              <Button size="lg">Start for Free</Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground/70">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <WorkoutPalLogo />
              <span className="text-xl font-bold">WorkoutPal</span>
            </div>
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Link
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>contact@example.com</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-muted-foreground">Built by Ankitsingh</p>
            <p className="mt-2 text-sm text-muted-foreground/70">© {new Date().getFullYear()} WorkoutPal</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


function WorkoutPalLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 122.119 122.119"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="100%" height="100%" rx="8" fill="currentColor" className="text-card" />

      {/* Running Man */}
      <g className="fill-primary" transform="scale(0.75) translate(20, 15)">
        <circle cx="68.311" cy="21.83" r="10.672" />
        <path d="M118.51,37.342c-2.763-0.918-5.748,0.574-6.668,3.336L91.95,100.414H53.327c0.825-0.447,1.536-1.128,2.005-2.021 c9.454-18.043,8.594-20.34,7.9-22.187c-0.303-0.808-0.963-2.563-9.099-10.954c0.333-0.363,0.643-0.758,0.909-1.209l11.44-19.325 c3.863,0.644,8.604,1.295,11.949,1.295c1.053,0,1.969-0.063,2.674-0.214c4.449-0.939,10.418-6.944,12.779-9.482 c1.557-1.675,1.461-4.295-0.214-5.853c-1.675-1.56-4.296-1.465-5.854,0.209c-3.098,3.327-7.12,6.675-8.422,7.019 c-1.416,0.276-6.807-0.361-12.146-1.255c-0.585-1.331-1.439-2.538-2.412-3.489l-0.025-0.021c0,0-0.961-0.876-1.931-1.481 c-1.017-0.632-2.154-0.915-2.154-0.915c-0.748-0.227-1.556-0.374-2.383-0.438c-4.63-0.887-15.098-2.711-19.049-1.874 c-4.449,0.941-10.417,6.944-12.775,9.481c-1.559,1.676-1.463,4.298,0.213,5.855c0.798,0.742,1.811,1.109,2.82,1.109 c1.111,0,2.219-0.444,3.035-1.322c3.091-3.325,7.113-6.671,8.419-7.017c0.988-0.192,3.896,0.059,7.37,0.529L38.19,54.065 c-0.37,0.625-0.623,1.263-0.79,1.902c-0.068,0.099-0.137,0.196-0.199,0.3c-0.299,0.507-7.275,12.33-9.596,17.529 c-1.37,1.627-8.726,4.475-15.591,6.021c-2.639,0.592-4.298,3.211-3.704,5.85c0.511,2.277,2.531,3.824,4.772,3.824 c0.355,0,0.716-0.038,1.077-0.12c7.167-1.608,19.6-5.239,22.342-11.479c1.05-2.388,3.603-7.021,5.847-10.965 c0.228,0.442,0.524,0.859,0.896,1.231c3.896,3.892,8.427,8.674,10.273,10.926c-0.987,2.899-4.083,9.461-6.86,14.763 c-1.243,2.371-0.347,5.293,1.993,6.567H5.272c-2.912,0-5.272,2.36-5.272,5.272s2.36,5.272,5.272,5.272h90.462 c0.007,0,0.014,0.002,0.02,0.002c0.008,0,0.014-0.002,0.02-0.002h4.5c2.912,0,5.272-2.36,5.272-5.272 c0-1.979-1.091-3.699-2.702-4.603l19.004-57.074C122.768,41.248,121.273,38.262,118.51,37.342z" />
        <path d="M99.719,57.664c0.277,0.1,0.562,0.146,0.84,0.146c1.026,0,1.989-0.638,2.354-1.66l9.75-27.306 c0.464-1.301-0.214-2.73-1.515-3.195c-1.303-0.467-2.73,0.213-3.194,1.514l-9.75,27.306C97.741,55.77,98.418,57.2,99.719,57.664z" />
      </g>
    </svg>
  )
}


function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-card/50 border-border hover:border-primary/50 transition-all">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({ number, title, description }) {
  return (
    <div className="bg-card/80 border border-border p-8 rounded-xl relative">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="pt-4">
        <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
        <p className="text-muted-foreground text-center">{description}</p>
      </div>
    </div>
  )
}
