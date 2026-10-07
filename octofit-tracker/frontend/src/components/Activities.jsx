import { API_ENDPOINTS, formatDate, getDisplayName, useApiCollection } from '../api.js'

function Activities() {
  const { data: activities, loading, error } = useApiCollection(API_ENDPOINTS.activities)

  return (
    <section aria-labelledby="activities-heading">
      <div className="mb-4">
        <h1 className="h2 mb-1" id="activities-heading">Activities</h1>
        <p className="text-secondary">Recent workouts logged by Octofit members.</p>
      </div>

      {loading && <p role="status">Loading activities…</p>}
      {error && <div className="alert alert-danger" role="alert">Could not load activities: {error}</div>}
      {!loading && !error && (
        activities.length ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">Member</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Team</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Completed</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity._id || activity.id || index}>
                    <td>{getDisplayName(activity.user)}</td>
                    <td>{activity.activityType || '—'}</td>
                    <td>{getDisplayName(activity.team)}</td>
                    <td>{activity.durationMinutes ?? '—'} min</td>
                    <td>{activity.caloriesBurned ?? '—'}</td>
                    <td>{activity.distanceKilometers == null ? '—' : `${activity.distanceKilometers} km`}</td>
                    <td>{formatDate(activity.completedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="text-secondary">No activities have been recorded yet.</p>
      )}
    </section>
  )
}

export default Activities
