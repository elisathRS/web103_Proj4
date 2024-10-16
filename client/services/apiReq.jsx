class ApiError extends Error {
    constructor(message, details) {
      super(message);
      this.details = details;
    }
  }
  
  const request = async (method, url, body = null) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const options = body 
      ? { method, headers, body: JSON.stringify(body) } 
      : { method, headers }; 
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (!response.ok) {
      throw new ApiError(data.error.message, data.error.details);
    }
  
    return data;
  };
  
  export { request, ApiError };