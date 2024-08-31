// Define static URL to fetch data from for tests
const url: string = 'https://api.github.com/users/CDGFPN/events';

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

const fetchData = async (): Promise<void> => {
  try {
    const response: FetchResponse = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    jsonData = await response.json();
    console.log('Data fetched and stored:', jsonData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export { fetchData };