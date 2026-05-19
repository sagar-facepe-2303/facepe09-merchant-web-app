/**
 * Lightweight reusable table.
 *
 * Props:
 *  - columns: [{ key, header, render?, width? }]
 *  - data: array of row objects
 *  - rowKey: function(row) => unique id (default row.id)
 *  - onRowClick: function(row)
 *  - loading: bool
 *  - empty: ReactNode shown when no data
 *  - skeletonRows: number (default 5)
 */
import './Table.css'

function Table({
  columns,
  data = [],
  rowKey = (r) => r.id,
  onRowClick,
  loading = false,
  empty = null,
  skeletonRows = 5,
}) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={c.width ? { width: c.width } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={`skeleton-${i}`} className="data-table-skeleton-row">
                {columns.map((c) => (
                  <td key={c.key}><span className="skeleton-bar" /></td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="data-table-empty">
                {empty || 'No data available'}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className={onRowClick ? 'data-table-row-clickable' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
