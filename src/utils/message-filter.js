// Regular expressions for detecting mobile numbers and hyperlinks
const MOBILE_NUMBER_REGEX =
  /(\+?\d{10,15})|(\d{3,4}[-\s]?\d{3,4}[-\s]?\d{3,4})/g;
const URL_REGEX =
  /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?)/g;

/**
 * Checks if a message contains mobile numbers or hyperlinks
 * @param {string} text - The message text to check
 * @returns {Object} - Contains detection results and filtered message
 */
export const checkForbiddenContent = (text) => {
  const containsMobileNumber = MOBILE_NUMBER_REGEX.test(text);
  const containsUrl = URL_REGEX.test(text);

  // Reset regex lastIndex
  MOBILE_NUMBER_REGEX.lastIndex = 0;
  URL_REGEX.lastIndex = 0;

  return {
    containsForbiddenContent: containsMobileNumber || containsUrl,
    containsMobileNumber,
    containsUrl,
    filteredMessage: text
      .replace(MOBILE_NUMBER_REGEX, "[mobile number removed]")
      .replace(URL_REGEX, "[link removed]"),
  };
};

/**
 * Creates a warning message based on detected content
 * @param {boolean} hasMobileNumber - Whether a mobile number was detected
 * @param {boolean} hasUrl - Whether a URL was detected
 * @returns {string} - Warning message
 */
export const getWarningMessage = (hasMobileNumber, hasUrl) => {
  if (hasMobileNumber && hasUrl) {
    return "Sharing mobile numbers and links is not allowed in the first 5 hours of chat.";
  } else if (hasMobileNumber) {
    return "Sharing mobile numbers is not allowed in the first 5 hours of chat.";
  } else if (hasUrl) {
    return "Sharing links is not allowed in the first 5 hours of chat.";
  }
  return "";
};
