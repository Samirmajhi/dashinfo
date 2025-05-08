// Table data for IT Continuity Plans
const itContinuityPlans = [
    { appCode: 'APP001', appOwner: 'Alice', continuityLevel: 'High', department: 'Finance', businessOwner: 'Bob' },
    { appCode: 'APP002', appOwner: 'Charlie', continuityLevel: 'Medium', department: 'HR', businessOwner: 'Diana' },
    { appCode: 'APP003', appOwner: 'Eve', continuityLevel: 'Low', department: 'IT', businessOwner: 'Frank' },
];

// Table data for IT Risk Plans
const itRiskPlans = [
    { appCode: 'RISK001', appOwner: 'Grace', continuityLevel: 'Critical', department: 'Legal', businessOwner: 'Heidi' },
    { appCode: 'RISK002', appOwner: 'Ivan', continuityLevel: 'Moderate', department: 'Sales', businessOwner: 'Judy' },
    { appCode: 'RISK003', appOwner: 'Mallory', continuityLevel: 'Low', department: 'Support', businessOwner: 'Oscar' },
];

function createTable(data, columns) {
    let table = '<table><thead><tr>';
    columns.forEach(col => {
        table += `<th>${col.label}<br><input class="filter-input" data-col="${col.key}" type="text" placeholder="Filter..." /></th>`;
    });
    table += '</tr></thead><tbody>';
    data.forEach(row => {
        table += '<tr>';
        columns.forEach(col => {
            table += `<td>${row[col.key]}</td>`;
        });
        table += '</tr>';
    });
    table += '</tbody></table>';
    return table;
}

function filterTable(data, columns, filters) {
    return data.filter(row => {
        return columns.every(col => {
            const filter = filters[col.key].toLowerCase();
            return row[col.key].toLowerCase().includes(filter);
        });
    });
}

function showPlansTable(type) {
    const columns = [
        { key: 'appCode', label: 'App Code' },
        { key: 'appOwner', label: 'App Owner' },
        { key: 'continuityLevel', label: 'Continuity Level' },
        { key: 'department', label: 'Department' },
        { key: 'businessOwner', label: 'Business Owner' },
    ];
    const data = type === 'itc' ? itContinuityPlans : itRiskPlans;
    const container = document.getElementById('dynamic-content');
    container.innerHTML = createTable(data, columns);

    // Add filter functionality
    const inputs = container.querySelectorAll('.filter-input');
    const filters = { appCode: '', appOwner: '', continuityLevel: '', department: '', businessOwner: '' };
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            filters[this.dataset.col] = this.value;
            const filtered = filterTable(data, columns, filters);
            const tbody = container.querySelector('tbody');
            tbody.innerHTML = filtered.map(row =>
                `<tr>${columns.map(col => `<td>${row[col.key]}</td>`).join('')}</tr>`
            ).join('');
        });
    });
}

// Event listeners for dropdown items
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('itc-plans').addEventListener('click', function(e) {
        e.preventDefault();
        showPlansTable('itc');
    });
    document.getElementById('itr-plans').addEventListener('click', function(e) {
        e.preventDefault();
        showPlansTable('itr');
    });
    // Optionally, clear table on Home click
    document.getElementById('nav-home').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('dynamic-content').innerHTML = '';
    });
}); 