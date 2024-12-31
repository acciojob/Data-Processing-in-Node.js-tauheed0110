const fs = require('fs');
const { Transform } = require('stream');

function processData(inputFilePath, outputFilePath) {
  // Create a transform stream to process data
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      // Convert the chunk to uppercase as an example of processing
      const processedData = chunk.toString().toUpperCase();
      callback(null, processedData);
    }
  });
  // Create read and write streams
  const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
  const writeStream = fs.createWriteStream(outputFilePath);
  // Pipe the streams together
  readStream
  .pipe(transformStream) // Process data through the transform stream
  .pipe(writeStream) // Write processed data to the output file
  .on('finish', () => {
    console.log('File processing completed!');
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });

  // Handle stream errors
  readStream.on('error', (err) => {
  console.error('Read stream error:', err);
  });

  writeStream.on('error', (err) => {
  console.error('Write stream error:', err);
  });
}

processData('./input.txt', './output.txt');






