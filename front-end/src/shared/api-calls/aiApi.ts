import { BACKEND_SERVER } from "../globals";

export async function* getAnswer(msgText: string) {
  const url = `${BACKEND_SERVER}/api/ask?msg=${msgText}`;
  try {
    const response = await fetch(url);
    if (response?.body) {
      const reader = response.body.getReader();
      while (true) {
        // wait for next encoded chunk
        const { done, value } = await reader.read();
        // check if stream is done
        if (done) break;
        // Decodes data chunk and yields it
        yield (new TextDecoder().decode(value));
      }
    } else throw 'response body is empty'
  } catch (error) {
    console.log('error: ', error);
  }
}

