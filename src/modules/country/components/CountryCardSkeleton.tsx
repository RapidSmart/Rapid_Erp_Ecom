function CountryCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col rounded-xl border border-surface-border bg-surface"
    >
      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-7 shrink-0 rounded-[4px] bg-surface-muted" />
          <span className="h-3.5 w-28 rounded-full bg-surface-muted" />
          <span className="ml-auto h-5 w-16 rounded-full bg-surface-muted" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3">
          <div>
            <span className="block h-2.5 w-8 rounded-full bg-surface-muted" />
            <span className="mt-2 block h-3.5 w-10 rounded-full bg-surface-muted" />
          </div>
          <div>
            <span className="block h-2.5 w-8 rounded-full bg-surface-muted" />
            <span className="mt-2 block h-3.5 w-10 rounded-full bg-surface-muted" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-surface-border px-4 py-1.5">
        <span className="h-2.5 w-24 rounded-full bg-surface-muted" />
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="size-6 rounded-md bg-surface-muted" />
          <span className="size-6 rounded-md bg-surface-muted" />
          <span className="size-6 rounded-md bg-surface-muted" />
        </div>
      </div>
    </div>
  )
}

export { CountryCardSkeleton }
