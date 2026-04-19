const axios = require("axios");

const verifyRecaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;
    
    // Log for debugging (remove in production)
    if (recaptchaToken) {
      console.log(`reCAPTCHA Token received: ${recaptchaToken.substring(0, 15)}...`);
    } else {
      console.warn("reCAPTCHA Error: Token missing in request body");
    }

    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA token is required",
      });
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("reCAPTCHA Error: Secret key not found in .env");
      return res.status(500).json({
        success: false,
        message: "reCAPTCHA secret key is not configured",
      });
    }

    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", recaptchaToken);

    console.log("Verifying reCAPTCHA token with Google...");
    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!data.success) {
      const errorCodes = data["error-codes"] || [];
      console.warn("reCAPTCHA verification failed. Error codes:", errorCodes);
      
      // Provide more helpful logs for local development
      if (errorCodes.includes('invalid-input-secret')) {
        console.error("reCAPTCHA Error: The Secret Key (RECAPTCHA_SECRET_KEY) is invalid or mismatched.");
      }
      if (errorCodes.includes('invalid-input-response')) {
        console.error("reCAPTCHA Error: The reCAPTCHA token is invalid or expired.");
      }

      return res.status(400).json({
        success: false,
        message: "Invalid reCAPTCHA verification",
        errors: errorCodes,
      });
    }

    console.log("reCAPTCHA verified successfully");
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "reCAPTCHA verification failed",
      error: error.message,
    });
  }
};

module.exports = verifyRecaptcha;