import { API_ENDPOINTS, getDisplayName, useApiCollection } from '../api.js'

function Workouts() {
  const { data: workouts, loading, error } = useApiCollection(API_ENDPOINTS.workouts)

  return (
    <section aria-labelledby="workouts-heading">
      <div className="mb-4">
        <h1 className="h2 mb-1" id="workouts-heading">Workouts</h1>
        <p className="text-secondary">Workout ideas tailored to member goals.</p>
      </div>

      {loading && <p role="status">Loading workouts…</p>}
      {error && <div className="alert alert-danger" role="alert">Could not load workouts: {error}</div>}
      {!loading && !error && (
        workouts.length ? (
          <div className="row g-3">
            {workouts.map((workout, index) => (
              <div className="col-12 col-md-6" key={workout._id || workout.id || index}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <h2 className="h5 card-title">{workout.title || 'Untitled workout'}</h2>
                      {workout.difficulty && (
                        <span className="badge text-bg-primary">{workout.difficulty}</span>
                      )}
                    </div>
                    <p className="text-success fw-semibold">{workout.category || 'Workout'}</p>
                    <p className="card-text">{workout.description || 'No description available.'}</p>
                    <dl className="row mb-0">
                      <dt className="col-sm-4">Duration</dt>
                      <dd className="col-sm-8">{workout.durationMinutes ?? '—'} min</dd>
                      <dt className="col-sm-4">Target</dt>
                      <dd className="col-sm-8">{workout.target || '—'}</dd>
                      <dt className="col-sm-4">Recommended for</dt>
                      <dd className="col-sm-8">{getDisplayName(workout.recommendedFor)}</dd>
                      <dt className="col-sm-4">Equipment</dt>
                      <dd className="col-sm-8">
                        {Array.isArray(workout.equipment) && workout.equipment.length
                          ? workout.equipment.join(', ')
                          : 'None listed'}
                      </dd>
                    </dl>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : <p className="text-secondary">No workouts are available yet.</p>
      )}
    </section>
  )
}

export default Workouts
