
function generateReport() {
  const form = document.getElementById('incident-form');
  if (form.checkValidity()) {
    const incidentNumber = document.getElementById('incident-number').value || 'TBD';
    const description = document.getElementById('description').value || 'TBD';
    const timeReported = document.getElementById('time-reported').value || 'TBD';
    const serviceImpact = document.getElementById('service-impact').value || 'TBD';
    const actionsTaken = document.getElementById('actions-taken').value || 'TBD';
    const timeResolved = document.getElementById('time-resolved').value || 'TBD';
    const resolution = document.getElementById('resolution').value || 'TBD';
    const rca = document.getElementById('rca').value || 'TBD';

    // Auto-calculate duration
    const timeReportedDate = new Date(timeReported);
    const timeResolvedDate = new Date(timeResolved);
    let durationText = 'TBD';
    if (!isNaN(timeReportedDate) && !isNaN(timeResolvedDate) && timeResolvedDate > timeReportedDate) {
      const diffMs = timeResolvedDate - timeReportedDate;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      durationText = `${hours} hour(s) ${minutes} minute(s)`;
      document.getElementById('duration').value = durationText;
    }

    const formatMultiline = (label, text) => {
      const lines = text.split('\n').map(line => `  ${line}`).join('\n');
      return `${label}:\n${lines}\n`;
    };

    const reportContent = `
Incident:         ${incidentNumber}

${formatMultiline('Description', description)}
Time reported:    ${timeReported}

${formatMultiline('Service impact', serviceImpact)}
${formatMultiline('Actions taken', actionsTaken)}
Time resolved:    ${timeResolved}
Duration:         ${durationText}

${formatMultiline('Resolution', resolution)}
${formatMultiline('RCA', rca)}
    `.trim();

    document.getElementById('report-content').innerText = reportContent;
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
  const reportContent = document.getElementById('report-content').innerText;
  navigator.clipboard.writeText(reportContent).then(() => {
    alert('Report copied to clipboard!');
  }, (err) => {
    alert('Failed to copy report: ', err);
  });
}

// Auto-grow functionality for specific textareas
document.addEventListener('input', function (event) {
  if (event.target.classList.contains('autogrow')) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }
});
