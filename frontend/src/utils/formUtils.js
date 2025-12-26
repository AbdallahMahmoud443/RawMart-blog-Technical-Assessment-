
/**
 * Handles backend validation errors and sets them in the react-hook-form.
 * 
 * @param {Object} error - The error object from the API response.
 * @param {Function} setError - The setError function from react-hook-form.
 * @returns {boolean} - Returns true if validation errors were handled, false otherwise.
 */
export const handleValidationErrors = (error, setError) => {
    if (error.response?.status === 422 && error.response?.data?.detail) {
        let validationErrors = error.response.data.detail;

        // If it's a string, try to parse it
        if (typeof validationErrors === 'string') {
            try {
                validationErrors = JSON.parse(validationErrors);
            } catch (e) {
                console.error("Failed to parse validation errors JSON", e);
                return false;
            }
        }

  

        if (typeof validationErrors === 'object' && validationErrors !== null) {
            Object.keys(validationErrors).forEach(field => {
                const message = Array.isArray(validationErrors[field])
                    ? validationErrors[field][0]
                    : validationErrors[field];

                setError(field, {
                    type: 'manual',
                    message: message
                });
            });
            return true;
        }
    }
    return false;
};
