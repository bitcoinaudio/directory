<script>
    const { Pool } = require('pg');

const pool = new Pool({
    user: 'rad',
    host: 'directory.bitcoinaudio.co',
    database: 'bad001',
    password: 'rad_October2!',
    port: 5432,
});

// Example function to get series
async function getSeries() {
    const { rows } = await pool.query('SELECT * FROM series');
    return rows;
}

// Example function to get submissions for a series
async function getSubmissions(seriesId) {
    const { rows } = await pool.query('SELECT * FROM submissions WHERE series_id = $1', [seriesId]);
    return rows;
}

// Example function to get media for a submission
async function getMedia(submissionId) {
    const { rows } = await pool.query('SELECT * FROM media WHERE submission_id = $1', [submissionId]);
    return rows;
}

</script>