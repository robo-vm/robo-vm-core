interface TableProps {
  data: any[];
  columns: string[];
}

export default function Table({ data, columns }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-robovm-border">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left py-3 px-4 text-sm font-semibold text-robovm-accent uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-robovm-border/30 hover:bg-robovm-border/30 transition-colors"
            >
              {columns.map((col) => (
                <td key={col} className="py-3 px-4 text-sm text-robovm-text-secondary">
                  {row[col] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

