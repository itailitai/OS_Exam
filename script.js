window.onload = function () {
  document.getElementById("slider").addEventListener("input", function (event) {
    var sliderValue = event.target.value;
    document.querySelector(".pdf").style.width = sliderValue + "%";
    document.querySelector(".ppt").style.width = 100 - sliderValue + "%";

    document.getElementById("pdf-percentage").textContent = sliderValue + "%";
    document.getElementById("ppt-percentage").textContent =
      100 - sliderValue + "%";
  });
  // Replace these URLs with the actual paths to your files
  var pdfURL = "https://deychev.com/cs/os.pdf";
  var pptURLs = [
    "ppt/lect1.pdf",
    "ppt/lect2.pdf",
    "ppt/lect3.pdf",
    "ppt/lect4.pdf",
    "ppt/lect5.pdf",
    "ppt/lect6.pdf",
    "ppt/lect7.pdf",
    "ppt/lect8.pdf",
    "ppt/lect9.pdf",
    "ppt/lect10.pdf",
    "ppt/lect11.pdf",
    "ppt/lect12.pdf",
    "ppt/rec2.pdf",
    "ppt/rec3.pdf",
    "ppt/rec4.pdf",
    "ppt/rec5.pdf",
    "ppt/rec6.pdf",
    "ppt/rec7.pdf",
    "ppt/rec8.pdf",
    "ppt/rec9.pdf",
    "ppt/rec10.pdf",
    "ppt/rec11.pdf",
    "ppt/rec12.pdf",
  ];
  ppt_subjects = [
    "Introduction",
    "Interrupts",
    "Processes & threads",
    "Synchornization I",
    "Synchornization II",
    "Scheduling I",
    "Scheduling II",
    "Memory Managment",
    "Paging",
    "Locality&Large Memories",
    "Virtualization",
    "Files",
    "TA - Interrupts",
    "TA -Processes&Threads",
    "TA -Working w/ Threads",
    "TA -Concurrency",
    "TA -Scheduling",
    "TA -Sockets",
    "TA -I/O",
    "TA -Memory Managment",
    "TA -Replacement Algo.",
    "TA -Virtualization&ICP",
    "TA -File System",
  ];

  pages_in_summary = [
    0, 16, 22, 31, 38, 41, 45, 49, 55, 61, 77, 65, 95, 100, 104, 110, 114, 135,
    0, 116, 119, 130, 125,
  ];
  var currentIndex = 0;

  // Set the PDF file to display
  var pdfEmbed = document.getElementById("pdfFile");
  pdfEmbed.src = pdfURL;

  // Set the PowerPoint file to display
  var pptEmbed = document.getElementById("pptFile");
  pptEmbed.src = pptURLs[currentIndex];

  //   var subject = document.getElementById("lecture_subject");
  //   subject.innerHTML = ppt_subjects[currentIndex];

  // Setup event listeners for the buttons
  var nextButton = document.getElementById("nextButton");
  var prevButton = document.getElementById("prevButton");

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % pptURLs.length; // Cycle to the next URL
    pptEmbed.src = pptURLs[currentIndex];
    changePDF(pages_in_summary[currentIndex]);
    // subject.innerHTML = ppt_subjects[currentIndex];
    document.querySelectorAll("#checklist label")[
      (currentIndex - 1 + pptURLs.length) % pptURLs.length
    ].style.fontWeight = "normal";
    document.querySelectorAll("#checklist label")[
      currentIndex
    ].style.fontWeight = "bold";
  });

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + pptURLs.length) % pptURLs.length; // Cycle to the previous URL
    pptEmbed.src = pptURLs[currentIndex];
    changePDF(pages_in_summary[currentIndex]);
    // subject.innerHTML = ppt_subjects[currentIndex];
    document.querySelectorAll("#checklist label")[
      currentIndex
    ].style.fontWeight = "bold";
    document.querySelectorAll("#checklist label")[
      (currentIndex + 1) % pptURLs.length
    ].style.fontWeight = "normal";
  });

  //Checklist initialization

  var checklistDiv = document.getElementById("checklist");

  ppt_subjects.forEach(function (subject) {
    if (subject == "TA - Interrupts") {
      var divider = document.createElement("div");
      divider.id = "divider";
      divider.innerHTML = "Recitations";
      checklistDiv.appendChild(divider);
    }
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = subject;

    var label = document.createElement("label");
    label.htmlFor = subject;
    label.appendChild(document.createTextNode(subject));

    checklistDiv.appendChild(checkbox);
    checklistDiv.appendChild(label);
    checklistDiv.appendChild(document.createElement("br"));

    // Restore the checked state from localStorage
    checkbox.checked = localStorage.getItem(subject) === "true";

    // Add an event listener to save the state to localStorage whenever it changes
    checkbox.addEventListener("change", function () {
      localStorage.setItem(subject, this.checked);
    });
    document.querySelectorAll("#checklist label")[0].style.fontWeight = "bold";
  });
};

function changePDF(pageNumber) {
  // Remove the existing embed
  var oldEmbed = document.getElementById("pdfFile");
  oldEmbed.parentNode.removeChild(oldEmbed);

  // Create a new embed with the updated source
  var newEmbed = document.createElement("embed");
  newEmbed.id = "pdfFile";
  newEmbed.src = "https://deychev.com/cs/os.pdf#page=" + pageNumber;
  newEmbed.type = "application/pdf";
  newEmbed.style.width = "100%";
  newEmbed.style.height = "100%";

  // Add the new embed to the div container
  document.querySelector(".pdf").appendChild(newEmbed);
}
