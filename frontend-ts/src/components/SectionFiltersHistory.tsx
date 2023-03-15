import type { MouseEventHandler } from 'react';

interface props {
  filterCashInProps: MouseEventHandler<HTMLButtonElement>;
  cashInActivate: boolean;
  filterCashOutProps: MouseEventHandler<HTMLButtonElement>;
  cashOutActivate: boolean;
}

export default function SectionFiltersHistory({
  cashInActivate,
  cashOutActivate,
  filterCashInProps,
  filterCashOutProps,
}: props) {
  return (
    <div>
      <div>
        <input type="text" placeholder="Enter the transaction ID" />
        <button type="button">search</button>
      </div>
      <button
        type="button"
        onClick={filterCashInProps}
        className={`btn ${cashInActivate ? 'btn-success' : 'btn-secondary'}`}
      >
        cash-in
      </button>
      <button
        type="button"
        onClick={filterCashOutProps}
        className={`btn ${cashOutActivate ? 'btn-success' : 'btn-secondary'}`}
      >
        cash-out
      </button>
    </div>
  );
}
