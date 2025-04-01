$j(document).ready(function () {
    // Update homeschool text based on selected option
    if ($j('#homeschoolSelect option:selected').text() === "*****")
        $j('#homeschool').html("<font size='-1' face='Verdana,Geneva,Arial,Helvetica,sans-serif'>*****</font>");
    else
        $j('#homeschool').html($j('#homeschoolSelect option:selected').text());

    // Extract values from inputs and replace them with text
    const firstName = $j('#firstName').val();
    const lastName = $j('#lastName').val();
    const email = $j('#email_address').val();

    $j('#firstName').replaceWith(`<span class="name">${firstName}</span>`);
    $j('#lastName').replaceWith(`<span class="name">${lastName}</span>`);
    $j('#email_address').replaceWith(`<span class="email">${email}</span>`);
});

// Handle file input change event
document.getElementById('fileInput').addEventListener('change', function () {
    const submitButton = document.getElementById('submitButton');
    const chooseFileLabel = document.getElementById('chooseFileLabel');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');

    if (this.files.length > 0) {
        submitButton.style.display = 'inline-block';
        chooseFileLabel.style.display = 'none';
        imagePreview.style.display = 'block';

        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
        }
        reader.readAsDataURL(this.files[0]);
    } else {
        submitButton.style.display = 'none';
        chooseFileLabel.style.display = 'inline-block';
        imagePreview.style.display = 'none';
        previewImg.src = '#';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const reportSelect = document.querySelector('select[name="reportname"]');
    if (reportSelect) {
        reportSelect.value = "Staff - ID's";
    }

    // Disable "Print Badge" button if there are changes to title, facility code, or card number
    const printBadgeButton = document.querySelector('#printBadgeForm button[type="submit"]');
    const printBadgeMessage = document.getElementById('printBadgeMessage');
    const titleInput = document.getElementById('title');
    const facilityCodeInput = document.getElementById('facilityCode');
    const cardNumberInput = document.getElementById('cardNumber');

    const initialTitle = titleInput.value;
    const initialFacilityCode = facilityCodeInput.value;
    const initialCardNumber = cardNumberInput.value;

    const originalTitle = document.getElementById('originalTitle');
    const originalFacilityCode = document.getElementById('originalFacilityCode');
    const originalCardNumber = document.getElementById('originalCardNumber');

    originalTitle.textContent = `Original: ${initialTitle}`;
    originalFacilityCode.textContent = `Original: ${initialFacilityCode}`;
    originalCardNumber.textContent = `Original: ${initialCardNumber}`;

    function checkForChanges() {
        if (titleInput.value !== initialTitle || facilityCodeInput.value !== initialFacilityCode || cardNumberInput.value !== initialCardNumber) {
            printBadgeButton.disabled = true;
            printBadgeMessage.style.display = 'block';

            if (titleInput.value !== initialTitle) {
                originalTitle.style.display = 'block';
            } else {
                originalTitle.style.display = 'none';
            }

            if (facilityCodeInput.value !== initialFacilityCode) {
                originalFacilityCode.style.display = 'block';
            } else {
                originalFacilityCode.style.display = 'none';
            }

            if (cardNumberInput.value !== initialCardNumber) {
                originalCardNumber.style.display = 'block';
            } else {
                originalCardNumber.style.display = 'none';
            }
        } else {
            printBadgeButton.disabled = false;
            printBadgeMessage.style.display = 'none';
            originalTitle.style.display = 'none';
            originalFacilityCode.style.display = 'none';
            originalCardNumber.style.display = 'none';
        }
    }

    titleInput.addEventListener('input', checkForChanges);
    facilityCodeInput.addEventListener('input', checkForChanges);
    cardNumberInput.addEventListener('input', checkForChanges);
});

// Detect if the browser is Safari/iOS
function isSafariOrIOS() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// ============================
// VARIABLE INITIALIZATION
// ============================
// References to HTML elements
const startWebcamButton = document.getElementById('startWebcamButton');
const webcamContainer = document.getElementById('webcamContainer');
const video = document.getElementById('video');
const canvas = document.getElementById('videoCanvas');
const captureButton = document.getElementById('captureButton');
const previewImg = document.getElementById('previewImg');
const fileInput = document.getElementById('fileInput');
const submitButton = document.getElementById('submitButton');
const chooseFileLabel = document.getElementById('chooseFileLabel');
const imagePreview = document.getElementById('imagePreview');
const cancelButton = document.getElementById('cancelButton');
const allInputs = document.querySelectorAll('input, select, textarea, button'); // Select all form elements

// Variables for webcam stream and captured image data
let stream;
let capturedImageData = null;

// ============================
// UTILITY FUNCTIONS
// ============================
// Function to disable all buttons and fields except the "Capture Picture" and "Cancel" buttons
function disableButtonsAndFields() {
    allInputs.forEach((input) => {
        if (input !== captureButton && input !== cancelButton) {
            input.disabled = true;
        }
    });
    chooseFileLabel.style.pointerEvents = 'none';
    chooseFileLabel.style.opacity = '0.5';
}

// Function to enable all buttons and fields
function enableButtonsAndFields() {
    allInputs.forEach((input) => {
        input.disabled = false;
    });
    chooseFileLabel.style.pointerEvents = 'auto';
    chooseFileLabel.style.opacity = '1';
}

// Utility function to convert a data URL to a Blob
function dataURLToBlob(dataURL) {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const binary = atob(parts[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
}

// ============================
// EVENT LISTENERS
// ============================

// Show the webcam popup
startWebcamButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
            stream = mediaStream;

            if (isSafariOrIOS()) {
                // Use canvas for Safari/iOS
                const context = canvas.getContext('2d');
                canvas.style.display = 'block';
                video.style.display = 'none';

                const updateCanvas = () => {
                    if (stream) {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        requestAnimationFrame(updateCanvas);
                    }
                };

                video.srcObject = stream;
                video.play();
                updateCanvas();
            } else {
                // Use video for desktop
                video.srcObject = stream;
                video.style.display = 'block';
                canvas.style.display = 'none';
            }

            webcamContainer.style.display = 'block';
            startWebcamButton.style.display = 'none';
            imagePreview.style.display = 'none'; // Hide the preview while taking a new picture
            disableButtonsAndFields(); // Disable all buttons and fields except "Capture Picture" and "Cancel"
        })
        .catch((error) => console.error('Error accessing webcam:', error));
});

// Capture image when "Capture Picture" button is clicked
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = 360;
    canvas.height = 432;

    if (isSafariOrIOS()) {
        // Ensure the canvas is updated with the last frame before stopping the stream
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        capturedImageData = canvas.toDataURL('image/jpeg');
    } else {
        // Capture from video for desktop
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        capturedImageData = canvas.toDataURL('image/jpeg');
    }

    // Stop the webcam stream
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
    }

    // Update the preview image with the captured data
    previewImg.src = capturedImageData;
    webcamContainer.style.display = 'none';
    startWebcamButton.style.display = 'block';
    enableButtonsAndFields(); // Enable all buttons and fields after capturing the picture

    // Show the "Confirm Upload" button
    showConfirmUpload();
});

// Cancel webcam when "Cancel" button is clicked
cancelButton.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
    }

    webcamContainer.style.display = 'none';
    startWebcamButton.style.display = 'block';
    enableButtonsAndFields(); // Enable all buttons and fields after canceling the webcam
});

// Handle "Confirm Upload" button click
submitButton.addEventListener('click', (event) => {
    if (capturedImageData) {
        // If a webcam image is captured, submit it as a file
        event.preventDefault(); // Prevent the default form submission

        // Create a form dynamically
        const formData = new FormData();
        formData.append('ac', 'submitteacherphoto');
        formData.append('frn', '~(frn)');
        formData.append('curtchrid', '~(curtchrid)');

        // Convert the captured image data to a Blob and append it to the form
        const blob = dataURLToBlob(capturedImageData);
        formData.append('filename', blob, 'captured-image.jpg');

        // Submit the form using fetch
        fetch('LPS-StaffAccessBadge.html?frn=~(frn)', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    location.reload(); // Reload the page to reflect the changes
                } else {
                    alert('Failed to upload the picture.');
                }
            })
            .catch((error) => console.error('Error uploading picture:', error));
    }
});

// ============================
// HELPER FUNCTIONS
// ============================

// Function to show the "Confirm Upload" button
function showConfirmUpload() {
    submitButton.style.display = 'inline-block';
    chooseFileLabel.style.display = 'none';
    imagePreview.style.display = 'block';

    // Populate the hidden input with the captured image data
    const capturedImageInput = document.getElementById('capturedImage');
    if (capturedImageInput) {
        capturedImageInput.value = capturedImageData;
    }
}