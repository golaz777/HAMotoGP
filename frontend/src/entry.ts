import "./motogp-next-event-card";
import "./motogp-results-card";

(window as any).customCards = (window as any).customCards ?? [];
(window as any).customCards.push(
  {
    type: "motogp-next-event-card",
    name: "MotoGP Next Event",
    description: "Circuit data and the full weekend schedule for all three classes.",
  },
  {
    type: "motogp-results-card",
    name: "MotoGP Results",
    description: "Championship standings and the latest podium, per class.",
  },
);
