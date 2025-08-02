const logs = [];

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      logs.push({
        uuid: body.uuid || "unknown",
        message: body.message || "No message",
        timestamp: new Date().toLocaleString(),
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (err) {
      return { statusCode: 400, body: "Invalid JSON" };
    }
  }

  // GET method: return logs
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(logs)
    };
  }

  return { statusCode: 405, body: "Method not allowed" };
};
