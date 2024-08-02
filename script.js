let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let writingArea = document.getElementById("text-input");
let alignButtons = document.querySelectorAll(".align");
let formatButtons = document.querySelectorAll(".format");

const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(formatButtons, false);
};

// --- Main Logic ---
const modifyText = (command, defaultUi, value) => {
  if (command != "insertImage" ) {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
  }
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// --- Highlight clicked button ---
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;

        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } 
      else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

// --- Function to insert image from PC ---
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function(e) {
            document.execCommand("insertImage", false, e.target.result);
            console.log(e.target.result)
        }
        reader.readAsDataURL(input.files[0]);
    }
}

window.onload = initializer();
