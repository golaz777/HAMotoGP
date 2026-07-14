import { css } from "lit";

export const cardStyles = css`
  :host {
    --mgp-gap: 12px;
  }
  ha-card {
    padding: 16px;
    display: block;
  }
  .header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .flag { font-size: 1.25rem; }
  .countdown {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
    color: var(--primary-color);
    font-weight: 600;
  }
  .sub { color: var(--secondary-text-color); font-size: 0.9rem; }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
  .pill {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 2px 10px;
    font-size: 0.8rem;
    color: var(--primary-text-color);
  }
  .day {
    margin-top: 12px;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--divider-color);
    padding-bottom: 4px;
  }
  .row {
    display: grid;
    grid-template-columns: 4.5rem 3.2rem 1fr;
    align-items: center;
    gap: 8px;
    padding: 6px 4px;
  }
  .row.next { background: var(--secondary-background-color); border-radius: 8px; }
  .time { font-variant-numeric: tabular-nums; color: var(--primary-text-color); }
  .chip {
    color: #fff;
    border-radius: 6px;
    padding: 1px 6px;
    font-size: 0.72rem;
    text-align: center;
    font-weight: 600;
  }
  .session { color: var(--primary-text-color); }
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
