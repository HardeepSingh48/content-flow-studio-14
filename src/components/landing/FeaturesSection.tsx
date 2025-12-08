import { motion } from 'framer-motion';
import { TrendingUp, Layout, Send, Sparkles, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'AI-Powered Ideas',
    description: 'Leverage Google Trends integration and smart AI suggestions to discover trending topics and create content that resonates with your audience.',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: Layout,
    title: 'Multi-Platform Output',
    description: 'Generate articles, Instagram Reels scripts, Twitter threads, and LinkedIn posts—all from a single topic in one unified workflow.',
    gradient: 'from-secondary to-accent',
  },
  {
    icon: Send,
    title: 'Seamless Publishing',
    description: 'Connect directly with WordPress, social media platforms, and more. Schedule and publish your content without leaving the studio.',
    gradient: 'from-accent to-primary',
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to{' '}
            <span className="gradient-text">create at scale</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform streamlines your entire content creation process, 
            from ideation to publication.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full glass rounded-2xl p-8 transition-all duration-300 hover:border-primary/30 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Zap, label: 'Lightning Fast' },
            { icon: Shield, label: 'Enterprise Security' },
            { icon: TrendingUp, label: 'Analytics Built-in' },
            { icon: Layout, label: 'Custom Templates' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
