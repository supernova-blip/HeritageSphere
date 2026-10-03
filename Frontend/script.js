const monumentContainer = document.getElementById("monumentContainer");
const searchBox = document.getElementById("searchBox");
const artifactContainer = document.getElementById("artifactContainer");

let monuments = [];


async function loadMonuments() {
    try {
        const response = await fetch("/api/monuments");

        monuments = await response.json();

        displayMonuments(monuments);
        displayMapMarkers(monuments);

    } catch (error) {
        console.error("Error loading monuments:", error);

        monumentContainer.innerHTML = `
            <p>Unable to load heritage data.</p>
        `;
    }
}

async function loadArtifacts() {

    try {
        const response = await fetch("/api/artifacts");

        const artifacts = await response.json();

        displayArtifacts(artifacts);

    } catch (error) {
        console.error("Error loading artifacts:", error);

        artifactContainer.innerHTML = `
            <p>Unable to load artifact data.</p>
        `;
    }
}

function displayArtifacts(artifacts) {

    artifactContainer.innerHTML = "";

    if (artifacts.length === 0) {
        artifactContainer.innerHTML = `
            <p>No artifacts found.</p>
        `;
        return;
    }

    artifacts.forEach(artifact => {

        const card = document.createElement("div");

        card.className = "monument-card";

        card.innerHTML = `
            <h3>${artifact.name}</h3>

            <p>
                <strong>Category:</strong>
                ${artifact.category}
            </p>

            <p>
                <strong>Period:</strong>
                ${artifact.period}
            </p>

            <p>
                <strong>Material:</strong>
                ${artifact.material}
            </p>

            <p>
                <strong>Location:</strong>
                ${artifact.location}
            </p>

            <p>
                <strong>Condition:</strong>
                ${artifact.metadata.condition}
            </p>
        `;

        artifactContainer.appendChild(card);
    });
}

function displayMonuments(data) {

    monumentContainer.innerHTML = "";

    if (data.length === 0) {
        monumentContainer.innerHTML = `
            <p>No monuments found.</p>
        `;
        return;
    }

    data.forEach(monument => {

        const card = document.createElement("div");

        card.className = "monument-card";

        card.innerHTML = `
    <h3>${monument.name}</h3>

    <p>
        <strong>Type:</strong>
        ${monument.type}
    </p>

    <p>
        <strong>Historical Period:</strong>
        ${monument.period}
    </p>

    <p>
        <strong>Year:</strong>
        ${monument.year}
    </p>

    <p>
        <strong>Location:</strong>
        ${monument.location}
    </p>

    <p>
        <strong>Coordinates:</strong>
        ${monument.latitude}, ${monument.longitude}
    </p>

    <p>
        <strong>Historical Event:</strong>
        ${monument.event}
    </p>

    <p>
        <strong>Event Year:</strong>
        ${monument.event_year}
    </p>

    <p>
        <strong>Last Restoration:</strong>
        ${monument.restoration_year}
    </p>

    <p>
        <strong>Conservation Organization:</strong>
        ${monument.organization}
    </p>
`;

        monumentContainer.appendChild(card);
    });
}


searchBox.addEventListener("input", function () {

    const searchText = searchBox.value.toLowerCase();

    const filteredMonuments = monuments.filter(monument =>
        monument.name.toLowerCase().includes(searchText) ||
        monument.type.toLowerCase().includes(searchText) ||
        monument.period.toLowerCase().includes(searchText)
    );

    displayMonuments(filteredMonuments);
});


loadMonuments();
loadArtifacts();

async function loadAnalytics() {

    try {
        const response = await fetch("/api/analytics");

        const analytics = await response.json();

        displayAnalytics(analytics);

    } catch (error) {
        console.error("Error loading analytics:", error);

        document.getElementById("analyticsContainer").innerHTML = `
            <p>Unable to load analytics.</p>
        `;
    }
}


function displayAnalytics(analytics) {

    const analyticsContainer =
        document.getElementById("analyticsContainer");

    analyticsContainer.innerHTML = "";

    analytics.forEach(item => {

        const card = document.createElement("div");

        card.className = "monument-card";

        card.innerHTML = `
            <h3>${item.region}</h3>

            <p>
                <strong>Total Heritage Records:</strong>
                ${item.total}
            </p>
        `;

        analyticsContainer.appendChild(card);
    });
}


loadAnalytics();

async function loadRelationships() {

    try {

        const response = await fetch("/api/relationships");

        const relationships = await response.json();

        displayRelationships(relationships);

    } catch (error) {

        console.error("Error loading relationships:", error);

        document.getElementById("relationshipContainer").innerHTML = `
            <p>Unable to load heritage relationships.</p>
        `;
    }
}


function displayRelationships(relationships) {

    const container =
        document.getElementById("relationshipContainer");

    container.innerHTML = "";

    relationships.forEach(item => {

        const card = document.createElement("div");

        card.className = "relationship-card";

        card.innerHTML = `
            <h3>${item.source}</h3>

            <p>
                <strong>${item.source_type}</strong>
                →
                <span>${item.relationship}</span>
                →
                <strong>${item.target}</strong>
            </p>

            <small>${item.target_type}</small>
        `;

        container.appendChild(card);
    });
}


loadRelationships();

let heritageMap = L.map("heritageMap").setView([20.5937, 78.9629], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(heritageMap);


function displayMapMarkers(data) {

    data.forEach(monument => {

        if (monument.latitude && monument.longitude) {

            L.marker([
                monument.latitude,
                monument.longitude
            ])
            .addTo(heritageMap)
            .bindPopup(`
                <strong>${monument.name}</strong><br>
                ${monument.period}<br>
                ${monument.location}
            `);
        }
    });
}