// Function to parse the error message from the backend response
export function parseErrorMessage(responseData) {
    let errorMessage = "An error occurred";
    const errorData = responseData.error;

    if (errorData) {
        // Check if the error data is in JSON format
        try {
            const errorObject = JSON.parse(errorData);
            errorMessage = formatError(errorObject);
        } catch (e) {
            // If parsing fails, treat errorData as plain text
            errorMessage = errorData;
        }
    }
    return errorMessage;
}

// Function to format the error object into a user-friendly string
export function formatError(errorObject) {
    let formattedError = "";
    for (const key in errorObject) {
        formattedError += `${errorObject[key].join(". ")}\n`;
    }
    return formattedError.trim();
}
