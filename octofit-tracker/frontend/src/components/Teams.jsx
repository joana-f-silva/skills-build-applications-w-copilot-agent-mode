import { API_ENDPOINTS, getDisplayName, useApiCollection } from '../api.js'

function Teams() {
  const { data: teams, loading, error } = useApiCollection(API_ENDPOINTS.teams)

  return (
    <section aria-labelledby="teams-heading">
      <div className="mb-4">
        <h1 className="h2 mb-1" id="teams-heading">Teams</h1>
        <p className="text-secondary">Meet the teams and their members.</p>
      </div>

      {loading && <p role="status">Loading teams…</p>}
      {error && <div className="alert alert-danger" role="alert">Could not load teams: {error}</div>}
      {!loading && !error && (
        teams.length ? (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div className="col-12 col-md-6" key={team._id || team.id || index}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <h2 className="h5 card-title">{team.name || 'Unnamed team'}</h2>
                      <span className="badge text-bg-success">{team.totalPoints ?? 0} points</span>
                    </div>
                    <p className="card-text text-secondary">{team.description || 'No description available.'}</p>
                    <h3 className="h6">Members ({team.members?.length ?? 0})</h3>
                    {team.members?.length ? (
                      <ul className="list-unstyled mb-0">
                        {team.members.map((member, memberIndex) => (
                          <li key={member._id || member.id || memberIndex}>
                            {getDisplayName(member)}
                          </li>
                        ))}
                      </ul>
                    ) : <p className="mb-0 text-secondary">No members yet.</p>}
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : <p className="text-secondary">No teams have been created yet.</p>
      )}
    </section>
  )
}

export default Teams
