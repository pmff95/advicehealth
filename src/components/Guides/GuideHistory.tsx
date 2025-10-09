import type { GuideStep } from "../../types/guide";

const dotConfig = {
  completed: { src: "/images/dot1.png", size: 32 },
  current: { src: "/images/dot2.png", size: 32 },
  upcoming: { src: "/images/dot3.png", size: 32 },
} as const;

type DotVariant = keyof typeof dotConfig;

interface GuideHistoryProps {
  steps: GuideStep[];
}

const GuideHistory = ({ steps }: GuideHistoryProps) => {
  const firstPendingIndex = steps.findIndex((step) => !step.date?.trim());

  const getDotVariant = (index: number): DotVariant => {
    if (firstPendingIndex === -1 || index < firstPendingIndex) {
      return "completed";
    }

    if (index === firstPendingIndex) {
      return "current";
    }

    return "upcoming";
  };

  return (
    <div className="timeline">
      <h4 style={{ fontWeight: "500" }}>Histórico</h4>
      <div className="timeline-container">
        {steps.map((step, index) => {
          const variant = getDotVariant(index);
          const isLast = index === steps.length - 1;
          const { src, size } = dotConfig[variant];

          return (
            <div key={step.title} className="timeline-item">
              {!isLast && <span className="timeline-connector" />}
              <div className="timeline-marker">
                <img
                  className="timeline-dot"
                  src={src}
                  alt=""
                  style={{ width: size, height: size }}
                />
              </div>
              <div className="timeline-content">
                {step.date && (
                  <span className="timeline-date">{step.date}</span>
                )}
                <h4 className="timeline-title">{step.title}</h4>
                <p className="timeline-info">{step.info}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuideHistory;
