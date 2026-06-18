import React from 'react';
import { Building, Handshake, TrendingUp, MapPin } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MetricsStripProps {
  currentTrans: TranslationSchema;
}

export const MetricsStrip: React.FC<MetricsStripProps> = ({
  currentTrans,
}) => {
  const isReduced = useReducedMotion();

  // Metric metadata items mapped for elegant rendering and staggering
  const metricsData = [
    {
      id: 'metric-item-1',
      iconBoxId: 'metric-icon-box-1',
      textBoxId: 'metric-text-box-1',
      valId: 'metric-val-1',
      labelId: 'metric-label-1',
      value: currentTrans.stats.experienceVal,
      label: currentTrans.stats.experienceLabel,
      icon: <Building className="w-4 h-4 sm:w-5 sm:h-5 text-[#07583F]" />,
      borderClass: "border-b border-[#DCE5E0]/40 pb-4 min-[360px]:border-b-0 min-[360px]:pb-0",
    },
    {
      id: 'metric-item-2',
      iconBoxId: 'metric-icon-box-2',
      textBoxId: 'metric-text-box-2',
      valId: 'metric-val-2',
      labelId: 'metric-label-2',
      value: currentTrans.stats.partnersVal,
      label: currentTrans.stats.partnersLabel,
      icon: <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#07583F]" />,
      borderClass: "border-b border-[#DCE5E0]/40 pb-4 min-[360px]:border-b-0 min-[360px]:pb-0",
    },
    {
      id: 'metric-item-3',
      iconBoxId: 'metric-icon-box-3',
      textBoxId: 'metric-text-box-3',
      valId: 'metric-val-3',
      labelId: 'metric-label-3',
      value: currentTrans.stats.sectorsVal,
      label: currentTrans.stats.sectorsLabel,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#07583F]" />,
      borderClass: "border-b border-[#DCE5E0]/40 pb-4 min-[360px]:border-b-0 min-[360px]:pb-0",
    },
    {
      id: 'metric-item-4',
      iconBoxId: 'metric-icon-box-4',
      textBoxId: 'metric-text-box-4',
      valId: 'metric-val-4',
      labelId: 'metric-label-4',
      value: currentTrans.stats.presenceVal,
      label: currentTrans.stats.presenceLabel,
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#07583F]" />,
      borderClass: "",
    },
  ];

  return (
    <div 
      id="hero-metrics-strip" 
      data-section="metrics-strip"
      className="relative z-30 bg-[#F8F9F6] border-y border-border-light py-6 sm:py-8 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-5 min-[360px]:gap-6 lg:gap-4 lg:divide-x lg:divide-border-light rtl:lg:divide-x-reverse items-center" id="metrics-grid">
          
          {metricsData.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                isReduced 
                  ? { duration: 0.1 } 
                  : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }
              }
              className={`flex items-center gap-3 sm:gap-4 px-2 lg:px-6 ${metric.borderClass}`}
              id={metric.id}
            >
              <div className="p-2 bg-saudi-light text-saudi rounded-lg shrink-0" id={metric.iconBoxId}>
                {metric.icon}
              </div>
              <div className="space-y-0.5" id={metric.textBoxId}>
                <span className="block text-lg min-[360px]:text-xl sm:text-2xl font-black text-saudi leading-none" id={metric.valId}>
                  {metric.value}
                </span>
                <span className="block text-[11px] sm:text-xs text-text-secondary leading-snug" id={metric.labelId}>
                  {metric.label}
                </span>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};
