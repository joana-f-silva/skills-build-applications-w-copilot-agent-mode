import { API_ENDPOINTS, getDisplayName, useApiCollection } from '../api.js'

function Leaderboard() {
  const { data: entries, loading, error } = useApiCollection(API_ENDPOINTS.leaderboard)

  return (
    <section aria-labelledby="leaderboard-heading">
      <div className="mb-4">
        <h1 className="h2 mb-1" id="leaderboard-heading">Leaderboard</h1>
        <p className="text-secondary">See how members are progressing this period.</p>
      </div>

      {loading && <p role="status">Loading leaderboard…</p>}
      {error && <div className="alert alert-danger" role="alert">Could not load the leaderboard: {error}</div>}
      {!loading && !error && (
        entries.length ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Member</th>
                  <th scope="col">Team</th>
                  <th scope="col">Points</th>
                  <th scope="col">Activities</th>
                  <th scope="col">Period</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry._id || entry.id || index}>
                    <th scope="row">{index + 1}</th>
                    <td>{getDisplayName(entry.user)}</td>
                    <td>{getDisplayName(entry.team)}</td>
                    <td>{entry.points ?? '—'}</td>
                    <td>{entry.activitiesCompleted ?? '—'}</td>
                    <td>{entry.period || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="text-secondary">No leaderboard entries are available yet.</p>
      )}
    </section>
  )
}

export default Leaderboard
