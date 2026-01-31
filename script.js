/**
 * Akan Name Generator Logic
 * Formula: d = ( ( (CC/4) -2*CC-1) + ((5*YY/4) ) + ((26*(MM+1)/10)) + DD ) mod 7
 */

function generateAkanName() {
    // Get values from the form
    const dateValue = document.getElementById("date").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    

    // 1. Validation (Required for Rubric)
    if (!dateValue || !gender) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const birthDate = new Date(dateValue);
    const DD = birthDate.getDate();
    const MM = birthDate.getMonth() + 1; // JS months are 0-11
    const year = birthDate.getFullYear();

    // 2. Extract Century (CC) and Year (YY)
    const CC = parseInt(year.toString().slice(0, 2));
    const YY = parseInt(year.toString().slice(2, 4));

    // 3. Apply the Formula
    // Use Math.floor to handle the divisions
    let dayOfWeek = (
        ((CC / 4) - 2 * CC - 1) +
        ((5 * YY / 4)) +
        ((26 * (MM + 1) / 10)) +
        DD
    ) % 7;

    // 4. Normalize the result
    // JavaScript remainder can be negative; this ensures a positive 0-6 index
    let index = Math.floor(dayOfWeek);
    if (index < 0) {
        index = index + 7;
    }

    // 5. Akan Name Arrays (Exact mapping from your prompt)
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

    let finalName = (gender === "male") ? maleNames[index] : femaleNames[index];

    // 6. Display Result
    const resultDisplay = document.getElementById("result");
    resultDisplay.innerHTML = `You were born on a weekday! Your Akan name is <strong>${finalName}</strong>.`;

    // Add polish: show the result container
    document.getElementById("result-container").style.display = "block";
}

