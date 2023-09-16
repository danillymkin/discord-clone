interface ServerSectionProps {
  label: string
  actions?: React.ReactNode | React.ReactNode[]
}

export const ServerSection = ({ label, actions }: ServerSectionProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>

      {actions}
    </div>
  )
}
