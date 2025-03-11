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