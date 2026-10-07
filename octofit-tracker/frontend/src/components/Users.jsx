import { API_ENDPOINTS, getDisplayName, useApiCollection } from '../api.js'

function Users() {
  const { data: users, loading, error } = useApiCollection(API_ENDPOINTS.users)

  return (
    <section aria-labelledby="users-heading">
      <div className="mb-4">
        <h1 className="h2 mb-1" id="users-heading">Members</h1>
        <p className="text-secondary">Octofit member profiles and fitness goals.</p>
      </div>

      {loading && <p role="status">Loading members…</p>}
      {error && <div className="alert alert-danger" role="alert">Could not load members: {error}</div>}
      {!loading && !error && (
        users.length ? (
          <div className="row g-3">
            {users.map((user, index) => (
              <div className="col-12 col-md-6 col-xl-4" key={user._id || user.id || index}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h2 className="h5 card-title">{getDisplayName(user)}</h2>
                    <p className="text-secondary mb-2">@{user.username || 'member'}</p>
                    {user.email && <p className="mb-2">{user.email}</p>}
                    <p className="card-text">{user.bio || 'No bio provided.'}</p>
                    <p className="mb-0"><strong>Goal:</strong> {user.fitnessGoal || 'Not set'}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : <p className="text-secondary">No member profiles are available yet.</p>
      )}
    </section>
  )
}

export default Users
