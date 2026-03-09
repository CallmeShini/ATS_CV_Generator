// Web Worker for Transformers.js
// We run the model here to not freeze the DOM during inference.
import { pipeline, env, PipelineType } from '@xenova/transformers';

// Skip local model checks and fetch from HuggingFace directly in browser
env.allowLocalModels = false;

class PipelineSingleton {
    static task: PipelineType = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';
    static instance: any = null;

    static async getInstance(progress_callback: Function) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Add event listener to process incoming messages from the main thread
self.addEventListener('message', async (event) => {
    // We expect the payload to be: { action: 'extract', uid: number, text: string }
    if (event.data.action === 'load') {
        // Pre-load the model sequentially when the UI mounts
        await PipelineSingleton.getInstance((x: any) => {
            self.postMessage({ status: 'progress', progress: x });
        });
        self.postMessage({ status: 'progress', progress: { status: 'ready' } });
    } else if (event.data.action === 'extract') {
        const textToEmbed = event.data.text;

        let extractor = await PipelineSingleton.getInstance((x: any) => {
            // Optional: send loading progression back to the main thread
            self.postMessage({ status: 'progress', progress: x });
        });

        // Perform inference
        // 'feature-extraction' returns a Tensor. The embedding is stored in the .data array
        let output = await extractor(textToEmbed, { pooling: 'mean', normalize: true });

        self.postMessage({
            status: 'complete',
            uid: event.data.uid,
            embedding: Array.from(output.data) // Convert Float32Array to standard JS Array to pass through postMessage
        });
    }
});
