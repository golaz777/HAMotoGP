import { css } from "lit";

export const cardStyles = css`
  :host {
    --mgp-gap: 12px;
    --mgp-red: #e2001a;
    --mgp-red-dark: #a30013;
  }
  ha-card {
    padding: 16px;
    display: block;
  }
  /* Next-event card bleeds its hero to the edges. */
  ha-card.event {
    padding: 0;
    overflow: hidden;
  }

  /* --- Hero header --------------------------------------------------- */
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    background: linear-gradient(135deg, var(--mgp-red), var(--mgp-red-dark));
    color: #fff;
  }
  /* thin checkered speed strip under the hero */
  .hero::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-image: repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.55) 0 8px,
      rgba(255, 255, 255, 0.85) 8px 16px
    );
    opacity: 0.55;
  }
  .flag {
    font-size: 2rem;
    line-height: 1;
    flex: 0 0 auto;
  }
  .hero-name {
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 1.15;
    color: #fff;
  }
  .countdown {
    margin-left: auto;
    flex: 0 0 auto;
    align-self: flex-start;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    font-size: 0.85rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    padding: 4px 12px;
    white-space: nowrap;
  }

  /* --- Body ---------------------------------------------------------- */
  .body { padding: 16px 20px 18px; }
  /* Optional plain title (config.title) sits above the hero. */
  .title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--primary-text-color);
    padding: 14px 20px 0;
  }
  .sub {
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 4px; }
  .pill {
    background: var(--secondary-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 999px;
    padding: 3px 11px;
    font-size: 0.78rem;
    color: var(--primary-text-color);
  }
  .day {
    margin-top: 16px;
    font-weight: 700;
    color: var(--primary-text-color);
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--mgp-red);
  }
  .row {
    display: grid;
    grid-template-columns: 4.5rem 3.4rem 1fr;
    align-items: center;
    gap: 10px;
    padding: 9px 8px;
    border-radius: 8px;
    border-left: 3px solid transparent;
  }
  .row:hover { background: var(--secondary-background-color); }
  .row.next {
    border-left-color: var(--mgp-red);
    background: color-mix(in srgb, var(--mgp-red) 10%, transparent);
  }
  .time {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .chip {
    color: #fff;
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 0.7rem;
    letter-spacing: 0.02em;
    text-align: center;
    font-weight: 700;
  }
  .session {
    color: var(--primary-text-color);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .next-tag {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--mgp-red);
    border: 1px solid var(--mgp-red);
    border-radius: 999px;
    padding: 1px 6px;
    line-height: 1.4;
  }
  .empty { color: var(--secondary-text-color); font-style: italic; }
  table.standings { width: 100%; border-collapse: collapse; }
  table.standings td, table.standings th {
    padding: 4px 6px; text-align: left; border-bottom: 1px solid var(--divider-color);
  }
  table.standings td.pts, table.standings th.pts { text-align: right; }
  .podium-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
  .swatch { width: 4px; height: 1.2em; border-radius: 2px; }
  .tabs { display: flex; gap: 6px; margin: 8px 0; }
  .tab {
    cursor: pointer; padding: 4px 10px; border-radius: 14px;
    background: var(--secondary-background-color); color: var(--primary-text-color);
    font-size: 0.85rem; border: none;
  }
  .tab[aria-selected="true"] { background: var(--primary-color); color: #fff; }
`;
