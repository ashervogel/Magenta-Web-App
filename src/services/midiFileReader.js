export function fetchMidiFile(fileUrl) {
  return fetch(fileUrl)
    .then(response => response.blob());
}

export function convertFileToByteArray(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const byteArray = new Uint8Array(arrayBuffer);
      
      resolve(byteArray);
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}