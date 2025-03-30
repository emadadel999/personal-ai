import { Ollama, ProgressResponse } from 'ollama/dist/browser.cjs';

export const MODELS = [
  {
    name: 'deepseek-r1:1.5b',
    value: 'deepseek-r1:1.5b'
  },
  {
    name: 'tinyllama',
    value: 'tinyllama'
  }
]

const hostName = window?.location?.host?.split(":")[0];

const ollama = new Ollama({ host: `${hostName || '0.0.0.0'}` });

export async function* pullModel(model: string) {
  try {
    const localModels = await ollama.list();
    console.log('local models: ', localModels);
    console.log("current selected model: ", model);
    
    const hasModel = localModels.models.find((m) => m.name === model);
    if (!hasModel) {
      console.log('model doesnt exist locally, pulling it');
      const res = await ollama.pull({ model, insecure: true, stream: true });
      console.log('pulling res: ', res);
      if (res) {
        for await (const part of res) {
          yield part;
        }
      } else yield { completed: 0, total: 0, status: "failed" } as ProgressResponse;
    } else {
      console.log('model already downloaded locally');
      yield { completed: 0, total: 0, status: "success" } as ProgressResponse;
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('all requests have been aborted successfully');
      yield { completed: 0, total: 0, status: "aborted" } as ProgressResponse;
    } else {
      console.error("error listing/pulling model: ", error);
      yield { completed: 0, total: 0, status: "failed" } as ProgressResponse;;
    }
  }
}

export async function deleteModel(model: string) {
  try {
    const res = await ollama.delete({ model });
    console.log('ers: ', res);
    
    if (res.status === "success") {
    } else {
      throw 'failed to delete model';
    }
  } catch (error) {
    console.log('error deleting model: ', error);
  }
}

export async function abortAll() {
  try {
    await ollama.abort();
  } catch (error) {
    console.log('error aborting: ', error);
  }
}

export async function* getAnswer(msgText: string, model: string) {
  try {
    const response = await ollama.chat({
      model,
      messages: [{ role: 'user', content: msgText }],
      stream: true
    })

    if (response) {
      for await (const part of response) {
        yield part?.message?.content;
      }
    } else throw 'response is empty'
  } catch (error) {
    console.log('error: ', error);
  }
}

