const roadmaps = {
webdev: [
    "Learn HTML, CSS, JavaScript",
    "Learn a frontend framework (React/Vue)",
    "Learn Git & GitHub",
    "Learn Backend (Node.js, Express)",
    "Databases (MongoDB / SQL)",
    "Build Projects & Deploy"
],
ai: [
    "Learn Python basics",
    "Math: Linear Algebra, Probability, Statistics",
    "Learn ML Libraries (NumPy, Pandas, Scikit-Learn)",
    "Deep Learning (TensorFlow, PyTorch)",
    "Work on AI Projects",
    "Explore NLP/Computer Vision"
],
    cloud: [
    "Understand Networking & Linux",
    "Learn Cloud Basics (AWS / Azure / GCP)",
    "Compute, Storage & Databases in Cloud",
    "Containers & Docker",
    "CI/CD & DevOps basics",
    "Work on Cloud Projects"
]
};

// Generate roadmap
function generateRoadmap() {
const career = document.getElementById("careerSelect").value;
const roadmapContainer = document.getElementById("roadmap");
roadmapContainer.innerHTML = "";

roadmaps[career].forEach((step, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = `${i + 1}. ${step}`;
    card.draggable = true;

    // Drag events
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragover", dragOver);
    card.addEventListener("drop", drop);

    roadmapContainer.appendChild(card);
});
}

// Drag & Drop
let draggedCard = null;

function dragStart(e) {
draggedCard = e.target;
}

function dragOver(e) {
e.preventDefault();
}

function drop(e) {
e.preventDefault();
if (draggedCard !== this) {
    const parent = this.parentNode;
    const children = Array.from(parent.children);
    const draggedIndex = children.indexOf(draggedCard);
    const targetIndex = children.indexOf(this);

    if (draggedIndex < targetIndex) {
    parent.insertBefore(draggedCard, this.nextSibling);
    } else {
    parent.insertBefore(draggedCard, this);
    }
}
}

// Export as PDF
function exportPDF() {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
const steps = Array.from(document.querySelectorAll(".card")).map(c => c.textContent);

doc.setFontSize(14);
doc.text("Career Roadmap", 20, 20);

steps.forEach((step, i) => {
    doc.text(`${i + 1}. ${step}`, 20, 40 + i * 10);
});

doc.save("roadmap.pdf");
}
