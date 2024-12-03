import fetch from "node-fetch"

export const handler = async (event) => {
  try {
    const fieldsFromForm = JSON.parse(event.body);
    const { email, name } = fieldsFromForm

    // ConvertKit API Setup
    const apiUrl = `https://api.convertkit.com/v3/sequences/${process.env.CONVERTKIT_WELCOME_SEQUENCE_ID
}/subscribe/`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
        first_name: name,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email via ConvertKit");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent via ConvertKit" }),
    };
  } catch (error) {
    console.log('err', error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};