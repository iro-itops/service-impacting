function generateReport() {
    // Validate form inputs
    const form = document.getElementById('incident-form');
    if (form.checkValidity()) {
        document.getElementById('output-incident-number').innerText = document.getElementById('incident-number').value;
        document.getElementById('output-description').innerText = document.getElementById('description').value;
        document.getElementById('output-time-reported').innerText = document.getElementById('time-reported').value;
        document.getElementById('output-service-impact').innerText = document.getElementById('service-impact').value;
        document.getElementById('output-actions-taken').innerText = document.getElementById('actions-taken').value;
        document.getElementById('output-time-resolved').innerText = document.getElementById('time-resolved').value;
        document.getElementById('output-duration').innerText = document.getElementById('duration').value;
        document.getElementById('output-resolution').innerText = document.getElementById('resolution').value;
        document.getElementById('output-rca').innerText = document.getElementById('rca').value;

        document.getElementById('report-output').style.display = 'block';
    } else {
        alert('Please fill out all required fields.');
    }
}

function confirmReset() {
    if (confirm('Are you sure you want to reset the form?')) {
        document.getElementById('incident-form').reset();
        document.getElementById('report-output').style.display = 'none';
    }
}

function copyReport() {
    const table = document.getElementById('report-table');
    const rows = table.rows;
    let report = '';

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            report += cells[j].innerText + '\t';
        }
        report += '\n';
    }

    navigator.clipboard.writeText(report).then(() => {
        alert('Report copied to clipboard!');
    }, (err) => {
        alert('Failed to copy report: ', err);
    });
}