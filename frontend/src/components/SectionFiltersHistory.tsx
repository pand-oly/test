import { useState } from 'react';
import type { MouseEventHandler } from 'react';

type SearchHistoryByIdType = (
  id: string
) => MouseEventHandler<HTMLButtonElement>;

interface props {
  onFilterCashInProps: MouseEventHandler<HTMLButtonElement>;
  cashInActivate: boolean;
  onFilterCashOutProps: MouseEventHandler<HTMLButtonElement>;
  cashOutActivate: boolean;
  onSearchHistoryById: SearchHistoryByIdType;
}

export default function SectionFiltersHistory({
  cashInActivate,
  cashOutActivate,
  onFilterCashInProps,
  onFilterCashOutProps,
  onSearchHistoryById,
}: props) {
  const [inputSearch, setInputSearch] = useState('');

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter the transaction ID"
          value={inputSearch}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            setInputSearch(target.value)
          }
        />
        <button type="button" onClick={onSearchHistoryById(inputSearch)}>
          search
        </button>
      </div>
      <button
        type="button"
        onClick={onFilterCashInProps}
        className={`btn ${cashInActivate ? 'btn-success' : 'btn-secondary'}`}
      >
        cash-in
      </button>
      <button
        type="button"
        onClick={onFilterCashOutProps}
        className={`btn ${cashOutActivate ? 'btn-success' : 'btn-secondary'}`}
      >
        cash-out
      </button>
    </div>
  );
}
