let jsonData: any = {};

type FetchOptions = RequestInit;
type FetchResponse = Response;

// Function to fetch data with timeout
const fetchWithTimeout = (url: string, options?: FetchOptions, timeout: number = 8000): Promise<FetchResponse> => {
  return Promise.race([
    fetch(url, options),
    new Promise<FetchResponse>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ]);
};

const fetchData = async (username: string): Promise<void> => {
  try {
    const response: FetchResponse = await fetchWithTimeout(`https://api.github.com/users/${username}/events`);

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    if (response.status === 404) {
      throw new Error('User not found. Please check the username and try again.');
    }
    jsonData = await response.json();
    console.log('Data fetched and stored:', jsonData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export { fetchData };