import fetch from "node-fetch";

const requestOptions = {
  method: "GET",
  headers: {
    "X-CMC_PRO_API_KEY": process.env.VUE_APP_API_KEY
  },
  compress: true
};

export async function handler() {
  try {
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000",
      requestOptions
    );
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data.data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ data: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
