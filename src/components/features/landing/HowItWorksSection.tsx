import { motion } from 'framer-motion';
import { Search, Lightbulb, MessageSquare, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Define Strategy',
    description: 'Start with a clear goal and target audience. Structure your campaign based on platform-specific best practices.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Draft & Collaborate',
    description: 'Create content with your team. Assign roles, manage versions, and keep everyone aligned in one shared workspace.',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Review & Approve',
    description: 'Ensure quality with built-in approval workflows. Leave comments, request edits, and sign off before anything goes live.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Publish & Measure',
    description: 'Schedule across all platforms simultaneously and track engagement to refine your future strategy.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            From idea to published in{' '}
            <span className="gradient-text-accent">4 simple steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined workflow takes you from blank page to published content faster than ever.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden sm:block" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start gap-6 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'}`}>
                  <div className={`glass rounded-2xl p-6 lg:p-8 inline-block w-full max-w-md ${index % 2 === 0 ? 'sm:ml-auto' : 'sm:mr-auto'
                    }`}>
                    <span className="text-sm font-bold text-primary mb-2 block">
                      Step {step.number}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="absolute left-8 sm:left-1/2 transform sm:-translate-x-1/2 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Spacer for layout */}
                <div className="flex-1 hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
